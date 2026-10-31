/**
 * Balkrishna Boys PG - Interactive Main Scripts
 * Handles: WhatsApp URL generator, Async Form Submission, Room Auto-selection, Mobile Nav
 */

// Global configuration (Owner can update these two values)
const PG_CONFIG = {
  // Owner Name
  ownerName: "Kashyap Patel",
  // Owner WhatsApp Number in international format (without '+' or spaces)
  whatsappNumber: "916353578799",
  // Formspree endpoint URL for email inquiries
  formspreeEndpoint: "https://formspree.io/f/xkjjvyke"
};

// 1. Mobile Menu Toggle & Form Initialization
document.addEventListener("DOMContentLoaded", () => {
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

    // Close mobile menu when a navigation link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
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

  // Bind Email Form Submission
  const form = document.getElementById("pg-inquiry-form");
  if (form) {
    form.addEventListener("submit", handleEmailFormSubmit);
  }

  // Bind and initialize Room Cooling Type Validator
  const sharingSelect = document.getElementById("form-sharing");
  if (sharingSelect) {
    sharingSelect.addEventListener("change", updateCoolingTypeState);
    updateCoolingTypeState();
  }

  // Initialize Interactive FAQ Accordion
  initFaqAccordion();

  // Initialize Infinite Auto-Cycling Hero Carousel
  initHeroCarousel();

  // Track Phone Call conversions in Google Analytics
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener("click", () => {
      if (typeof gtag === 'function') {
        gtag('event', 'contact', {
          event_category: 'engagement',
          event_label: 'Phone Call CTA'
        });
      }
    });
  });
});

// Interactive FAQ Accordion Handler
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-btn");
  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      // Toggle current item
      if (content) {
        content.classList.toggle("hidden");
      }
      btn.setAttribute("aria-expanded", !isExpanded);
      if (icon) {
        icon.classList.toggle("rotate-180");
      }
    });
  });
}

// Validator: Room cooling type can only be changed if 3 sharing or 4 sharing is selected
function updateCoolingTypeState() {
  const sharingSelect = document.getElementById("form-sharing");
  const acSelect = document.getElementById("form-actype");
  const helperText = document.getElementById("actype-helper-text");

  if (!sharingSelect || !acSelect) return;

  const sharingVal = sharingSelect.value || "";
  const is3or4Sharing = sharingVal.includes("3") || sharingVal.includes("4");

  if (is3or4Sharing) {
    acSelect.disabled = false;
    acSelect.classList.remove("bg-slate-100", "text-slate-500", "cursor-not-allowed");
    acSelect.classList.add("bg-white", "text-slate-800", "cursor-pointer");
    if (helperText) {
      helperText.textContent = "✓ AC (Attached Bath) & Non-AC available for 3 & 4 sharing.";
      helperText.className = "text-[11px] text-[#8C4408] mt-1 font-medium";
    }
  } else {
    // Only Non-AC is available for 2 Sharing and 5 Sharing
    for (let i = 0; i < acSelect.options.length; i++) {
      if (acSelect.options[i].value.includes("Non-AC") || acSelect.options[i].text.includes("Non-AC")) {
        acSelect.selectedIndex = i;
        break;
      }
    }
    acSelect.disabled = true;
    acSelect.classList.remove("bg-white", "text-slate-800", "cursor-pointer");
    acSelect.classList.add("bg-slate-100", "text-slate-500", "cursor-not-allowed");
    if (helperText) {
      helperText.textContent = "Only Non-AC available for this sharing (AC option is available for 3 & 4 sharing).";
      helperText.className = "text-[11px] text-slate-500 mt-1";
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

  // Update cooling type accessibility based on newly selected sharing
  updateCoolingTypeState();

  if (acSelect && !acSelect.disabled) {
    for (let i = 0; i < acSelect.options.length; i++) {
      if (acSelect.options[i].text.includes(acType)) {
        acSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Smooth scroll to contact section
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }

  // Highlight form
  const formNameInput = document.getElementById("form-name");
  if (formNameInput) {
    formNameInput.focus();
  }
}

// 3. Instant WhatsApp Inquiry Generator
function handleWhatsAppInquiry() {
  const name = document.getElementById("form-name").value.trim();
  const phone = document.getElementById("form-phone").value.trim();
  const role = document.getElementById("form-role").value;
  const sharing = document.getElementById("form-sharing").value;
  const actype = document.getElementById("form-actype").value;
  const moveDate = document.getElementById("form-date").value;
  const notes = document.getElementById("form-notes").value.trim();

  // Basic validation
  if (!name) {
    showFormStatus("Please enter your name.", "error");
    document.getElementById("form-name").focus();
    return;
  }

  if (!phone || phone.length < 10) {
    showFormStatus("Please enter a valid 10-digit phone number.", "error");
    document.getElementById("form-phone").focus();
    return;
  }

  // Validate cooling type against sharing preference
  const is3or4Sharing = sharing.includes("3") || sharing.includes("4");
  const isAC = actype.toLowerCase().includes("ac") && !actype.toLowerCase().includes("non-ac");
  if (!is3or4Sharing && isAC) {
    showFormStatus("AC cooling type is only available for 3 and 4 sharing rooms.", "error");
    updateCoolingTypeState();
    return;
  }

  // Compose clean WhatsApp text message
  const lines = [
    `*Hello Kashyap Patel (Balkrishna Boys PG, Ahmedabad)!*`,
    `I would like to inquire about booking a room.`,
    ``,
    `👤 *Name:* ${name}`,
    `📱 *Phone:* ${phone}`,
    `💼 *I am a:* ${role}`,
    `🛏️ *Sharing Preference:* ${sharing}`,
    `❄️ *Room Type:* ${actype}`,
    `📅 *Expected Move-in:* ${moveDate || 'Immediate / Flexible'}`
  ];

  if (notes) {
    lines.push(`📝 *Note / Dietary:* ${notes}`);
  }

  lines.push(``);
  lines.push(`Please share current availability and visiting timings.`);

  const fullMessage = lines.join("\n");
  const encodedUrl = `https://wa.me/${PG_CONFIG.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

  // Track conversion in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', {
      event_category: 'inquiry',
      event_label: `WhatsApp Inquiry - ${sharing} (${actype})`,
      value: 1
    });
  }

  // Open WhatsApp in new tab
  window.open(encodedUrl, "_blank");
  showFormStatus("Opening WhatsApp with your details pre-filled...", "success");
}

// 4. Asynchronous Email Submission (Formspree Endpoint)
async function handleEmailFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("form-name").value.trim();
  const phone = document.getElementById("form-phone").value.trim();
  const role = document.getElementById("form-role").value;
  const sharing = document.getElementById("form-sharing").value;
  const actype = document.getElementById("form-actype").value;
  const moveDate = document.getElementById("form-date").value;
  const notes = document.getElementById("form-notes").value.trim();
  const submitBtn = document.getElementById("email-submit-btn");

  if (!name || !phone) {
    showFormStatus("Please provide your name and phone number.", "error");
    return;
  }

  // Validate cooling type against sharing preference
  const is3or4Sharing = sharing.includes("3") || sharing.includes("4");
  const isAC = actype.toLowerCase().includes("ac") && !actype.toLowerCase().includes("non-ac");
  if (!is3or4Sharing && isAC) {
    showFormStatus("AC cooling type is only available for 3 and 4 sharing rooms.", "error");
    updateCoolingTypeState();
    return;
  }

  // If using placeholder endpoint, inform user how it works
  if (!PG_CONFIG.formspreeEndpoint || PG_CONFIG.formspreeEndpoint.includes("YOUR_")) {
    showFormStatus("Inquiry simulated! Please configure a valid Formspree endpoint URL in assets/js/main.js.", "success");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting Inquiry...";

  // Extract Cloudflare Turnstile token if available
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
    name: name,
    phone: phone,
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
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Track conversion in Google Analytics
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'inquiry',
          event_label: `Formspree Email Inquiry - ${sharing}`,
          value: 1
        });
      }

      showFormStatus("✓ Inquiry received! Redirecting to confirmation page...", "success");
      document.getElementById("pg-inquiry-form").reset();

      // Redirect to custom Thank You page
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 700);
    } else {
      const data = await response.json().catch(() => ({}));
      const errorMsg = data && data.errors ? data.errors.map(e => e.message).join(", ") : "Submission error. Please connect directly via WhatsApp.";
      showFormStatus(errorMsg, "error");
    }
  } catch (err) {
    showFormStatus("Network error. Please connect directly via WhatsApp or phone call.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Or Submit Inquiry via Email";
  }
}

// 5. Status Banner Utility
function showFormStatus(message, type) {
  const statusDiv = document.getElementById("form-status");
  if (!statusDiv) return;

  statusDiv.classList.remove("hidden", "bg-[#F6EADB]", "text-[#6E3404]", "bg-rose-100", "text-rose-800");

  if (type === "success") {
    statusDiv.classList.add("bg-[#F6EADB]", "text-[#6E3404]");
  } else {
    statusDiv.classList.add("bg-rose-100", "text-rose-800");
  }

  statusDiv.textContent = message;
  statusDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

  setTimeout(() => {
    statusDiv.classList.add("hidden");
  }, 7000);
}


// 6. Accessible Auto-Cycling Hero Image Carousel (WCAG 2.2.2 & 4.1.2)
function initHeroCarousel() {
  const carousel = document.getElementById("hero-carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".hero-slide");
  const dots = carousel.querySelectorAll(".hero-dot");
  const track = document.getElementById("hero-carousel-track");
  const toggleBtn = document.getElementById("carousel-play-pause");
  const pauseIcon = document.getElementById("carousel-pause-icon");
  const playIcon = document.getElementById("carousel-play-icon");
  
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let intervalId = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let isManuallyPaused = prefersReducedMotion;

  function updateSlideAria(index, userInitiated = false) {
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

    dots.forEach((dot, i) => {
      const pill = dot.querySelector("span");
      if (i === index) {
        dot.setAttribute("aria-selected", "true");
        if (pill) {
          pill.classList.remove("w-2", "bg-white/50");
          pill.classList.add("w-6", "bg-white");
        }
      } else {
        dot.setAttribute("aria-selected", "false");
        if (pill) {
          pill.classList.remove("w-6", "bg-white");
          pill.classList.add("w-2", "bg-white/50");
        }
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlideAria(nextIndex, false);
  }

  function startAutoCycle() {
    if (isManuallyPaused) return;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 3500);
  }

  function stopAutoCycle() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Allow clicking dots to jump directly to any slide
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlideAria(index, true);
      if (!isManuallyPaused) startAutoCycle();
    });
  });

  // WCAG 2.2.2 Pause/Stop mechanism
  if (toggleBtn) {
    if (isManuallyPaused) {
      if (pauseIcon) pauseIcon.classList.add("hidden");
      if (playIcon) playIcon.classList.remove("hidden");
      toggleBtn.setAttribute("aria-label", "Play automatic slide rotation");
    }

    toggleBtn.addEventListener("click", () => {
      isManuallyPaused = !isManuallyPaused;
      if (isManuallyPaused) {
        stopAutoCycle();
        if (pauseIcon) pauseIcon.classList.add("hidden");
        if (playIcon) playIcon.classList.remove("hidden");
        toggleBtn.setAttribute("aria-label", "Play automatic slide rotation");
      } else {
        startAutoCycle();
        if (pauseIcon) pauseIcon.classList.remove("hidden");
        if (playIcon) playIcon.classList.add("hidden");
        toggleBtn.setAttribute("aria-label", "Pause automatic slide rotation");
      }
    });
  }

  // Pause on mouse hover & keyboard focus for user reading comfort
  carousel.addEventListener("mouseenter", () => {
    if (!isManuallyPaused) stopAutoCycle();
  });
  carousel.addEventListener("mouseleave", () => {
    if (!isManuallyPaused) startAutoCycle();
  });
  carousel.addEventListener("focusin", () => {
    if (!isManuallyPaused) stopAutoCycle();
  });
  carousel.addEventListener("focusout", () => {
    if (!isManuallyPaused) startAutoCycle();
  });

  // Start cycling if reduced motion is not preferred
  if (!isManuallyPaused) {
    startAutoCycle();
  }
}
