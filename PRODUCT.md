# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dual equal primary audience in English:
- **Prospective residents:** Male college students (attending nearby institutes such as Silver Oak University, SAL, Nirma University, Gujarat University) and young working professionals (SG Highway, Science City Road, Sola corridor) seeking furnished paying-guest accommodation with meals, Wi-Fi, and 24/7 entry freedom.
- **Parents and guardians:** Families vetting accommodation hygiene, pure vegetarian/Jain food availability, house discipline, visiting policies, and direct management accountability before approving or booking a visit.

## Product Purpose

Official website and inquiry portal for **Balkrishna Boys' PG** (`35, Nitin Nagar Society, Near Sola Railway Crossing, Science City Road, Ghatlodiya, Ahmedabad, Gujarat 380061`, managed by owner **Kashyap Patel**). It gives prospective tenants and parents transparent answers upfront on rooms, pricing, meals, amenities, rules, and location, then converts high-intent visitors into direct telephone calls, pre-filled WhatsApp conversations, or email inquiries to schedule in-person or video tours and reserve beds.

## Positioning

Combines full adult independence (**24/7 open gate access with zero night curfew**) with family-grade care and clarity (**100% pure vegetarian meals with Jain food on request**, **all regular electricity included**, **strict zero-smoking/zero-alcohol/zero-tobacco enforcement**, and **direct contact with owner Kashyap Patel**), contrasting against curfew-restricted hostels and opaque utility billing.

## Operating Context

- **Inquiry flow:** Visitors review room options and amenities, select sharing preferences (or jump from a room card CTA), and submit either via an auto-formatted WhatsApp message (`+91 63535 78799`), direct phone call (`+91 63535 78799`), or Formspree-backed email form (`https://formspree.io/f/xkjjvyke`), which redirects to `thank-you.html`.
- **Visit & response expectations:** Walk-in/parent visits run `9:00 AM – 9:00 PM` daily; management targets a `2 to 4 hours` follow-up window on email inquiries; live video tours are offered for outstation visitors.
- **Resident policies & rules:** Quiet study hours post `11:00 PM`; 1-month refundable security deposit; `30-day` prior vacate notice; Sunday dinner off (weekday/weekend meals include breakfast, lunch with self-pack tiffin, and dinner).

## Capabilities and Constraints

- **Room catalog & pricing truth (per person, monthly):**
  - `2 Sharing`: `₹10,000/mo`, Non-AC Only (General/Common washroom).
  - `3 Sharing`: `₹8,000/mo` Non-AC (General bath) or `₹9,000/mo` AC (Attached bath + AC sub-meter electricity).
  - `4 Sharing`: `₹8,000/mo` Non-AC (General bath) or `₹9,000/mo` AC (Attached bath + AC sub-meter electricity).
  - `5 Sharing`: `₹8,000/mo`, Non-AC Only, 1 exclusive room on property (General/Common washroom).
- **Business-rule parity:** The inquiry form validates that AC rooms can only be chosen for `3 Sharing` or `4 Sharing`, automatically locking and resetting `2 Sharing` and `5 Sharing` inquiries to `Non-AC`.
- **Confirmed included utilities & services:** 3 daily pure veg meals (Jain on request; Sunday dinner off), automatic washing machines, high-speed fiber Wi-Fi, daily housekeeping, RO drinking water, hot water geysers, furniture (bed, mattress, pillow, wardrobe with lock, study desk/chair), and regular electricity (fans, lights, charging, common lighting, Wi-Fi, RO). Only AC unit usage is billed separately per sub-meter.
- **Technical & conversion boundaries:**
  - Zero-backend static site hosted on GitHub Pages (`https://bal-krishna-boys-pg.github.io/`), supporting `index.html`, `thank-you.html`, `privacy-policy.html`, and `404.html`.
  - **Inquiry-only funnel:** No online payments, instant bed checkout, user accounts, or live room-vacancy database.
  - Third-party integrations: Formspree (`xkjjvyke`), Cloudflare Turnstile, Google Analytics 4 (`G-QYFWKKXXKS` tracking `generate_lead` and `contact`), Google Maps embed, and Elfsight Google Reviews widget.
- **Explicitly open / pending items:**
  - Replace Cloudflare Turnstile always-pass test sitekey (`1x00000000000000000000AA`) with the production Cloudflare sitekey.
  - Capture and add authentic property photographs for AC rooms, dining/kitchen area, 5-sharing hall, and washrooms (no stock-photo substitution).

## Brand Commitments

- **Official business identity:** **Balkrishna Boys' PG** (Owner: **Kashyap Patel**), Ahmedabad (`+91 63535 78799`, `balkrishnaboyspg@gmail.com`).
- **Voice:** Transparent, respectful, reassuring, and straightforward — honoring young adults' independence while giving parents concrete policy clarity.
- **Existing brand assets:** `assets/images/logo.png` and `assets/images/favicon.ico`. Existing visual tokens and palette decisions live separately in `design.md`.

## Evidence on Hand

- **Verified property room photos:** `assets/images/2 sharing non-ac.jpeg`, `assets/images/3 sharing non-ac.jpeg`, and `assets/images/4 sharing non-ac.jpeg`.
- **Social proof & location:** Live Google Business Profile reviews embedded via Elfsight (`elfsight-app-ecfcb0ca-d7f7-4aa9-8204-eb3601fe0af4`), Google Maps `4.8` rating reference, and Google Maps embed (`Balkrishna Boys PG Ghatlodiya Ahmedabad`).
- **Absences not to fabricate:** No verified AC room, dining hall, washroom, or exterior photos yet; no static invented resident quotes/reviews, bed-count availability counters, or unverified claims.

## Product Principles

1. **Upfront transparency before inquiry:** Publish exact sharing options, rents, AC sub-metering, deposit/notice rules, and Sunday-dinner schedules clearly so only well-informed visitors reach out.
2. **Lowest-friction contact first:** Prioritize instant calling and pre-filled WhatsApp messages alongside the spam-protected email form, keeping the site a fast lead funnel with zero online payment/account barriers.
3. **Earn trust from both generations:** Respect resident autonomy (`24/7` gate access) while reassuring parents (`100%` pure veg/Jain food, strict no smoking/alcohol rule, open daytime visits).
4. **Real evidence over filler:** Show only authentic property photos, verified Google review embeds, and accurate disclosures within a lean zero-backend static architecture.

## Accessibility & Inclusion

- Target **WCAG 2.1 / 2.2 Level AA** conformance across all pages (`index.html`, `404.html`, `thank-you.html`, `privacy-policy.html`), preserving skip-to-main-content links, semantic landmarks and heading order, keyboard access (`Escape` menu close, interactive carousel Play/Pause and accordion controls), `prefers-reduced-motion` support, field `autocomplete` attributes, and assistive-tech status updates.

