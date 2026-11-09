/**
 * Balkrishna Boys PG - Interactive Main Scripts
 * Handles: Hero Room-Spec Switcher, Accessible Hero Carousel, WhatsApp URL generator, Async Form Submission, Unified Validation, Room Auto-selection, Mobile Nav, and FAQ Accordion
 */

// Global configuration
const PG_CONFIG = {
  ownerName: "Kashyap Patel",
  whatsappNumber: "916353578799",
  formspreeEndpoint: "https://formspree.io/f/xkjjvyke"
};

const HERO_SLIDE_CAPTIONS = [
  "2 Sharing Non-AC • ₹10,000/mo",
  "3 Sharing Room • ₹8,000–₹9,000/mo",
  "4 Sharing Room • ₹8,000–₹9,000/mo",
  "5 Sharing Hall Layout • ₹8,000/mo"
];

function getLocalTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 1. Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    function toggleMobileMenu(forceClose = false) {
      const willOpen = forceClose ? false : mobileMenu.classList.contains("hidden");
      if (willOpen) {
        mobileMenu.classList.remove("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    }

    mobileMenuBtn.addEventListener("click", () => toggleMobileMenu());

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggleMobileMenu(true);
      });
    });

    // Close mobile menu on Escape key (WCAG 2.1.2)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
        toggleMobileMenu(true);
        mobileMenuBtn.focus();
      }
    });
  }

  // Bind Room Catalog Inquiry Triggers (Cards & Hero Spec CTA)
  document.querySelectorAll("[data-room-sharing]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sharing = btn.dataset.roomSharing || "3 Sharing";
      const acType = btn.dataset.roomAc || "Non-AC";
      selectRoomForInquiry(sharing, acType);
    });
  });

  // Initialize Move-in Date min to today (prevent past dates)
  const dateInput = document.getElementById("form-date");
  if (dateInput) {
    dateInput.setAttribute("min", getLocalTodayIso());
  }

  // Bind Inquiry Actions & Live Error Clearing
  const whatsappBtn = document.getElementById("whatsapp-submit-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", handleWhatsAppInquiry);
  }

  const form = document.getElementById("pg-inquiry-form");
  if (form) {
    form.addEventListener("submit", handleEmailFormSubmit);

    ["form-name", "form-phone", "form-date"].forEach((fieldId) => {
      const el = document.getElementById(fieldId);
      if (el) {
        const eventType = fieldId === "form-date" ? "change" : "input";
        el.addEventListener(eventType, () => {
          clearFieldError(fieldId);
          clearFormStatusError();
        });
      }
    });
  }

  // Bind and initialize Room Cooling Type Validator & Quick Switch Helper
  const sharingSelect = document.getElementById("form-sharing");
  if (sharingSelect) {
    sharingSelect.addEventListener("change", updateCoolingTypeState);
    updateCoolingTypeState();
  }

  const switchAcBtn = document.getElementById("switch-ac-eligible-btn");
  if (switchAcBtn && sharingSelect) {
    switchAcBtn.addEventListener("click", () => {
      for (let i = 0; i < sharingSelect.options.length; i++) {
        if (sharingSelect.options[i].value.includes("3 Sharing")) {
          sharingSelect.selectedIndex = i;
          break;
        }
      }
      updateCoolingTypeState();
      const acSelect = document.getElementById("form-actype");
      if (acSelect && !acSelect.disabled) {
        for (let i = 0; i < acSelect.options.length; i++) {
          if (acSelect.options[i].text.trim() === "AC Room") {
            acSelect.selectedIndex = i;
            break;
          }
        }
        acSelect.focus();
      }
    });
  }

  // Reveal mobile sticky dock smoothly after scrolling past hero CTAs
  const mobileStickyBar = document.getElementById("mobile-sticky-bar");
  if (mobileStickyBar) {
    function syncMobileStickyBar() {
      const showDock = window.scrollY > 260;
      if (showDock) {
        mobileStickyBar.classList.remove("translate-y-full", "opacity-0", "pointer-events-none");
        mobileStickyBar.classList.add("translate-y-0", "opacity-100");
      } else {
        mobileStickyBar.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
        mobileStickyBar.classList.remove("translate-y-0", "opacity-100");
      }
    }
    syncMobileStickyBar();
    window.addEventListener("scroll", syncMobileStickyBar, { passive: true });
  }

  // Initialize Interactive FAQ Accordion
  initFaqAccordion();

  // Initialize Accessible Hero Image Carousel & Bidirectionally Synced Spec Switcher
  let heroSwitcherApi = null;
  const heroCarouselApi = initHeroCarousel((slideIndex) => {
    if (heroSwitcherApi) {
      heroSwitcherApi.syncFromSlide(slideIndex);
    }
  });
  heroSwitcherApi = initHeroSpecSwitcher(heroCarouselApi);

  // Track Phone Call conversions in Google Analytics
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "contact", {
          event_category: "engagement",
          event_label: "Phone Call CTA"
        });
      }
    });
  });
});

// Hero Room-Spec Switcher (Synced with Carousel & Inquiry CTA)
function initHeroSpecSwitcher(carouselApi) {
  const tabs = Array.from(document.querySelectorAll(".hero-tier-tab"));
  const priceEl = document.getElementById("hero-spec-price");
  const suffixEl = document.getElementById("hero-spec-suffix");
  const titleEl = document.getElementById("hero-spec-title");
  const descEl = document.getElementById("hero-spec-desc");
  const ctaEl = document.getElementById("hero-spec-cta");

  if (!tabs.length || !priceEl || !ctaEl) return;

  const activeClasses = [
    "bg-brand-900",
    "text-white",
    "border-brand-900",
    "border-b-[3px]",
    "border-b-marigold-300",
    "shadow-sm",
    "dark:bg-brand-700",
    "dark:border-brand-400/50",
    "dark:border-b-marigold-400"
  ];
  const inactiveClasses = [
    "bg-white/80",
    "hover:bg-white",
    "text-slate-800",
    "border-brand-900/15",
    "dark:bg-white/10",
    "dark:hover:bg-white/15",
    "dark:text-brand-100",
    "dark:border-brand-300/20"
  ];

  function activateTab(tab, syncSlide = true) {
    tabs.forEach((item) => {
      const isTarget = item === tab;
      item.setAttribute("aria-selected", String(isTarget));
      if (isTarget) {
        item.classList.remove(...inactiveClasses);
        item.classList.add(...activeClasses);
      } else {
        item.classList.remove(...activeClasses);
        item.classList.add(...inactiveClasses);
      }
    });

    const tier = tab.dataset.heroTier || "3 Sharing";
    const ac = tab.dataset.heroAc || "Non-AC";
    const price = tab.dataset.heroPrice || "₹9,000";
    const suffix = tab.dataset.heroSuffix || "/mo";
    const title = tab.dataset.heroTitle || "";
    const desc = tab.dataset.heroDesc || "";

    priceEl.textContent = price;
    if (suffixEl) suffixEl.textContent = suffix;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    ctaEl.dataset.roomSharing = tier;
    ctaEl.dataset.roomAc = ac;
    ctaEl.textContent = `Book ${tier}`;

    if (syncSlide && carouselApi && typeof tab.dataset.heroSlide !== "undefined") {
      const slideIdx = Number.parseInt(tab.dataset.heroSlide, 10);
      if (!Number.isNaN(slideIdx)) {
        carouselApi.goToSlide(slideIdx, true, false);
      }
    }
  }

  function syncFromSlide(slideIndex) {
    const match = tabs.find((tab) => Number.parseInt(tab.dataset.heroSlide || "", 10) === slideIndex);
    if (match) {
      activateTab(match, false);
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab, true));

    tab.addEventListener("keydown", (e) => {
      let nextIdx = null;
      if (e.key === "ArrowRight") {
        nextIdx = (index + 1) % tabs.length;
      } else if (e.key === "ArrowLeft") {
        nextIdx = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        nextIdx = 0;
      } else if (e.key === "End") {
        nextIdx = tabs.length - 1;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        tabs[nextIdx].focus();
        activateTab(tabs[nextIdx], true);
      }
    });
  });

  return { syncFromSlide };
}

// Interactive FAQ Accordion Handler
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-btn");
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panelId = btn.getAttribute("aria-controls");
      const content = panelId ? document.getElementById(panelId) : btn.parentElement?.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      if (content) {
        content.classList.toggle("hidden", isExpanded);
      }
      btn.setAttribute("aria-expanded", String(!isExpanded));
      if (icon) {
        icon.classList.toggle("rotate-180", !isExpanded);
      }
    });
  });
}

// Validator: Room cooling type can only be AC for 3 sharing or 4 sharing
function updateCoolingTypeState() {
  const sharingSelect = document.getElementById("form-sharing");
  const acSelect = document.getElementById("form-actype");
  const helperText = document.getElementById("actype-helper-text");
  const switchAcBtn = document.getElementById("switch-ac-eligible-btn");

  if (!sharingSelect || !acSelect) return;

  const sharingVal = sharingSelect.value || "";
  const is3or4Sharing = sharingVal.includes("3") || sharingVal.includes("4");

  if (is3or4Sharing) {
    acSelect.disabled = false;
    acSelect.classList.remove("bg-slate-100", "text-slate-600", "dark:bg-brand-950/45", "dark:text-brand-200/75", "cursor-not-allowed");
    acSelect.classList.add("bg-white/90", "text-slate-900", "dark:bg-brand-950/75", "dark:text-white", "cursor-pointer");
    if (helperText) {
      helperText.textContent = "AC (Attached Bath) & Non-AC available for 3 & 4 sharing.";
      helperText.className = "text-[11px] text-marigold-800 dark:text-marigold-400 mt-1.5 font-semibold";
    }
    if (switchAcBtn) {
      switchAcBtn.classList.add("hidden");
    }
  } else {
    for (let i = 0; i < acSelect.options.length; i++) {
      if (acSelect.options[i].value.includes("Non-AC") || acSelect.options[i].text.includes("Non-AC")) {
        acSelect.selectedIndex = i;
        break;
      }
    }
    acSelect.disabled = true;
    acSelect.classList.remove("bg-white/90", "text-slate-900", "dark:bg-brand-950/75", "dark:text-white", "cursor-pointer");
    acSelect.classList.add("bg-slate-100", "text-slate-600", "dark:bg-brand-950/45", "dark:text-brand-200/75", "cursor-not-allowed");
    if (helperText) {
      helperText.textContent = "Non-AC only for 2 & 5 sharing.";
      helperText.className = "text-[11px] text-slate-600 dark:text-brand-200 mt-1.5";
    }
    if (switchAcBtn) {
      switchAcBtn.classList.remove("hidden");
    }
  }
}

// 2. Room Pre-selection Helper
function selectRoomForInquiry(sharingName, acType) {
  const sharingSelect = document.getElementById("form-sharing");
  const acSelect = document.getElementById("form-actype");

  if (sharingSelect) {
    for (let i = 0; i < sharingSelect.options.length; i++) {
      if (sharingSelect.options[i].text.includes(sharingName)) {
        sharingSelect.selectedIndex = i;
        break;
      }
    }
  }

  updateCoolingTypeState();

  if (acSelect && !acSelect.disabled) {
    const wantsAc = String(acType).trim().toUpperCase() === "AC";
    for (let i = 0; i < acSelect.options.length; i++) {
      const optIsAc = acSelect.options[i].text.trim().startsWith("AC ");
      if (optIsAc === wantsAc) {
        acSelect.selectedIndex = i;
        break;
      }
    }
  }

  const contactSection = document.getElementById("contact");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  const formNameInput = document.getElementById("form-name");
  if (formNameInput) {
    formNameInput.focus({ preventScroll: true });
  }
}

// Field Error Helpers (WCAG 3.3.1 & 4.1.2)
function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) {
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", `${fieldId}-error`);
    input.classList.remove("border-slate-400", "dark:border-brand-300/30");
    input.classList.add("border-red-700", "dark:border-red-400", "ring-2", "ring-red-700/20", "dark:ring-red-400/30");
  }
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) {
    input.removeAttribute("aria-invalid");
    if (input.getAttribute("aria-describedby") === `${fieldId}-error`) {
      input.removeAttribute("aria-describedby");
    }
    input.classList.remove("border-red-700", "dark:border-red-400", "ring-2", "ring-red-700/20", "dark:ring-red-400/30");
    input.classList.add("border-slate-400", "dark:border-brand-300/30");
  }
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }
}

function validateInquiryForm() {
  const nameInput = document.getElementById("form-name");
  const phoneInput = document.getElementById("form-phone");
  const roleSelect = document.getElementById("form-role");
  const sharingSelect = document.getElementById("form-sharing");
  const acSelect = document.getElementById("form-actype");
  const dateInput = document.getElementById("form-date");
  const notesInput = document.getElementById("form-notes");

  const name = nameInput ? nameInput.value.trim() : "";
  const phoneRaw = phoneInput ? phoneInput.value.trim() : "";
  const role = roleSelect ? roleSelect.value : "";
  const sharing = sharingSelect ? sharingSelect.value : "";
  const actype = acSelect ? acSelect.value : "";
  const moveDate = dateInput ? dateInput.value : "";
  const notes = notesInput ? notesInput.value.trim() : "";

  clearFieldError("form-name");
  clearFieldError("form-phone");
  clearFieldError("form-date");

  let firstInvalidEl = null;
  const errors = [];

  if (!name || name.length < 2) {
    const msg = "Please enter your full name.";
    setFieldError("form-name", msg);
    errors.push(msg);
    if (!firstInvalidEl && nameInput) firstInvalidEl = nameInput;
  }

  const digits = phoneRaw.replace(/\D/g, "");
  if (!digits || digits.length < 10 || digits.length > 15) {
    const msg = "Please enter a valid 10-digit WhatsApp or phone number.";
    setFieldError("form-phone", msg);
    errors.push(msg);
    if (!firstInvalidEl && phoneInput) firstInvalidEl = phoneInput;
  }

  if (moveDate) {
    const todayIso = getLocalTodayIso();
    if (moveDate < todayIso) {
      const msg = "Please choose today or a future move-in date.";
      setFieldError("form-date", msg);
      errors.push(msg);
      if (!firstInvalidEl && dateInput) firstInvalidEl = dateInput;
    }
  }

  const is3or4Sharing = sharing.includes("3") || sharing.includes("4");
  const isAC = actype.toLowerCase().includes("ac") && !actype.toLowerCase().includes("non-ac");
  if (!is3or4Sharing && isAC) {
    updateCoolingTypeState();
    errors.push("AC cooling type is only available for 3 and 4 sharing rooms.");
    if (!firstInvalidEl && acSelect) firstInvalidEl = acSelect;
  }

  if (errors.length > 0) {
    showFormStatus(errors[0], "error");
    if (firstInvalidEl) firstInvalidEl.focus();
    return { valid: false };
  }

  clearFormStatus();

  return {
    valid: true,
    values: { name, phone: phoneRaw, role, sharing, actype, moveDate, notes }
  };
}

// 3. Instant WhatsApp Inquiry Generator
function handleWhatsAppInquiry() {
  const result = validateInquiryForm();
  if (!result.valid) return;

  const { name, phone, role, sharing, actype, moveDate, notes } = result.values;

  const lines = [
    `*Hello ${PG_CONFIG.ownerName} (Balkrishna Boys PG, Ahmedabad)!*`,
    `I would like to inquire about booking a room.`,
    ``,
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*I am a:* ${role}`,
    `*Sharing Preference:* ${sharing}`,
    `*Room Type:* ${actype}`,
    `*Expected Move-in:* ${moveDate || "Immediate / Flexible"}`
  ];

  if (notes) {
    lines.push(`*Note / Dietary:* ${notes}`);
  }

  lines.push(``);
  lines.push(`Please share current availability and visiting timings.`);

  const fullMessage = lines.join("\n");
  const encodedUrl = `https://wa.me/${PG_CONFIG.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

  if (typeof gtag === "function") {
    gtag("event", "generate_lead", {
      event_category: "inquiry",
      event_label: `WhatsApp Inquiry - ${sharing} (${actype})`,
      value: 1
    });
  }

  const popup = window.open(encodedUrl, "_blank", "noopener,noreferrer");

  // Update persistent reassurance & popup-blocker fallback panel
  const confirmationEl = document.getElementById("whatsapp-confirmation");
  const directLink = document.getElementById("whatsapp-direct-link");
  if (directLink) {
    directLink.href = encodedUrl;
  }
  if (confirmationEl) {
    confirmationEl.classList.remove("hidden");
  }

  if (!popup) {
    showFormStatus(
      "Your browser blocked the new tab. Use 'Open WhatsApp Chat Directly' below to send your pre-filled message.",
      "success"
    );
  } else {
    showFormStatus("WhatsApp opened with your room preferences pre-filled.", "success");
  }
}

// 4. Asynchronous Email Submission (Formspree Endpoint)
async function handleEmailFormSubmit(event) {
  event.preventDefault();

  const result = validateInquiryForm();
  if (!result.valid) return;

  const { name, phone, role, sharing, actype, moveDate, notes } = result.values;
  const submitBtn = document.getElementById("email-submit-btn");
  const submitIcon = document.getElementById("email-submit-icon");
  const submitSpinner = document.getElementById("email-submit-spinner");
  const submitLabel = document.getElementById("email-submit-label");

  if (!PG_CONFIG.formspreeEndpoint || PG_CONFIG.formspreeEndpoint.includes("YOUR_")) {
    showFormStatus("Inquiry simulated! Configure a valid Formspree endpoint in assets/js/main.js.", "success");
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (submitIcon) submitIcon.classList.add("hidden");
  if (submitSpinner) submitSpinner.classList.remove("hidden");
  if (submitLabel) submitLabel.textContent = "Submitting Inquiry...";

  let turnstileToken = "";
  if (window.turnstile && typeof window.turnstile.getResponse === "function") {
    turnstileToken = window.turnstile.getResponse() || "";
  }
  if (!turnstileToken) {
    const turnstileInput = document.querySelector('[name="cf-turnstile-response"]');
    turnstileToken = turnstileInput ? turnstileInput.value : "";
  }

  const payload = {
    _subject: `New PG Inquiry from ${name} (${sharing})`,
    name,
    phone,
    occupation: role,
    room_sharing: sharing,
    cooling_type: actype,
    move_in_date: moveDate || "Not specified",
    message: notes || "No specific note"
  };

  if (turnstileToken) {
    payload["cf-turnstile-response"] = turnstileToken;
  }

  try {
    const response = await fetch(PG_CONFIG.formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {
          event_category: "inquiry",
          event_label: `Formspree Email Inquiry - ${sharing}`,
          value: 1
        });
      }

      showFormStatus("Inquiry received! Redirecting to confirmation page...", "success");
      const formEl = document.getElementById("pg-inquiry-form");
      if (formEl) formEl.reset();
      updateCoolingTypeState();

      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 700);
    } else {
      const data = await response.json().catch(() => ({}));
      const errorMsg =
        data && data.errors
          ? data.errors.map((e) => e.message).join(", ")
          : "Submission failed. Please connect directly via WhatsApp or phone call.";
      showFormStatus(errorMsg, "error");
    }
  } catch (err) {
    showFormStatus("Network error. Please use WhatsApp or call +91 63535 78799 directly.", "error");
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitSpinner) submitSpinner.classList.add("hidden");
    if (submitIcon) submitIcon.classList.remove("hidden");
    if (submitLabel) submitLabel.textContent = "Or Submit Inquiry via Email";
  }
}

// 5. Persistent Status Banner Utility
function showFormStatus(message, type) {
  const statusDiv = document.getElementById("form-status");
  if (!statusDiv) return;

  statusDiv.classList.remove(
    "hidden",
    "p-3.5",
    "rounded-xl",
    "bg-marigold-50",
    "text-marigold-800",
    "border",
    "border-marigold-300",
    "dark:bg-marigold-400/15",
    "dark:text-marigold-400",
    "dark:border-marigold-400/40",
    "bg-red-50",
    "text-red-800",
    "border-red-700/45",
    "dark:bg-red-950/75",
    "dark:text-red-200",
    "dark:border-red-400/50"
  );
  statusDiv.dataset.statusType = type;

  if (type === "success") {
    statusDiv.classList.add(
      "p-3.5",
      "rounded-xl",
      "bg-marigold-50",
      "text-marigold-800",
      "border",
      "border-marigold-300",
      "dark:bg-marigold-400/15",
      "dark:text-marigold-400",
      "dark:border-marigold-400/40"
    );
  } else {
    statusDiv.classList.add(
      "p-3.5",
      "rounded-xl",
      "bg-red-50",
      "text-red-800",
      "border",
      "border-red-700/45",
      "dark:bg-red-950/75",
      "dark:text-red-200",
      "dark:border-red-400/50"
    );
  }

  statusDiv.textContent = message;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  statusDiv.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
}

function clearFormStatus() {
  const statusDiv = document.getElementById("form-status");
  if (!statusDiv) return;
  statusDiv.classList.add("hidden");
  statusDiv.textContent = "";
  delete statusDiv.dataset.statusType;
}

function clearFormStatusError() {
  const statusDiv = document.getElementById("form-status");
  if (statusDiv && statusDiv.dataset.statusType === "error") {
    clearFormStatus();
  }
}

// 6. Accessible Hero Image Carousel (WCAG 2.2.2, Keyboard, Touch Swipe, Bidirectional Spec Sync)
function initHeroCarousel(onSlideChange) {
  const carousel = document.getElementById("hero-carousel");
  if (!carousel) return null;

  const showcaseCard = carousel.parentElement || carousel;
  const specDock = document.getElementById("hero-spec-dock");
  const slides = carousel.querySelectorAll(".hero-slide");
  const dots = showcaseCard.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const toggleBtn = document.getElementById("carousel-play-pause");
  const pauseIcon = document.getElementById("carousel-pause-icon");
  const playIcon = document.getElementById("carousel-play-icon");
  const captionEl = document.getElementById("hero-slide-caption");
  const chipLabelEl = document.getElementById("hero-carousel-chip-label");
  const track = document.getElementById("hero-carousel-track");

  if (slides.length <= 1) return null;

  let currentIndex = 1;
  let intervalId = null;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isManuallyPaused = reducedMotionQuery.matches;

  function syncPlayPauseUi() {
    if (!toggleBtn) return;
    if (isManuallyPaused) {
      if (pauseIcon) pauseIcon.classList.add("hidden");
      if (playIcon) playIcon.classList.remove("hidden");
      toggleBtn.setAttribute("aria-label", "Play automatic slide rotation");
      toggleBtn.setAttribute("aria-pressed", "true");
    } else {
      if (pauseIcon) pauseIcon.classList.remove("hidden");
      if (playIcon) playIcon.classList.add("hidden");
      toggleBtn.setAttribute("aria-label", "Pause automatic slide rotation");
      toggleBtn.setAttribute("aria-pressed", "false");
    }
  }

  function updateSlideAria(index, userInitiated = false, notifyListener = true) {
    if (track) {
      track.setAttribute("aria-live", userInitiated ? "polite" : "off");
    }

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove("opacity-0", "pointer-events-none", "z-0");
        slide.classList.add("opacity-100", "z-10");
        slide.removeAttribute("aria-hidden");
      } else {
        slide.classList.remove("opacity-100", "z-10");
        slide.classList.add("opacity-0", "pointer-events-none", "z-0");
        slide.setAttribute("aria-hidden", "true");
      }
    });

    if (chipLabelEl) {
      chipLabelEl.textContent = index === 3 ? "Live Video Tour Available" : "Verified Property Photos";
    }

    if (captionEl && HERO_SLIDE_CAPTIONS[index]) {
      captionEl.textContent = HERO_SLIDE_CAPTIONS[index];
    }

    dots.forEach((dot, i) => {
      const pill = dot.querySelector("span");
      if (i === index) {
        dot.setAttribute("aria-current", "true");
        if (pill) {
          pill.classList.remove("w-2", "bg-brand-900/55", "dark:bg-brand-200/45");
          pill.classList.add("w-5", "bg-brand-900", "dark:bg-marigold-400");
        }
      } else {
        dot.setAttribute("aria-current", "false");
        if (pill) {
          pill.classList.remove("w-5", "bg-brand-900", "dark:bg-marigold-400");
          pill.classList.add("w-2", "bg-brand-900/55", "dark:bg-brand-200/45");
        }
      }
    });

    currentIndex = index;

    if (notifyListener && typeof onSlideChange === "function") {
      onSlideChange(index);
    }
  }

  function goToSlide(targetIndex, userInitiated = true, notifyListener = true) {
    const safeIdx = ((targetIndex % slides.length) + slides.length) % slides.length;
    updateSlideAria(safeIdx, userInitiated, notifyListener);
    if (userInitiated && !isManuallyPaused) {
      startAutoCycle();
    }
  }

  function goToRelativeSlide(step, userInitiated = true) {
    const nextIndex = (currentIndex + step + slides.length) % slides.length;
    updateSlideAria(nextIndex, userInitiated, true);
    if (userInitiated && !isManuallyPaused) {
      startAutoCycle();
    }
  }

  function startAutoCycle() {
    if (isManuallyPaused) return;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => goToRelativeSlide(1, false), 5000);
  }

  function stopAutoCycle() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Controls
  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToRelativeSlide(-1, true));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToRelativeSlide(1, true));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index, true, true);
    });
  });

  if (toggleBtn) {
    syncPlayPauseUi();
    toggleBtn.addEventListener("click", () => {
      isManuallyPaused = !isManuallyPaused;
      syncPlayPauseUi();
      if (isManuallyPaused) {
        stopAutoCycle();
      } else {
        startAutoCycle();
      }
    });
  }

  // Keyboard ArrowLeft / ArrowRight when interacting within the gallery card
  showcaseCard.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToRelativeSlide(-1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToRelativeSlide(1, true);
    }
  });

  // Touch / Pointer Horizontal Swipe Support
  let touchStartX = null;
  let touchStartY = null;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null || touchStartY === null || e.changedTouches.length !== 1) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      touchStartX = null;
      touchStartY = null;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        goToRelativeSlide(dx < 0 ? 1 : -1, true);
      }
    },
    { passive: true }
  );

  // Hover & Focus pause across gallery bezel and synced hero spec dock
  [showcaseCard, specDock].filter(Boolean).forEach((region) => {
    region.addEventListener("mouseenter", () => {
      if (!isManuallyPaused) stopAutoCycle();
    });
    region.addEventListener("mouseleave", () => {
      if (!isManuallyPaused) startAutoCycle();
    });
    region.addEventListener("focusin", () => {
      if (!isManuallyPaused) stopAutoCycle();
    });
    region.addEventListener("focusout", (e) => {
      const stayingInside =
        showcaseCard.contains(e.relatedTarget) || (specDock && specDock.contains(e.relatedTarget));
      if (!isManuallyPaused && !stayingInside) {
        startAutoCycle();
      }
    });
  });

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", (e) => {
      isManuallyPaused = e.matches;
      syncPlayPauseUi();
      if (isManuallyPaused) stopAutoCycle();
      else startAutoCycle();
    });
  }

  if (!isManuallyPaused) {
    startAutoCycle();
  }

  return { goToSlide };
}
