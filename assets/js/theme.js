/**
 * Bal Krishna Boys PG - Dark / Light Theme Controller
 * Defaults to device color scheme unless the visitor sets a preference via the toggle button.
 */
(function () {
  const STORAGE_KEY = "pg-theme";
  const colorSchemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getStoredTheme() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch (err) {
      return null;
    }
  }

  function resolveIsDark() {
    const stored = getStoredTheme();
    if (stored) return stored === "dark";
    return Boolean(colorSchemeQuery && colorSchemeQuery.matches);
  }

  function syncThemeUi(isDark) {
    document.documentElement.classList.toggle("dark", isDark);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", isDark ? "#021A33" : "#032B52");
    }

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function initThemeControls() {
    syncThemeUi(resolveIsDark());

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        try {
          localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch (err) {
          // Storage blocked in restricted browsing; toggle still applies to current page view.
        }
        syncThemeUi(nextTheme === "dark");
      });
    });

    if (colorSchemeQuery && typeof colorSchemeQuery.addEventListener === "function") {
      colorSchemeQuery.addEventListener("change", (event) => {
        if (!getStoredTheme()) {
          syncThemeUi(event.matches);
        }
      });
    }

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) {
        syncThemeUi(resolveIsDark());
      }
    });

    window.addEventListener("pageshow", () => {
      syncThemeUi(resolveIsDark());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeControls);
  } else {
    initThemeControls();
  }
})();

