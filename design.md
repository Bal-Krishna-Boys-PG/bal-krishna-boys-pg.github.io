# Website Design Document: Balkrishna Boys PG (Ahmedabad)

**Project:** Official Landing Page & Web Portal  
**Domain / Hosting:** GitHub Pages (`balkrishnaboyspg.github.io`)  
**Target Audience:** Students (Silver Oak, SAL, Nirma, Gujarat University, etc.) & Young Working Professionals (SG Highway, Science City, Sola, corporate hubs)  
**Architecture:** 100% Serverless & Static (HTML5, Tailwind CSS, Vanilla JS, Zero Backend)

---

## 1. Executive Summary & Conversion Strategy

The primary goal of this landing page is **high-conversion lead capture**. In the Indian PG market (specifically Ahmedabad), prospective tenants and their parents demand:
1. **Immediate Transparency:** Clear room sharing configurations, amenities, electricity billing rules, and food policies.
2. **Zero Friction Contact:** Over 85% of accommodation decisions in this segment occur over direct telephone calls or WhatsApp chats. Email forms alone have low conversion rates; hence, this design implements a **Dual-Action Contact System** (Instant WhatsApp Lead + Web3Forms Email Relay).
3. **High Trust & Social Proof:** Verified Google Maps reviews embedded directly with a fallback to Google Profile badges.
4. **House Rule Highlights:** Highlighting **24/7 Gate Access** (rare in Ahmedabad PGs, massive competitive advantage) combined with **Strict No Smoking / No Alcohol** and **Parents Welcome** policies.

---

## 2. Technical Architecture (Zero-Backend Stack)

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Client Browser (Mobile / Desktop)                 │
└───────┬──────────────────────────┬─────────────────────────────┬───────┘
        │                          │                             │
        ▼                          ▼                             ▼
┌───────────────┐          ┌───────────────┐            ┌────────────────┐
│ Static Engine │          │  Lead Intake  │            │  Social Proof  │
│ - HTML5       │          │ - WhatsApp    │            │ - Elfsight or  │
│ - TailwindCSS │          │   Direct Link │            │   Trustmary    │
│ - Vanilla JS  │          │ - Web3Forms / │            │   Review Embed │
│ - GitHub Pages│          │   Formspree   │            │ - Google Maps  │
└───────────────┘          └───────────────┘            └────────────────┘
```

* **Hosting:** GitHub Pages (`balkrishnaboyspg.github.io`) — free, SSL secured, 99.99% uptime, zero server maintenance.
* **Styling Framework:** Tailwind CSS (Modern, mobile-first, lightweight).
* **Review Widget Integration:** Elfsight or Trustmary Free Widget script embed + Static curated fallback cards if script is blocked by ad-blockers.
* **Dual-Inquiry Mechanism:**
  * **Option A (Instant WhatsApp):** Client-side JavaScript compiles form inputs (Name, Phone, Room Type, AC preference, Move-in Date) into a pre-formatted URI-encoded WhatsApp link (`https://wa.me/91XXXXXXXXXX?text=...`) and opens WhatsApp instantly.
  * **Option B (Form-to-Email):** Asynchronous `fetch()` POST to Web3Forms / Formspree API endpoint without page reload, showing an immediate confirmation modal.
* **Maps & Geo:** Responsive Google Maps Embed iframe with a direct "Get Directions" deep link to Google Maps App.

---

## 3. Site Structure & Wireframe Breakdown

The site is engineered as a single-page, high-performance landing page with the following sections:

### Section 1: Sticky Navigation Bar
* **Left:** Balkrishna Boys PG Logo & Brand Name.
* **Center Links:** Rooms & Rates | Amenities | Food & Dining | Reviews | Location.
* **Right CTAs:**
  * Quick Call Button (`tel:+91XXXXXXXXXX`)
  * WhatsApp Button (Icon + "Chat Now")
* **Mobile View:** Hamburger menu + Persistent Bottom Action Bar (`[📞 Call Now]` and `[💬 WhatsApp]`).

---

### Section 2: Hero Section (High Impact & Above-the-Fold)
* **Headline:** "Comfortable, Safe & Homely Boys PG in Ahmedabad"
* **Sub-headline:** "Located near Sola & Science City Road. Fully furnished rooms, 100% Pure Vegetarian meals, high-speed Wi-Fi, and complete freedom with 24/7 open gate access."
* **Trust Pills / Highlights:**
  * 🌟 **4.8+ Google Rating**
  * 🔓 **24/7 Open Gate (No Curfew)**
  * 🥗 **100% Pure Veg (Jain upon request)**
  * ⚡ **Regular Electricity Included**
* **Primary CTAs:**
  * `[Explore Rooms & Rates]` (Smooth scroll to Catalog)
  * `[Schedule a Visit via WhatsApp]` (Direct WhatsApp trigger)
* **Visual:** Hero carousel or high-quality grid showcasing clean rooms, study desks, and modern dining area.

---

### Section 3: Room Catalog & Pricing Matrix (The Core Offer)

Clear breakdown of available options to eliminate confusion and filter enquiries:

| Sharing Option | Room Type | Bathroom Type | Key Features | Monthly Fare (Dummy Rate)* |
| :--- | :--- | :--- | :--- | :--- |
| **2 Sharing** | Non-AC Only | General / Common Washroom | Spacious, maximum personal space, wooden wardrobe, study desk | **₹8,500 / mo** |
| **3 Sharing** *(Most Popular)* | AC or Non-AC | **Attached** (for AC) / General (for Non-AC) | Balanced comfort, individual lockers, high-speed Wi-Fi | **Non-AC: ₹7,000 / mo**<br>**AC: ₹8,000 / mo** |
| **4 Sharing** *(Budget Friendly)* | AC or Non-AC | **Attached** (for AC) / General (for Non-AC) | Economical, spacious room, personal storage | **Non-AC: ₹6,000 / mo**<br>**AC: ₹7,000 / mo** |
| **5 Sharing** *(Exclusive)* | Non-AC Only | General / Common Washroom | **Only 1 Room in Property**, budget group accommodation | **₹5,200 / mo** *(Limited)* |

> **\*Note on Pricing:** Rates above are placeholders and can be adjusted with final values prior to release.

#### Crucial Transparency Banner (Electricity & Add-on Rules)
* **Included in Monthly Rent:** General electricity (lighting, ceiling fans, geyser, Wi-Fi router, RO water, common area lighting) is **100% INCLUDED**.
* **AC Electricity Policy:** In AC rooms, only actual AC power consumption is billed separately via an individual room sub-meter at standard unit rates. No hidden overheads.
* **Deposit & Terms:** Clearly state security deposit (e.g., 1 month rent) and notice period (e.g., 30 days).

---

### Section 4: Services & Amenities Included

Visual cards with custom iconography:
1. **100% Pure Veg & Homely Dining:**
   * 3 Freshly Prepared Meals daily (Nutritious Breakfast, Lunch, Dinner).
   * **Jain meals** prepared upon prior request.
   * **Self-Pack Tiffin Facility:** Carry your fresh lunch to college/office in the morning.
   * *Notice:* Sunday Dinner is off (lets students explore the local food culture).
2. **Laundry & Washing Machines:** Fully automatic washing machines with spacious terrace/balcony drying areas.
3. **High-Speed Commercial Wi-Fi:** Multi-router fiber mesh coverage across all floors.
4. **Housekeeping & Hygiene:** Daily sweeping, mopping, and periodic deep cleaning of washrooms.
5. **24/7 Water & Geyser:** RO drinking water cooler + hot water geysers in all bathrooms.
6. **Safety & Security:** CCTV surveillance in common areas, secure individual cupboard locks.

---

### Section 5: House Rules & Community Culture
A dedicated, transparent card to filter quality tenants:
* **24/7 Gate Access:** No rigid evening curfews. Flexible for students with library hours and working professionals on late/night shifts.
* **Parents Welcome:** Parents visiting Ahmedabad can visit and meet their sons comfortably.
* **Strict Zero-Tolerance Policy:** Absolutely **NO Smoking, NO Drinking, NO Tobacco / Gutkha**. Violation results in immediate eviction.
* **Quiet Hours:** Mandatory study/quiet atmosphere post 11:00 PM in corridors.

---

### Section 6: Customer Reviews & Social Proof
* **Live Google Reviews Widget:** Embedded Elfsight / Trustmary container displaying real 5-star ratings, reviewer names, and verified timestamps.
* **Static Fallback Testimonials:** 3 pre-coded testimonial cards in case ad-blockers or slow connections block the external script:
  * *Testimonial 1 (Engineering Student):* "Best PG near Sola. The 24/7 gate policy is a lifesaver during exams, and food genuinely feels like home."
  * *Testimonial 2 (IT Professional):* "Stayed for 1.5 years in 3-sharing AC. Transparent electricity billing and very cooperative management."
  * *Testimonial 3 (Parent):* "Very safe environment for boys. 100% pure veg food and no smoking policy is strictly maintained."
* **Google Verification CTA:** Large pill button: `"View all reviews on Google Maps (Rating: 4.8 ★) ↗"` linking directly to the business profile.

---

### Section 7: Dual-Action Contact & Booking Section
Two-column interactive layout:

#### Left Column: Interactive Booking & Enquiry Form
* **Fields:**
  * Full Name
  * WhatsApp / Phone Number
  * Purpose (Student / Working Professional)
  * Preferred Sharing (2 / 3 / 4 / 5 Sharing)
  * Room Type Preference (AC / Non-AC)
  * Expected Move-in Date
  * Optional Note / Jain Food requirement
* **Action Buttons:**
  * **Primary (Green):** `[ Send Inquiry via WhatsApp 💬 ]` (Triggers formatted WhatsApp chat immediately).
  * **Secondary (Dark/Neutral):** `[ Submit via Email ✉️ ]` (Posts to Web3Forms/Formspree with instant feedback toast).

#### Right Column: Location, Address & Direct Contacts
* **Physical Address:** Balkrishna Boys PG, Nitin Nagar Society, Near Sola Railway Crossing, Science City Road, Ghatlodiya, Ahmedabad, Gujarat 380061.
* **Nearby Landmarks:**
  * Near Sola Railway Crossing / Sola Road
  * Close to Science City & SG Highway
  * Quick access to Silver Oak University, SAL Hospital, and BRTS/AMTS stops.
* **Direct Contacts:**
  * Phone: `+91 XXXXX XXXXX`
  * WhatsApp: `+91 XXXXX XXXXX`
  * Email: `balkrishnaboyspg@gmail.com` (or preferred email)
* **Embedded Google Map:** Responsive interactive iframe centered on the property with a `"Get Directions"` button.

---

### Section 8: Footer
* Quick Navigation Links
* Copyright & Business Details: © Balkrishna Boys PG, Ahmedabad.
* Disclaimer on rates and subject-to-availability terms.

---

## 4. Technical Implementation Details & Code Schemas

### A. WhatsApp Direct Query Generator (JavaScript Specification)
```javascript
function sendWhatsAppInquiry() {
  const name = document.getElementById('enquiry-name').value.trim();
  const phone = document.getElementById('enquiry-phone').value.trim();
  const sharing = document.getElementById('enquiry-sharing').value;
  const roomType = document.getElementById('enquiry-type').value;
  const moveDate = document.getElementById('enquiry-date').value;
  const notes = document.getElementById('enquiry-notes').value.trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number.");
    return;
  }

  const message = `*New PG Inquiry - Balkrishna Boys PG Ahmedabad*
--------------------------------
*Name:* ${name}
*Phone:* ${phone}
*Room Preference:* ${sharing} (${roomType})
*Move-in Date:* ${moveDate || 'Immediate'}
${notes ? `*Note:* ${notes}` : ''}
--------------------------------
Please let me know room availability and visit timings.`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappNumber = "91XXXXXXXXXX"; // Owner's WhatsApp Number
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
}
```

### B. Form-to-Email Integration (Web3Forms Specification)
```html
<form action="https://api.web3forms.com/submit" method="POST" id="email-form">
  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
  <input type="hidden" name="subject" value="New PG Booking Inquiry - Balkrishna Boys PG">
  <input type="hidden" name="from_name" value="Balkrishna PG Website">
  <!-- Dynamic Form Inputs -->
</form>
```

### C. LocalBusiness / Hostel Schema (JSON-LD SEO Markup)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Hostel",
  "name": "Balkrishna Boys PG",
  "image": "https://balkrishnaboyspg.github.io/images/hero.jpg",
  "telephone": "+91XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nitin Nagar Society, Near Sola Railway Crossing, Science City Road",
    "addressLocality": "Ghatlodiya, Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "380061",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.0780",
    "longitude": "72.5310"
  },
  "url": "https://balkrishnaboyspg.github.io",
  "priceRange": "₹5,200 - ₹8,500",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Pure Vegetarian Food", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Washing Machine", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "24/7 Gate Access", "value": true }
  ]
}
</script>
```

---

## 5. Owner Pre-Flight Checklist Before Go-Live

1. [ ] **Finalize Room Rates:** Update dummy rates in `index.html` with agreed monthly fares.
2. [ ] **Contact Credentials:**
   * Insert actual WhatsApp & phone contact number.
   * Register free access key on [web3forms.com](https://web3forms.com) (takes 30 seconds, zero setup).
3. [ ] **Google Review Widget:** Generate embed code from Elfsight / Trustmary or use curated static reviews.
4. [ ] **Photos:** Place real room, dining, washroom, and exterior photos in `/assets/images/`.
5. [ ] **Deploy:** Push changes to GitHub repository; GitHub Pages will deploy automatically.

