# Bal Krishna Boys' PG - Official Website

Official website and inquiry portal for **Bal Krishna Boys' PG**, a furnished paying guest hostel accommodation for male college students and working professionals in Ahmedabad, Gujarat.

---

## 📋 Property & Business Facts

### Location & Contact
- **Property Name:** Bal Krishna Boys' PG
- **Owner & Management:** Kashyap Patel
- **Address:** 35, Nitin Nagar Society, Near Sola Railway Crossing, Science City Road, Ghatlodiya, Ahmedabad, Gujarat 380061
- **Coordinates:** `23.0780° N, 72.5310° E`
- **Phone / WhatsApp:** +91 63535 78799
- **Email:** balkrishnaboyspg@gmail.com
- **Visiting Hours:** 9:00 AM – 9:00 PM Daily (in-person visits and live video tours for outstation parents)
- **Nearby Institutions:** Silver Oak University, SAL Education Campus, Nirma University, Gujarat University, SG Highway, Science City

### Room Catalog & Tariffs (Per Person, Monthly)
- **2 Sharing (Non-AC):** ₹10,000 / month — General washroom
- **3 Sharing (Non-AC):** ₹8,000 / month — General washroom
- **3 Sharing (AC):** ₹9,000 / month — Attached bathroom + AC electricity per sub-meter
- **4 Sharing (Non-AC):** ₹8,000 / month — General washroom
- **4 Sharing (AC):** ₹9,000 / month — Attached bathroom + AC electricity per sub-meter
- **5 Sharing (Non-AC):** ₹8,000 / month — General washroom (1 exclusive spacious room on property)

### Included Amenities & Services
- **Meals:** 3 daily 100% Pure Vegetarian meals (Breakfast, Lunch with morning self-pack tiffins, and Dinner). 100% Pure Jain food prepared upon request. Sunday dinner off.
- **Gate Access:** 24/7 open gate access with zero night curfew.
- **Internet:** High-speed commercial fiber Wi-Fi throughout the premises.
- **Laundry & Cleaning:** Automatic washing machines available for resident use; daily housekeeping for rooms and common areas.
- **Water & Power:** Chilled RO drinking water, 24/7 hot water geysers, regular electricity (lights, ceiling fans, mobile/laptop charging, Wi-Fi, RO) included in base rent. Individual digital sub-meters for AC rooms billed at government tariff rates.
- **Furnishings:** Single bed, comfortable mattress, pillow, bedsheet, lockable personal wardrobe, and study desk with chair.

### Policies & Terms
- **Security Deposit:** 1-month refundable deposit collected at admission.
- **Notice Period:** 30-day prior notice required before vacating.
- **Payment Accepted:** Cash, UPI, and Bank Transfer (INR).
- **Substance Policy:** Zero tolerance for smoking, alcohol, tobacco, or gutkha.
- **Study Environment:** Noise-free study hours observed after 11:00 PM.

---

## 🛠️ Tools & Technologies Used

### Frontend Architecture & Markup
- **HTML5:** Semantic, accessible multi-page structure (`index.html`, `404.html`, `thank-you.html`, `privacy-policy.html`).
- **Tailwind CSS (v3 CDN):** Utility-first styling framework with extended design tokens for custom brand colors (Crest Navy, Marigold, Slate).
- **Custom Design System:** Frosted Acrylic Material System with backdrop blur filters, hairline glass borders, ambient light blooms, and fluid typography.
- **Dual Theme Support (Light / Dark):** Built-in dark mode (`dark` class) with automatic OS device preference detection (`prefers-color-scheme`) and persistent toggle via `localStorage`.
- **Google Fonts:** `Sora` (geometric display font for headings) and `Figtree` (clean, highly legible UI and body font).

### Client-Side JavaScript
- **Vanilla JavaScript (ES6+):** Pure browser-native scripts (`assets/js/main.js`, `assets/js/theme.js`) with zero heavy framework runtime overhead.
- **Dynamic Lead Link Generator:** Computes customized WhatsApp deep-links with pre-filled inquiry parameters based on user selections.
- **Room Option Validator:** Client-side business logic synchronizing sharing selection with AC / Non-AC availability (locks AC for 2-sharing and 5-sharing).
- **Photo Carousel:** Lightweight, accessible touch- and keyboard-navigable image slider for verified property photos.
- **Accordion FAQ:** Expandable/collapsible FAQ sections with accessible ARIA attributes.

### Form Handling & Third-Party Integrations
- **Formspree:** Asynchronous AJAX form endpoint (`xkjjvyke`) for lead intake and automated email notifications with client-side fallback.
- **Cloudflare Turnstile:** Privacy-focused CAPTCHA alternative for anti-spam form verification.
- **Google Analytics 4 (GA4):** `gtag.js` integration tracking user engagement and custom lead generation conversion events (`generate_lead`, `contact`).
- **Google Maps:** Embedded responsive interactive map showing exact property location and transit routes.
- **Elfsight Google Reviews:** Live review widget showcasing verified Google Business Profile ratings and tenant testimonials.

### Search Engine Optimization (SEO) & Metadata
- **Schema.org Structured Data:**
  - `Hostel` / `LocalBusiness` JSON-LD schema with address, geo-coordinates, price range, opening hours, verified ratings (`4.8`), and amenities.
  - `FAQPage` JSON-LD schema providing structured Q&A for search engine rich results.
- **Social & Discovery Tags:** Open Graph (`og:*`) and Twitter Card (`twitter:*`) metadata with custom preview banner images.
- **Crawler Assets:** XML Sitemap (`sitemap.xml`), Robots configuration (`robots.txt`), search engine verification tags (Google Search Console & Bing Webmaster Tools), and LLM context file (`llms.txt`).

### Hosting & CI/CD
- **GitHub Pages:** Static site hosting with native HTTPS / SSL encryption.
- **GitHub Actions (`.github/workflows/pages.yml`):** Automated CI/CD workflow deploying the `main` branch to GitHub Pages upon every push.

---

## 📁 Repository Structure

```
bal-krishna-boys-pg.github.io/
├── .github/
│   └── workflows/
│       └── pages.yml           # GitHub Actions workflow for automated Pages deployment
├── assets/
│   ├── images/
│   │   ├── 2 sharing non-ac.jpeg # Authentic photograph of 2-sharing room
│   │   ├── 3 sharing non-ac.jpeg # Authentic photograph of 3-sharing room
│   │   ├── 4 sharing non-ac.jpeg # Authentic photograph of 4-sharing room
│   │   ├── favicon.ico         # Browser tab favicon emblem
│   │   └── logo.png            # Official brand logo & social preview image
│   └── js/
│       ├── main.js             # Form handling, WhatsApp builder, room validation, FAQ accordions
│       └── theme.js            # Light/Dark mode state management and toggle controller
├── index.html                  # Main responsive landing page and inquiry portal
├── 404.html                    # Custom 404 error page
├── thank-you.html              # Post-inquiry confirmation and next steps page
├── privacy-policy.html         # Data handling and privacy policy
├── sitemap.xml                 # Search engine XML sitemap
├── robots.txt                  # Web crawler rules and sitemap location
├── llms.txt                    # Structured site overview for AI/LLM agents
├── design.md                   # Visual architecture and design system documentation
├── PRODUCT.md                  # Product specifications and business guidelines
└── README.md                   # Property facts and technical documentation
```
