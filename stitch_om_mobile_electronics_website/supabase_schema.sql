-- =========================================================================
-- OM MOBILE & ELECTRONICS (Branch No. 4, Dhanore, Pune)
-- SUPABASE DATABASE INITIALIZATION SCHEMA
-- =========================================================================
-- Instructions:
-- 1. Create a free project at https://supabase.com
-- 2. Open the "SQL Editor" in your Supabase dashboard
-- 3. Paste this entire script and click "Run" (Ctrl + Enter)
-- 4. Copy your Project URL and anon public key from Project Settings -> API
-- 5. Paste them in your admin panel (/admin) under "Cloud Database Settings"
-- =========================================================================

-- 1. Create products table
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null default 'smartphones',
  brand text not null default 'Apple',
  price numeric not null default 0,
  original_price numeric default 0,
  emi_per_month numeric default 0,
  rating numeric default 4.8,
  reviews integer default 0,
  tag text default 'New Arrival',
  tag_color text default 'bg-primary text-white',
  stock_status text default 'In Stock at Dhanore Showroom',
  image text default '',
  description text default '',
  specs jsonb default '{}'::jsonb,
  colors text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- 3. Create Public Access Policies
-- Allow anyone to read products (storefront visitors)
drop policy if exists "Allow public read access" on public.products;
create policy "Allow public read access"
  on public.products for select
  using (true);

-- Allow authenticated and anon insert (for store admin)
drop policy if exists "Allow anon insert" on public.products;
create policy "Allow anon insert"
  on public.products for insert
  with check (true);

-- Allow updates
drop policy if exists "Allow anon update" on public.products;
create policy "Allow anon update"
  on public.products for update
  using (true);

-- Allow deletion
drop policy if exists "Allow anon delete" on public.products;
create policy "Allow anon delete"
  on public.products for delete
  using (true);

-- 4. Enable Supabase Realtime broadcast for instant cross-device sync
alter publication supabase_realtime add table public.products;

-- 5. Create storage bucket for product images (Optional for image hosting)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public Access to product-images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Anon upload to product-images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');
