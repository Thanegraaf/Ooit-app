-- Ooit: database voor jullie gedeelde bucketlist
-- Plak dit hele bestand in Supabase > SQL Editor en klik op Run.
-- Je kunt het veilig opnieuw uitvoeren.

-- 1. Tabellen ---------------------------------------------------------------

create table if not exists public.members (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  slot       text not null unique check (slot in ('a', 'b')),
  name       text not null check (char_length(name) between 1 and 24),
  created_at timestamptz not null default now()
);

create table if not exists public.entries (
  id         text primary key check (char_length(id) between 1 and 80),
  data       jsonb not null check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.heartbeat (
  id      int primary key default 1 check (id = 1),
  beat_at timestamptz not null default now(),
  beats   bigint not null default 0
);

-- 2. Hulpfuncties -----------------------------------------------------------

-- Is de ingelogde gebruiker een van de twee leden?
create or replace function public.is_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.members where user_id = auth.uid());
$$;

-- Voegt twee JSON-objecten samen, ook op diepere niveaus.
-- Een waarde null in de patch overschrijft de oude waarde met null.
create or replace function public.jsonb_deep_merge(a jsonb, b jsonb)
returns jsonb
language plpgsql
immutable
set search_path = public
as $$
declare
  result jsonb;
  k text;
begin
  if a is null or jsonb_typeof(a) <> 'object' or b is null or jsonb_typeof(b) <> 'object' then
    return b;
  end if;
  result := a;
  for k in select jsonb_object_keys(b) loop
    if result ? k
       and jsonb_typeof(result -> k) = 'object'
       and jsonb_typeof(b -> k) = 'object' then
      result := jsonb_set(result, array[k], public.jsonb_deep_merge(result -> k, b -> k));
    else
      result := jsonb_set(result, array[k], b -> k, true);
    end if;
  end loop;
  return result;
end;
$$;

-- Past een deel van een item aan zonder wijzigingen van de ander te overschrijven.
create or replace function public.patch_entry(p_id text, p_patch jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not public.is_member() then
    raise exception 'not_member';
  end if;
  update public.entries
     set data = public.jsonb_deep_merge(data, p_patch),
         updated_at = now(),
         updated_by = auth.uid()
   where id = p_id;
end;
$$;

-- Koppelt een nieuw account aan plek a of b. Er passen maximaal twee leden in.
create or replace function public.claim_slot(p_slot text, p_name text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  existing text;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;
  select slot into existing from public.members where user_id = auth.uid();
  if existing is not null then
    return existing;
  end if;
  if p_slot not in ('a', 'b') then
    raise exception 'invalid_slot';
  end if;
  if char_length(trim(coalesce(p_name, ''))) = 0 then
    raise exception 'name_required';
  end if;
  begin
    insert into public.members (user_id, slot, name)
    values (auth.uid(), p_slot, left(trim(p_name), 24));
  exception when unique_violation then
    raise exception 'slot_taken';
  end;
  return p_slot;
end;
$$;

-- Laat nieuwe accounts zien welke plek al bezet is, zodat de tweede persoon kan aansluiten.
create or replace function public.open_slots()
returns table (slot text, name text)
language sql
stable
security definer
set search_path = public
as $$
  select m.slot, m.name from public.members m;
$$;

-- Keep-alive: schrijft een tijdstempel, zodat Supabase het project niet pauzeert.
create or replace function public.heartbeat()
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  t timestamptz;
begin
  insert into public.heartbeat (id, beat_at, beats)
  values (1, now(), 1)
  on conflict (id) do update
    set beat_at = now(), beats = public.heartbeat.beats + 1
  returning beat_at into t;
  return t;
end;
$$;

-- 3. Rechten op functies ----------------------------------------------------

revoke all on function public.is_member() from public, anon;
revoke all on function public.patch_entry(text, jsonb) from public, anon;
revoke all on function public.claim_slot(text, text) from public, anon;
revoke all on function public.open_slots() from public, anon;
revoke all on function public.heartbeat() from public;

grant execute on function public.is_member() to authenticated;
grant execute on function public.patch_entry(text, jsonb) to authenticated;
grant execute on function public.claim_slot(text, text) to authenticated;
grant execute on function public.open_slots() to authenticated;
grant execute on function public.heartbeat() to anon, authenticated;

-- 4. Row Level Security -----------------------------------------------------

alter table public.members   enable row level security;
alter table public.entries   enable row level security;
alter table public.heartbeat enable row level security;

revoke all on public.members, public.entries, public.heartbeat from anon;
revoke all on public.heartbeat from authenticated;

-- Leden: alleen leden zien elkaar. Je mag alleen je eigen naam wijzigen.
revoke insert, update, delete on public.members from authenticated;
grant select on public.members to authenticated;
grant update (name) on public.members to authenticated;

drop policy if exists "members read" on public.members;
create policy "members read" on public.members
  for select to authenticated
  using (public.is_member());

drop policy if exists "members update own name" on public.members;
create policy "members update own name" on public.members
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Items: alleen de twee leden lezen en schrijven.
grant select, insert, update, delete on public.entries to authenticated;

drop policy if exists "entries read" on public.entries;
create policy "entries read" on public.entries
  for select to authenticated using (public.is_member());

drop policy if exists "entries insert" on public.entries;
create policy "entries insert" on public.entries
  for insert to authenticated with check (public.is_member());

drop policy if exists "entries update" on public.entries;
create policy "entries update" on public.entries
  for update to authenticated using (public.is_member()) with check (public.is_member());

drop policy if exists "entries delete" on public.entries;
create policy "entries delete" on public.entries
  for delete to authenticated using (public.is_member());

-- 5. Foto-opslag ------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ooit photos read" on storage.objects;
create policy "ooit photos read" on storage.objects
  for select to authenticated
  using (bucket_id = 'photos' and public.is_member());

drop policy if exists "ooit photos insert" on storage.objects;
create policy "ooit photos insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'photos' and public.is_member());

drop policy if exists "ooit photos update" on storage.objects;
create policy "ooit photos update" on storage.objects
  for update to authenticated
  using (bucket_id = 'photos' and public.is_member())
  with check (bucket_id = 'photos' and public.is_member());

drop policy if exists "ooit photos delete" on storage.objects;
create policy "ooit photos delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'photos' and public.is_member());

-- 6. Live updates -----------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'entries'
  ) then
    alter publication supabase_realtime add table public.entries;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'members'
  ) then
    alter publication supabase_realtime add table public.members;
  end if;
end;
$$;

-- 7. Eerste heartbeat -------------------------------------------------------

select public.heartbeat();
