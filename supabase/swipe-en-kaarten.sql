-- Ooit: eigen kaarten en swipen voor een match
-- Plak dit hele bestand in Supabase > SQL Editor en klik op Run.
-- Je kunt het veilig opnieuw uitvoeren. Voer eerst schema.sql uit.
--
-- Eigen kaarten zijn ideeën die jullie zelf maken in Ontdekken. Ze staan
-- tussen de andere kaarten tot een van jullie ze kiest.
--
-- Swipes zijn geheim. Je ziet alleen je eigen swipes, nooit die van de
-- ander. Swipen jullie allebei naar rechts, dan zet de database de ervaring
-- zelf als Samen op jullie lijst. Pas dan ziet de ander dat je hem wilde.

-- 1. Eigen kaarten ----------------------------------------------------------

create table if not exists public.cards (
  id         text primary key check (char_length(id) between 1 and 80),
  data       jsonb not null check (jsonb_typeof(data) = 'object'),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cards enable row level security;
revoke all on public.cards from anon, authenticated;
grant select, insert, update, delete on public.cards to authenticated;

drop policy if exists "cards read" on public.cards;
create policy "cards read" on public.cards
  for select to authenticated using (public.is_member());

drop policy if exists "cards insert" on public.cards;
create policy "cards insert" on public.cards
  for insert to authenticated with check (public.is_member());

drop policy if exists "cards update" on public.cards;
create policy "cards update" on public.cards
  for update to authenticated using (public.is_member()) with check (public.is_member());

drop policy if exists "cards delete" on public.cards;
create policy "cards delete" on public.cards
  for delete to authenticated using (public.is_member());

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'cards'
  ) then
    alter publication supabase_realtime add table public.cards;
  end if;
end;
$$;

-- 2. Swipes -----------------------------------------------------------------

create table if not exists public.swipes (
  slot       text not null check (slot in ('a', 'b')),
  item_id    text not null check (char_length(item_id) between 1 and 80),
  dir        text not null check (dir in ('right', 'left')),
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (slot, item_id)
);

-- 3. Beveiliging van de swipes ---------------------------------------------

alter table public.swipes enable row level security;
revoke all on public.swipes from anon, authenticated;

-- Lezen en weghalen mag alleen voor je eigen swipes. Swipen zelf loopt via
-- de functie hieronder, zodat niemand een swipe voor de ander kan zetten.
grant select, delete on public.swipes to authenticated;

drop policy if exists "swipes own read" on public.swipes;
create policy "swipes own read" on public.swipes
  for select to authenticated
  using (user_id = auth.uid() and public.is_member());

drop policy if exists "swipes own delete" on public.swipes;
create policy "swipes own delete" on public.swipes
  for delete to authenticated
  using (user_id = auth.uid() and public.is_member());

-- 4. Swipen -----------------------------------------------------------------

-- Slaat je swipe op. Geeft {"match": true} terug als jullie allebei naar
-- rechts swipeten. Dan staat de ervaring meteen als Samen op jullie lijst.
-- Over de swipe van de ander geeft de functie verder niets prijs.
create or replace function public.swipe(p_item text, p_dir text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  me     text;
  them   text;
  theirs text;
  cur    jsonb;
  card   jsonb;
  now_ms bigint := (extract(epoch from now()) * 1000)::bigint;
begin
  select slot into me from public.members where user_id = auth.uid();
  if me is null then
    raise exception 'not_member';
  end if;
  if p_dir not in ('right', 'left') then
    raise exception 'invalid_dir';
  end if;
  if p_item is null or char_length(p_item) not between 1 and 80 then
    raise exception 'invalid_item';
  end if;
  them := case when me = 'a' then 'b' else 'a' end;

  -- Voorkomt dat twee gelijktijdige swipes op hetzelfde item elkaar missen.
  perform pg_advisory_xact_lock(hashtext('ooit-swipe:' || p_item));

  insert into public.swipes (slot, item_id, dir, user_id)
  values (me, p_item, p_dir, auth.uid())
  on conflict (slot, item_id) do update
    set dir = excluded.dir, user_id = excluded.user_id, created_at = now();

  if p_dir <> 'right' then
    return jsonb_build_object('match', false);
  end if;

  select dir into theirs from public.swipes where slot = them and item_id = p_item;
  if theirs is distinct from 'right' then
    return jsonb_build_object('match', false);
  end if;

  select data into cur from public.entries where id = p_item for update;
  if cur is null then
    -- Een eigen kaart neemt zijn tekst mee naar de lijst. Zo blijft de
    -- ervaring leesbaar, ook als iemand de kaart later verwijdert.
    select data into card from public.cards where id = p_item;
    insert into public.entries (id, data, updated_at, updated_by)
    values (p_item, jsonb_build_object(
      'for', 'both',
      'addedBy', me,
      'addedAt', now_ms,
      'lived', null,
      'wants', jsonb_build_object('a', true, 'b', true),
      'updatedBy', me,
      'via', 'swipe'
    ) || case when card is null then '{}'::jsonb else jsonb_build_object('custom', card) end,
    now(), auth.uid());
  else
    -- Staat hij al op de lijst, dan telt de swipe als goedkeuring.
    update public.entries
       set data = public.jsonb_deep_merge(cur, jsonb_build_object(
             'for', 'both',
             'wants', jsonb_build_object('a', true, 'b', true),
             'updatedBy', me)),
           updated_at = now(),
           updated_by = auth.uid()
     where id = p_item;
  end if;

  -- De swipes hebben hun werk gedaan. Haal je de ervaring later van de lijst,
  -- dan komt hij schoon terug in de stapel.
  delete from public.swipes where item_id = p_item;

  return jsonb_build_object('match', true);
end;
$$;

revoke all on function public.swipe(text, text) from public, anon;
grant execute on function public.swipe(text, text) to authenticated;
