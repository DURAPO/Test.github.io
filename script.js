"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Show the supplied SVG mark alongside the wordmark in the header and footer.
  document.querySelectorAll(".wordmark").forEach(wordmark => {
    const logo = document.createElement("img");
    logo.src = "logo.svg";
    logo.alt = "";
    logo.setAttribute("aria-hidden", "true");
    logo.width = 36;
    logo.height = 36;
    logo.style.flex = "0 0 36px";
    logo.style.display = "block";
    wordmark.style.display = "inline-flex";
    wordmark.style.alignItems = "center";
    wordmark.style.gap = "9px";
    wordmark.prepend(logo);
  });

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#nav-links");
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    menu?.classList.toggle("open", !open);
  });

  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (menu?.classList.contains("open") && !menu.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".division-card, .work-card, .intro-content, .manifesto-inner, .contact-panel");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach(el => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }
});
