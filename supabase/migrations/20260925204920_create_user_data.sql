-- Applied to the Supabase project "all-aboard-planning" (ref eawdxearyzkkloivokdh)
-- as migration 20260925204920 create_user_data. Kept here as the record of the
-- schema; apply future changes as new, numbered migration files.
--
-- Each learner's saved progress, one row per kind of data:
--   history  = scored exam attempts
--   study    = lessons completed, checkpoints, flashcards, study plan
--   attempts = exams in progress (so a half-finished exam follows you)
-- The site keeps a local copy in the browser and syncs it here
-- (web/src/lib/cloudSync.js).
create table public.user_data (
  user_id    uuid not null references auth.users (id) on delete cascade,
  key        text not null check (key in ('history', 'study', 'attempts')),
  value      jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

comment on table public.user_data is 'Per-learner progress documents synced from the All Aboard Planning site.';

alter table public.user_data enable row level security;

-- A signed-in learner can read and write only their own rows.
create policy "Learners read their own data"
  on public.user_data for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Learners add their own data"
  on public.user_data for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Learners update their own data"
  on public.user_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Learners delete their own data"
  on public.user_data for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Keep updated_at current on every write.
create function public.touch_user_data_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger user_data_touch_updated_at
  before update on public.user_data
  for each row execute function public.touch_user_data_updated_at();
