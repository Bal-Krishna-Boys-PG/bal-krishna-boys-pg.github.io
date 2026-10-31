/**
 * Balkrishna Boys PG - Interactive Main Scripts
 * Handles: WhatsApp URL generator, Async Form Submission, Room Auto-selection, Mobile Nav
 */

// Global configuration (Owner can update these two values)
const PG_CONFIG = {
  // Owner WhatsApp Number in international format (without '+' or spaces)
  whatsappNumber: "919876543210",
  // Web3Forms free public access key (Register at web3forms.com in 30s)
  web3FormsKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE"
};

// 1. Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when a navigation link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Bind Email Form Submission
  const form = document.getElementById("pg-inquiry-form");
  if (form) {
    form.addEventListener("submit", handleEmailFormSubmit);
  }
});

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

  if (acSelect) {
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

  // Compose clean WhatsApp text message
  const lines = [
    `*Hello Balkrishna Boys PG, Ahmedabad!*`,
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

  // Open WhatsApp in new tab
  window.open(encodedUrl, "_blank");
  showFormStatus("Opening WhatsApp with your details pre-filled...", "success");
}

// 4. Asynchronous Email Submission (Web3Forms Zero-Backend Endpoint)
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

  // If using placeholder key, inform user how it works
  if (PG_CONFIG.web3FormsKey === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
    showFormStatus("Inquiry simulated! To receive real emails without a backend, simply insert your free Web3Forms access key in assets/js/main.js.", "success");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting Inquiry...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: PG_CONFIG.web3FormsKey,
        subject: `New PG Inquiry from ${name} (${sharing})`,
        from_name: "Balkrishna Boys PG Website",
        name: name,
        phone: phone,
        occupation: role,
        room_sharing: sharing,
        cooling_type: actype,
        move_in_date: moveDate || "Not specified",
        message: notes || "No specific note"
      })
    });

    const result = await response.json();
    if (result.success) {
      showFormStatus("✓ Inquiry submitted successfully! The owner will contact you shortly.", "success");
      document.getElementById("pg-inquiry-form").reset();
    } else {
      showFormStatus("Submission error. Please connect directly via WhatsApp.", "error");
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

  statusDiv.classList.remove("hidden", "bg-emerald-100", "text-emerald-800", "bg-rose-100", "text-rose-800");

  if (type === "success") {
    statusDiv.classList.add("bg-emerald-100", "text-emerald-800");
  } else {
    statusDiv.classList.add("bg-rose-100", "text-rose-800");
  }

  statusDiv.textContent = message;
  statusDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

  setTimeout(() => {
    statusDiv.classList.add("hidden");
  }, 7000);
}

