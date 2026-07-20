const SITE_LINKS = {
  // TODO: Replace these with Shiv Patel's verified public profile URLs.
  github: "https://example.com/TODO-github",
  linkedin: "https://example.com/TODO-linkedin",
  resume: "assets/Shiv-Patel-Resume.pdf",
};

const PROJECT_LINKS = {
  // TODO: Replace each GitHub URL with the matching verified repository.
  "f1-github": "https://example.com/TODO-f1-github",
  "benefitsync-github": "https://example.com/TODO-benefitsync-github",
  "dark-phoenix-github": "https://example.com/TODO-dark-phoenix-github",
  "babel-github": "https://example.com/TODO-babel-github",
};

document.body.classList.add("js");

const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const toggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("[data-section]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let updateMenuAccessibility = () => {};

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;
  if (SITE_LINKS[key]) {
    link.href = SITE_LINKS[key];
  }
});

document.querySelectorAll("[data-project-link]").forEach((link) => {
  const key = link.dataset.projectLink;
  if (PROJECT_LINKS[key]) {
    link.href = PROJECT_LINKS[key];
  }
});

const closeMenu = () => {
  if (!menu || !toggle) return;
  menu.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation menu");
  updateMenuAccessibility();
};

if (toggle && menu) {
  const menuItems = [...menu.querySelectorAll("a")];
  updateMenuAccessibility = () => {
    const isDesktop = window.matchMedia("(min-width: 1041px)").matches;
    const isOpen = menu.classList.contains("is-open");
    menuItems.forEach((item) => {
      if (isDesktop || isOpen) {
        item.removeAttribute("tabindex");
      } else {
        item.setAttribute("tabindex", "-1");
      }
    });
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    menu.classList.toggle("is-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    updateMenuAccessibility();
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", updateMenuAccessibility);
  updateMenuAccessibility();
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.08, 0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
}

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const tilt = document.querySelector("[data-tilt]");

  tilt?.addEventListener("pointermove", (event) => {
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tilt.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
  });

  tilt?.addEventListener("pointerleave", () => {
    tilt.style.transform = "";
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", targetId);
  });
});
