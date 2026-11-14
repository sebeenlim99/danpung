-- 단풍 표본실: 표본 표 + 사진 저장소 + "내 것만 읽고 쓰기" 규칙
-- Supabase 대시보드 > SQL Editor > New query 에 전부 붙여넣고 Run

-- 1) 표본 표
create table if not exists public.leaves (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date        date not null,
  species     text default '',
  place       text default '',
  crisp       smallint check (crisp between 0 and 100),
  memo        text default '' check (char_length(memo) <= 60),
  palette     text[] default '{}',
  ta          real default 1,
  img_path    text not null,
  tile_path   text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique (user_id, date)          -- 하루에 한 잎
);

-- 2) 로그인한 사람만, 자기 줄만
alter table public.leaves enable row level security;
grant select, insert, update, delete on public.leaves to authenticated;

drop policy if exists "내 표본 보기" on public.leaves;
create policy "내 표본 보기"   on public.leaves for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "내 표본 넣기" on public.leaves;
create policy "내 표본 넣기"   on public.leaves for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "내 표본 고치기" on public.leaves;
create policy "내 표본 고치기" on public.leaves for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "내 표본 지우기" on public.leaves;
create policy "내 표본 지우기" on public.leaves for delete to authenticated using ((select auth.uid()) = user_id);

-- 3) 사진 저장소 (비공개, 1장 최대 1MB, 이미지만)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('leaves', 'leaves', false, 1048576, array['image/webp','image/png','image/jpeg'])
on conflict (id) do nothing;

-- 사진은 "내아이디/파일이름" 폴더에만
drop policy if exists "내 사진 보기" on storage.objects;
create policy "내 사진 보기"   on storage.objects for select to authenticated using (bucket_id = 'leaves' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "내 사진 올리기" on storage.objects;
create policy "내 사진 올리기" on storage.objects for insert to authenticated with check (bucket_id = 'leaves' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "내 사진 바꾸기" on storage.objects;
create policy "내 사진 바꾸기" on storage.objects for update to authenticated using (bucket_id = 'leaves' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "내 사진 지우기" on storage.objects;
create policy "내 사진 지우기" on storage.objects for delete to authenticated using (bucket_id = 'leaves' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- 5) 탈퇴: 로그인한 사람이 자기 계정만 지울 수 있는 함수
--    (사진은 앱이 먼저 지우고, 표본 줄은 계정이 지워질 때 같이 지워져요)
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from public.leaves where user_id = auth.uid();
  delete from auth.users where id = auth.uid();
end;
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
