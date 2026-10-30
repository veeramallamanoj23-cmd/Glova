# GLOVA — Premium Unisex Salon & Beauty Studio

> **"Your Style. Your Glow. Your Moment."**

GLOVA is a modern, high-end, full-featured unisex salon and beauty studio web application built with React, TypeScript, Tailwind CSS, and resilient dual persistence (Supabase + LocalStorage Fallback). It is inspired by industry-leading luxury platforms (Fresha, Treatwell, Drybar, Sephora VIP) and benchmarked against high-converting UX architecture from Mobbin.

---

## ✨ Key Features & Architecture

### 1. Brand Identity & Luxury Design
- **Color Palette:** Obsidian Black (`#0A0A0C`), Champagne Gold (`#D4AF37`, `#F3E5AB`), Warm Ivory (`#FAF7F2`), and Alabaster.
- **Typography:** Haute-couture editorial serif (*Playfair Display*) paired with clean geometric modern sans (*Plus Jakarta Sans*).
- **Subtle Micro-Interactions:** Gold button glows, glassmorphism panels, interactive hover states, and smooth scroll spy.
- **Introductory Brand Reveal:** Luxury introductory animation displaying the GLOVA monogram on first load.

### 2. Complete Men's & Women's Services Menu
Includes every single requested service with configurable prices in ₹, durations, descriptions, and consultation advisories:
- **Men's Services:**
  - *Hair:* Classic Cut, Premium Cut, Fade Haircut, Skin Fade, Hair Styling, Wash & Conditioning, Scalp Spa, Hair Coloring, Grey Coverage Camouflage, Straightening, Smoothening, Keratin, Scalp Treatment, Hair & Beard Styling.
  - *Beard & Grooming:* Beard Trimming, Beard Shaping, Clean Shave, Premium Hot Towel Shave, Beard Coloring, Head Shave, Face Cleanup, Eyebrow Grooming, Nose & Ear Grooming.
  - *Skincare:* Basic Facial, Deep Cleansing, Anti-Tan, Charcoal Detox, Brightening Vitamin C, Acne-Focused, Detan Treatment, Face Scrub, Face Bleach.
  - *Special Packages:* Haircut + Beard Trim, Haircut + Cleanup, Haircut + Spa, Grooming + Facial, Complete Gentleman Grooming Package.
- **Women's Services:**
  - *Hair:* Women's Cut, Layer Cut, Bob Cut, Pixie Cut, U & V Cut, Trimming, Bangs Styling, Blow-Dry Styling, Party Styling, Bridal Styling, Hair Spa, Deep Conditioning, Smoothening, Keratin, Straightening, Rebonding, Coloring, Global Color, Highlights, Balayage, Root Touch-Up, Grey Coverage, Scalp Treatment.
  - *Facials & Skincare:* Basic Facial, Deep Cleansing, Hydrating, Brightening, Anti-Tan, Bridal Facial, 24K Gold Facial, Fruit Facial, Acne-Focused, Detan Treatment, Face Cleanup, Face Bleach, Face Scrub.
  - *Waxing & Threading:* Eyebrow, Upper Lip, Chin, Full Face Threading, Full Arms, Half Arms, Underarms, Full Legs, Half Legs, Full Body Waxing, Bikini Waxing.
  - *Manicure & Pedicure:* Basic & Premium Manicure, Gel Manicure, Nail Art, Nail Extensions, Basic & Spa Pedicure, Premium Pedicure, Foot Spa.
  - *Makeup & Bridal:* Party Makeup, Engagement Makeup, Bridal Makeup, Reception Makeup, HD Makeup, Airbrush Makeup, Eye Makeup, Saree Draping, Bridal Hairstyling, Pre-Bridal 3-Day Package.
  - *Body & Spa:* Head Massage, Swedish Body Massage, Body Polishing, Body Scrub, Hair & Scalp Spa, Relaxation Treatments.

### 3. Service Search, Category Filtering & Sorting
- Real-time search across service names, descriptions, and subcategories.
- Tab toggles for **Men's Studio**, **Women's Studio**, and **All Services**.
- Subcategory pill filters (`Hair`, `Beard`, `Skincare`, `Waxing`, `Nails`, `Makeup`, `Spa`, `Packages`).
- Dynamic sorting by **Price (Low to High / High to Low)**, **Duration**, and **Popularity**.

### 4. Interactive Before & After Transformation Slider
- Interactive draggable split-screen comparison slider showcasing real transformations:
  - Couture Balayage & Keratin Bond Restoration
  - Executive Skin Fade & Geometric Beard Sculpt
  - Clinical Anti-Dullness & Collagen Infusion

### 5. Curated VIP Packages & Membership Privilege
- Inspired by Drybar "Barfly" and Sephora VIP patterns.
- Bundles for Men, Women, Couples, and monthly VIP passes.
- Original vs. Discounted prices in ₹ with savings calculations and clear inclusion checklists.

### 6. Online Appointment Booking Engine
- Step-by-step frictionless booking wizard:
  - Step 1: Treatment and preferred stylist selection (or "Any Senior Stylist").
  - Step 2: Date selection (prevents past dates) & real-time slot conflict checking (10:00 AM – 08:30 PM).
  - Step 3: Guest details with 10-digit mobile number validation and styling notes.
  - Step 4: Booking confirmation with unique reference code (e.g. `GLV-2026-XXXX`), celebration confetti, downloadable `.ics` calendar pass, and instant WhatsApp notification link.
- **Strict Integrity:** Only displays success after persisting to database.

### 7. Protected Salon Administration Dashboard
- PIN-protected login gate (Default PIN: `admin123`).
- Overview KPIs: Total bookings, confirmed count, pending review, projected revenue.
- Appointment Manager: Filter by status, confirm/complete/cancel appointments.
- Service Manager: Add new services, edit prices, durations, descriptions, and toggles.
- Stylist Roster & Availability.
- Salon Settings: Opening hours, contact numbers, emergency announcement banner.
- One-click CSV Export of all reservations.

### 8. Database Architecture
- Supabase integration ready (`supabase/schema.sql` with full Row-Level Security policies).
- Resilient client storage persistence layer that works out-of-the-box without requiring third-party credentials.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The application runs at `http://localhost:3000` (or the port specified by Vite).

---

## 🔐 Administrative Access
- Open the Admin Portal by clicking the shield icon in the navigation bar or footer.
- **Default PIN:** `admin123` (or `2026`).
