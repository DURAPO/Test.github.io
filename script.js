"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-links");
  const navLinks = nav ? nav.querySelectorAll("a") : [];
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("menu-open");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });

    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealItems.forEach(item => revealObserver.observe(item));
  }

  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = [...navLinks].filter(link =>
    (link.getAttribute("href") || "").startsWith("#")
  );

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      sectionLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.15, 0.4] });

    sections.forEach(section => sectionObserver.observe(section));
  }
});
