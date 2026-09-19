-- Ooit: meldingen op je telefoon
-- Plak dit hele bestand in Supabase > SQL Editor en klik op Run.
-- Je kunt het veilig opnieuw uitvoeren.
--
-- Wat het doet:
--   push_subs    onthoudt welke telefoons een melding mogen krijgen
--   notify_queue de meldingen die nog verstuurd moeten worden
--   push_config  het wachtwoord waarmee de GitHub-taak de wachtrij mag ophalen

-- 1. Tabellen ---------------------------------------------------------------

create table if not exists public.push_subs (
  endpoint   text primary key,
  slot       text not null check (slot in ('a', 'b')),
  user_id    uuid not null references auth.users(id) on delete cascade,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now(),
  seen_at    timestamptz not null default now()
);

create table if not exists public.notify_queue (
  id         bigserial primary key,
  slot       text not null check (slot in ('a', 'b')),
  title      text not null check (char_length(title) between 1 and 120),
  body       text not null default '' check (char_length(body) <= 300),
  tag        text,
  dedupe     text unique,
  send_after timestamptz not null default now(),
  created_at timestamptz not null default now(),
  sent_at    timestamptz
);

create index if not exists notify_queue_todo on public.notify_queue (send_after) where sent_at is null;

create table if not exists public.push_config (
  id     int primary key default 1 check (id = 1),
  secret text not null
);

-- 2. Beveiliging ------------------------------------------------------------

alter table public.push_subs    enable row level security;
alter table public.notify_queue enable row level security;
alter table public.push_config  enable row level security;

revoke all on public.push_subs, public.notify_queue, public.push_config from anon, authenticated;

-- Je mag alleen je eigen telefoons aanmelden en afmelden.
grant select, insert, update, delete on public.push_subs to authenticated;

drop policy if exists "subs own" on public.push_subs;
create policy "subs own" on public.push_subs
  for all to authenticated
  using (user_id = auth.uid() and public.is_member())
  with check (user_id = auth.uid() and public.is_member());

-- Een lid mag een melding klaarzetten en een nog niet verstuurde melding
-- weer intrekken, bijvoorbeeld als een verrassing wordt verwijderd.
grant select, insert, update, delete on public.notify_queue to authenticated;
grant usage, select on sequence public.notify_queue_id_seq to authenticated;

drop policy if exists "queue insert" on public.notify_queue;
create policy "queue insert" on public.notify_queue
  for insert to authenticated
  with check (public.is_member());

drop policy if exists "queue read" on public.notify_queue;
create policy "queue read" on public.notify_queue
  for select to authenticated
  using (public.is_member());

drop policy if exists "queue cancel" on public.notify_queue;
create policy "queue cancel" on public.notify_queue
  for delete to authenticated
  using (public.is_member() and sent_at is null);

-- Een melding die nog niet verstuurd is mag worden bijgewerkt. De app doet dat
-- bij een verrassing: verandert de datum, dan verschuift de melding mee.
-- Een verstuurde melding blijft staan zoals hij was.
drop policy if exists "queue update" on public.notify_queue;
create policy "queue update" on public.notify_queue
  for update to authenticated
  using (public.is_member() and sent_at is null)
  with check (public.is_member() and sent_at is null);

-- push_config blijft volledig dicht. Alleen de functies hieronder lezen hem.

-- 3. Functies voor de GitHub-taak -------------------------------------------

-- Haalt de meldingen op die klaarstaan, met de telefoons die ze moeten krijgen.
create or replace function public.push_batch(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  ok boolean;
  result jsonb;
begin
  select exists (select 1 from public.push_config where id = 1 and secret = p_secret) into ok;
  if not ok then
    raise exception 'bad_secret';
  end if;

  select coalesce(jsonb_agg(r order by (r->>'id')::bigint), '[]'::jsonb) into result
  from (
    select jsonb_build_object(
      'id',    q.id,
      'title', q.title,
      'body',  q.body,
      'tag',   coalesce(q.tag, 'ooit'),
      'subs',  coalesce((
                 select jsonb_agg(jsonb_build_object(
                   'endpoint', s.endpoint, 'p256dh', s.p256dh, 'auth', s.auth))
                 from public.push_subs s where s.slot = q.slot
               ), '[]'::jsonb)
    ) as r
    from public.notify_queue q
    where q.sent_at is null and q.send_after <= now()
    order by q.id
    limit 50
  ) t;

  return result;
end;
$$;

-- Zet meldingen op verstuurd en ruimt telefoons op die niet meer bestaan.
create or replace function public.push_done(p_secret text, p_ids bigint[], p_dead text[])
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  ok boolean;
begin
  select exists (select 1 from public.push_config where id = 1 and secret = p_secret) into ok;
  if not ok then
    raise exception 'bad_secret';
  end if;

  if p_ids is not null and array_length(p_ids, 1) > 0 then
    update public.notify_queue set sent_at = now() where id = any(p_ids);
  end if;

  if p_dead is not null and array_length(p_dead, 1) > 0 then
    delete from public.push_subs where endpoint = any(p_dead);
  end if;

  -- Oude, verstuurde meldingen hoeven niet te blijven staan.
  delete from public.notify_queue where sent_at is not null and sent_at < now() - interval '30 days';
end;
$$;

revoke all on function public.push_batch(text) from public;
revoke all on function public.push_done(text, bigint[], text[]) from public;
grant execute on function public.push_batch(text) to anon, authenticated;
grant execute on function public.push_done(text, bigint[], text[]) to anon, authenticated;

-- 4. Het wachtwoord ---------------------------------------------------------
-- Vervang hieronder VUL_HIER_HET_WACHTWOORD_IN door de waarde van PUSH_SECRET
-- die je ook als GitHub-secret opslaat. Zonder dat wachtwoord kan niemand de
-- wachtrij ophalen, ook niet met de publieke sleutel van de app.

insert into public.push_config (id, secret)
values (1, 'VUL_HIER_HET_WACHTWOORD_IN')
on conflict (id) do update set secret = excluded.secret;
