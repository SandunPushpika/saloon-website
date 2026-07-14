# Design Spec: Lumière Salon & Spa — Premium Salon Website (Portfolio Project)

**Date:** 2026-07-13
**Status:** Approved (pending final spec review)

## 1. Purpose & Framing

This is a portfolio project, not a real client deliverable. The goal is to demonstrate the ability to design and build a premium, high-end, Awwwards-quality website for a salon/spa-type local business, to attract future clients in that space (salons, spas, beauty clinics, barbershops).

The fictional brand used throughout is **"Lumière Salon & Spa."**

## 2. Tech Stack

- Next.js 15, App Router, TypeScript
- Tailwind CSS
- Framer Motion (animation)
- Radix UI primitives (Dialog, Accordion, Tabs, Tooltip) — used only for the handful of genuinely complex interactive components (booking modal, FAQ accordion, gallery lightbox, service category tabs) to get correct accessibility behavior (focus trapping, keyboard nav, ARIA) for free. Everything else — hero, cards, galleries, marketing sections — is fully custom-styled with Tailwind + Framer Motion, no pre-styled UI kit, to avoid a "generic template" look.
- Zustand — small global store for booking modal state only
- `next/image` with Unsplash remote image patterns configured in `next.config.js`
- npm as package manager
- No deployment target configured yet (local dev only); can be pointed at Vercel later with zero extra config since it's a standard Next.js app

Explicitly excluded: dark mode, real backend/email delivery for forms, real Instagram API, real embedded map, automated test suite. These are out of scope by deliberate decision (see Section 8).

## 3. Folder Structure

```
app/                      — routes only (page.tsx, layout.tsx per route), metadata exports
  page.tsx                — Home
  about/page.tsx
  services/page.tsx
  gallery/page.tsx
  pricing/page.tsx
  testimonials/page.tsx
  contact/page.tsx
  not-found.tsx           — custom 404
  template.tsx            — route transition animation wrapper
components/
  ui/                     — generic primitives: Button, Badge, SectionHeading, Accordion, Dialog wrapper, Tabs wrapper
  layout/                 — Navbar, Footer, ScrollProgress, ScrollToTop, WhatsAppButton, CookieConsent
  motion/                 — FadeIn, Reveal, Stagger, Magnetic, Counter, Parallax wrapper components
sections/                 — page-section-level components (Hero, ServicesPreview, WhyChooseUs, FeaturedStylists,
                            TestimonialsMarquee, BeforeAfterGallery, PricingHighlights, InstagramPreview, BookingCTA,
                            AboutTimeline, ServiceFilterGrid, GalleryMasonry, FAQAccordion, ContactForm, etc.)
lib/                      — utils (cn helper, formatters), motion.ts (shared animation variants/tokens), booking-store.ts (Zustand)
hooks/                    — useScrollDirection, useLockBodyScroll, useMediaQuery, useCountUp
types/                    — Service, Stylist, Testimonial, GalleryItem, PricingTier, FAQItem, TeamMember
constants/                — site content: services.ts, stylists.ts, testimonials.ts, gallery.ts, pricing.ts, faq.ts, nav.ts, siteConfig.ts
public/                   — favicon, og-image, any local static assets
```

## 4. Content Model

All copy/content lives in typed constants files under `constants/`, backed by interfaces in `types/`. No CMS, no backend, no database — this keeps content edits trivial and matches the requested project structure.

Content volume defaults (can be adjusted freely since it's all static data):
- **Services:** 10 items — Hair Cut, Hair Coloring, Highlights, Keratin Treatment, Hair Spa, Bridal Makeup, Makeup, Facial, Nail Care, Beard Styling. Each has `category` (Hair | Makeup | Nails | Spa), image, description, duration, startingPrice.
- **Stylists/Team:** 6-8 members for the About page team grid; Home's "Featured Stylists" shows 4 of them.
- **Testimonials:** 8-10 reviews (photo, name, rating, quote); a 6-review subset renders in the Home marquee.
- **Gallery:** ~16-20 images across 5 categories (Interior, Hair, Makeup, Bridal, Nails).
- **Pricing:** mirrors the Services list, grouped by the same 4 categories.
- **FAQ:** 5-6 Q&As (booking policy, cancellation, walk-ins, parking, gift cards, group bookings).

## 5. Design System

**Colors** (Tailwind theme tokens, defined in `globals.css`):
- `ivory` `#F8F6F2` — primary background
- `charcoal` `#222222` — primary text, dark surfaces (footer, dark sections)
- `beige` `#DCC9B6` — secondary surfaces, subtle backgrounds, borders
- `rose-gold` `#C9987A` — primary accent (CTAs, links, active states, icons)
- `sage` `#9BA88D` — secondary accent, used sparingly (badges, small hover highlights) so it never competes with rose-gold
- White — cards/panels sitting on beige or charcoal backgrounds

Accessibility: charcoal-on-ivory and ivory-on-charcoal both pass WCAG AA for body text. Rose-gold is only used at sizes/weights where its contrast ratio still clears AA (large headings, buttons with adequate padding, icons) — never for small body copy.

**Typography:**
- Playfair Display (`font-display`) for headings only — h1 scales ~48px→96px, h2 ~36px→64px (responsive clamp)
- Inter (`font-sans`) for body/UI — 16-18px base, 1.6-1.7 line height
- Buttons/UI labels use Inter, tracked-out uppercase, never Playfair — keeps the display font special-purpose

**Spacing:** Section vertical padding scales `py-20` (mobile) → `py-32`/`py-40` (desktop). Max content width `max-w-7xl`; hero and before/after sections break out full-bleed for visual drama.

**Motion tokens** (`lib/motion.ts`): shared variants (`fadeInUp`, `staggerContainer`, `revealOnScroll` via `whileInView`), consistent easing `[0.16, 1, 0.3, 1]`, duration scale (0.4s small elements, 0.8s section reveals) — one animation system reused everywhere, not ad-hoc per component.

## 6. Pages

### Home (`app/page.tsx`)
Hero (full-bleed Unsplash interior image, parallax drift, fade-in headline "Where Beauty Meets Artistry", CTAs: "Book Appointment" → opens booking modal, "Explore Services" → anchor/link) → Services Preview (6 of 10 service cards, "View All" → /services) → Why Choose Us (4 stat cards with animated count-up: years experience, clients served, awards, stylists) → Featured Stylists (4 cards) → Testimonials (auto-scrolling marquee, 6 reviews) → Before & After (drag-comparison slider, 3-4 examples) → Pricing Highlights (3 teaser cards, "View Full Pricing" link) → Instagram Preview (static mock 6-image grid) → Booking CTA banner (full-width) → Footer.

### About (`app/about/page.tsx`)
Story (founder narrative + image) → Timeline (4-5 milestones) → Team grid (6-8 stylists, photo/role/specialty) → Mission & Values (3-4 value cards) → Awards strip (static badges/logos) → closing CTA.

### Services (`app/services/page.tsx`)
Radix Tabs category filter (All / Hair / Makeup / Nails / Spa) with animated grid reflow (Framer Motion layout animations) across all 10 services; each card shows image, description, duration, starting price, "Book Now" (opens booking modal pre-selecting that service).

### Gallery (`app/gallery/page.tsx`)
Masonry grid across 5 categories (Interior, Hair, Makeup, Bridal, Nails) with category filter, hover zoom + caption reveal, click opens a Radix Dialog-based lightbox with keyboard navigation (arrows, Esc).

### Pricing (`app/pricing/page.tsx`)
Same 4 categories as Services; elegant pricing cards grouped by category with staggered reveal per section.

### Testimonials (`app/testimonials/page.tsx`)
Full review set (8-10) as an animated grid (photo, star rating, quote), plus the same marquee component reused from Home as a "recent reviews" strip at the top.

### Contact (`app/contact/page.tsx`)
Two-column layout: contact form (name, email, phone, service interest, message → animated success state, no real send) + info panel (address, phone, email, hours table, social icons, styled map placeholder). FAQ accordion below (Radix Accordion, 5-6 Q&As).

### Site-wide Nav/Footer
**Navbar:** logo, links to all 7 pages, always-visible "Book Now" button, transparent→solid on scroll transition, animated mobile drawer menu.
**Footer:** logo+tagline, nav columns, contact info, hours, newsletter signup (mock submit), social icons, Instagram mini-grid, copyright bar.

## 7. Animation Inventory

Built on the shared motion tokens (Section 5) via `components/motion/` wrappers, so no page/section hand-rolls its own timing:
- `Reveal`/`FadeIn` — scroll-triggered fade+rise, staggered via `staggerContainer`; used on section headings and card grids sitewide
- `Magnetic` — wraps primary CTA buttons; cursor-follow pull on hover, desktop only (disabled on touch)
- `Counter` — animated count-up for stats, triggers once on scroll into view
- `Parallax` — hero background drift on scroll
- Animated underline — shared nav-link/"View All"-link component using a Framer Motion `layoutId` underline that slides between hover/active states
- Page transitions — `app/template.tsx` fades/slides briefly between route changes
- Scroll progress bar — fixed top bar tied to `useScroll`
- Loading screen — one-time animated splash (logo reveal) on first load only, gated by `sessionStorage` so it doesn't replay on internal navigation

## 8. Bonus Features (scoped in)

- Scroll-to-top button (fades in after scrolling past hero)
- Before/after drag-comparison slider (Home + Gallery)
- Floating WhatsApp button (fixed corner, `wa.me` link with pre-filled message)
- Instagram feed section (static mock grid — no live API, no real account)
- "As featured in" client logo strip (static, grayscale→color on hover)
- Cookie consent banner (bottom bar, dismiss choice stored in `localStorage`, cosmetic only — no real tracking exists)
- Newsletter subscription (mock submit, animated success state)
- Skeleton loaders for gallery images during load
- Custom 404 page (on-brand message/illustration + "Back to Home" CTA)

## 9. Explicitly Out of Scope

- Dark mode — a single, tightly-controlled luxury theme (ivory/charcoal/rose-gold) is stronger for this brand than a full light/dark system; decided in favor of design consistency over the bonus-feature checklist.
- Real backend/email delivery for contact, booking, and newsletter forms — all forms are polished client-side mocks (validation + realistic success states) since there is no real business behind this.
- Real Instagram API integration — static mock grid only.
- Real embedded map — styled static placeholder only.
- Automated test suite — not requested for this portfolio project; can be added later as a separate effort if desired.

## 10. Key Architectural Decisions (rationale)

1. **Radix primitives + fully custom styling**, not shadcn/ui scaffolding or 100%-from-scratch behavior code. Radix ships zero visual opinions, so there's no risk of a "templated" look, while complex interactive components (modal, accordion, tabs, lightbox) get correct accessibility behavior without hand-rolling focus traps and ARIA.
2. **Typed constants files instead of a CMS.** No real content-management need exists for a static portfolio piece; TypeScript interfaces in `types/` keep every page's data consistent.
3. **Zustand for booking modal state only.** The one piece of state that needs to be triggered from many places across the site (any "Book Now" button, pre-filling a specific service) — everything else stays local component state.
4. **One big spec covering the whole site** (rather than phased specs), per explicit preference — implementation will still be broken into an ordered plan (foundation → Home → remaining pages → bonus features) so review checkpoints still exist during build, even though the design itself is decided up front.
