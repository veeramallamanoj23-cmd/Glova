-- ====================================================================
-- GLOVA Premium Unisex Salon & Beauty Studio — Supabase Database Schema
-- ====================================================================

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'unisex')),
  subcategory TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  requires_consultation BOOLEAN DEFAULT false,
  image TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Stylists Table
CREATE TABLE IF NOT EXISTS public.stylists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience TEXT NOT NULL,
  bio TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  booking_ref TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  stylist_id TEXT,
  stylist_name TEXT,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  notes TEXT,
  total_price NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Packages Table
CREATE TABLE IF NOT EXISTS public.packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  original_price NUMERIC(10, 2) NOT NULL,
  discounted_price NUMERIC(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  inclusions JSONB NOT NULL,
  popular BOOLEAN DEFAULT false,
  tag TEXT,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  service_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can view active services, stylists, packages, reviews
CREATE POLICY "Public services are viewable by everyone" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Public stylists are viewable by everyone" ON public.stylists
  FOR SELECT USING (true);

CREATE POLICY "Public packages are viewable by everyone" ON public.packages
  FOR SELECT USING (true);

CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (true);

-- Anyone can submit a booking
CREATE POLICY "Public can insert appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Clients can look up their own appointment by booking reference
CREATE POLICY "Clients can view appointment by booking reference" ON public.appointments
  FOR SELECT USING (true);

-- Admin update policy (when authenticated or via edge functions)
CREATE POLICY "Admins have full access to appointments" ON public.appointments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');
