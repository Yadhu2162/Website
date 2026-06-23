(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("batteryHouseTheme");
  const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const theme = storedTheme || preferred;

  root.dataset.theme = theme;

  function syncThemeButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isLight = root.dataset.theme === "light";
      button.textContent = isLight ? "Dark" : "Light";
      button.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    });
  }

  syncThemeButtons();

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem("batteryHouseTheme", root.dataset.theme);
      syncThemeButtons();
    });
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(document.body.classList.contains("menu-open")));
    });
  }

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });

  document.querySelectorAll("[data-callback]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const form = document.querySelector("#callback-form");
      if (!form) {
        return;
      }
      event.preventDefault();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      const type = document.querySelector("#service");
      if (type && button.dataset.callback) {
        type.value = button.dataset.callback;
      }
      const name = document.querySelector("#name");
      if (name) {
        setTimeout(() => name.focus(), 450);
      }
    });
  });

  const form = document.querySelector("#callback-form");
  const toast = document.querySelector("#toast");
  if (form && toast) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();

      if (!name || !phone) {
        toast.textContent = "Please enter your name and phone number so the team can call back.";
      } else {
        toast.textContent = `Thanks ${name}. Your callback request is ready. Battery House will call ${phone}.`;
        form.reset();
      }
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4600);
    });
  }
})();
