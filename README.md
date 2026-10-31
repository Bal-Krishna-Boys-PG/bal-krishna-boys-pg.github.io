# Balkrishna Boys' PG - Official Website

Landing page and web portal for **Balkrishna Boys' PG** in Ahmedabad (near Sola Railway Crossing & Science City Road). Engineered for high-conversion lead generation on GitHub Pages with zero server backend.

## 🚀 Live Demo & Deployment
- Hosted on **GitHub Pages**: `https://bal-krishna-boys-pg.github.io`
- Instant mobile responsiveness, SEO optimized with Schema.org `Hostel` and `FAQPage` structured data.
- Enforced **HTTPS** with automatic SSL/TLS certificate provided by GitHub Pages.

## 📁 File Structure
```
bal-krishna-boys-pg.github.io/
├── index.html          # Main responsive landing page (Tailwind CSS, SVG icons, Google Maps embed, FAQ)
├── 404.html            # Custom responsive 404 error page (GitHub Pages native fallback)
├── thank-you.html      # Confirmation / Thank You page after successful form inquiry
├── privacy-policy.html # Comprehensive privacy policy & user rights documentation
├── sitemap.xml         # XML sitemap for Google Search Console & indexing
├── robots.txt          # Crawler instructions & sitemap declaration
├── design.md           # Architecture, UX wireframes & conversion blueprint
├── README.md           # Setup & customization guide
└── assets/
    ├── images/
    │   ├── 2 sharing non-ac.jpeg # Authentic photo of 2-sharing room
    │   ├── 3 sharing non-ac.jpeg # Authentic photo of 3-sharing room
    │   ├── 4 sharing non-ac.jpeg # Authentic photo of 4-sharing room
    │   ├── favicon.ico           # Website tab icon (branding emblem)
    │   └── logo.png              # Official PG brand logo & social sharing preview image
    └── js/
        └── main.js     # WhatsApp URL generator, async Formspree handler, room validator, GA events, FAQ accordion
```

## ⚙️ Quick Customization Guide for Owner

### 1. Update Monthly Rates
Open [index.html](file:///e:/bal-krishna-boys-pg.github.io/index.html) and update pricing across the room catalog:
- **2 Sharing:** `₹10,000` (Non-AC, General Bath)
- **3 Sharing:** `₹8,000` (Non-AC) / `₹9,000` (AC, Attached Bath + AC usage electricity units)
- **4 Sharing:** `₹8,000` (Non-AC) / `₹9,000` (AC, Attached Bath + AC usage electricity units)
- **5 Sharing:** `₹8,000` (Non-AC, 1 Exclusive Room)

### 2. Contact & WhatsApp Details
- **Owner:** Kashyap Patel
- **Phone / WhatsApp:** `+91 63535 78799` (configured in `assets/js/main.js` and `index.html`)
- **Email:** `balkrishnaboyspg@gmail.com` (configured in `index.html`)

### 3. Email Inquiries (Formspree Integration)
- Configured Formspree endpoint: `https://formspree.io/f/xkjjvyke` (in `index.html` and `assets/js/main.js`).
- Form submissions automatically relay to `balkrishnaboyspg@gmail.com` with formatted inquiry details.
- On successful submission, visitors are automatically redirected to `thank-you.html`.

### 4. Spam Protection (Cloudflare Turnstile)
- The form is configured with Cloudflare Turnstile anti-spam challenge widget.
- Currently using Cloudflare's standard always-pass test key: `1x00000000000000000000AA`.
- To use your own sitekey: Create a free widget at [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) and replace `data-sitekey="1x00000000000000000000AA"` in `index.html`.

### 5. Google Analytics 4 (GA4) Tracking
- Script included in `<head>` of all pages with placeholder `G-QYFWKKXXKS`.
- Replace `G-QYFWKKXXKS` with your actual Google Analytics Measurement ID in `index.html`, `404.html`, `thank-you.html`, and `privacy-policy.html`.
- Custom conversion events (`generate_lead` for WhatsApp and Email, `contact` for Phone Calls) are automatically synced via `assets/js/main.js`.

### 6. Enforcing HTTPS on GitHub Pages
1. Go to your GitHub repository: `https://github.com/Bal-Krishna-Boys-PG/bal-krishna-boys-pg.github.io`.
2. Navigate to **Settings** > **Pages**.
3. Under **GitHub Pages**, ensure **Enforce HTTPS** is checked.

### 7. WCAG AA Accessible Design Theme
- **Major Site Canvas:** Replaced stark white and catchy light colors with a matte **Sandstone Canvas (`#EFE8DE`)** and **Warm Parchment (`#F8F3EC`)** cards, achieving a 5.49:1 to 6.05:1 contrast ratio against Pinewood Brown (surpassing WCAG AA 4.5:1).
- **Green Replacement:** Completely replaced all green accents (badges, tags, checkmarks, WhatsApp buttons) with **Warm Bronze (`#8C4408`)** and **Pinewood Brown (`#835028`)**, achieving contrast ratios from 5.86:1 up to 10.22:1 (WCAG AA & AAA compliant).
- **Mobile Theme Color:** Mobile browser status bar is unified using `<meta name="theme-color" content="#835028">`.
