const sidebar = document.querySelector("#sidebar");
const menuOpen = document.querySelector("[data-menu-open]");
const menuClose = document.querySelector("[data-menu-close]");

function setMenu(open) {
  sidebar?.classList.toggle("is-open", open);
  menuOpen?.setAttribute("aria-expanded", String(open));
}

menuOpen?.addEventListener("click", () => setMenu(true));
menuClose?.addEventListener("click", () => setMenu(false));
document.querySelectorAll(".side-nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const activateNav = (id) => navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) activateNav(visible.target.id);
  }, { rootMargin: "-20% 0px -65%", threshold: [0, .2, .5] });
  sections.forEach((section) => observer.observe(section));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const copyButton = document.querySelector("[data-copy]");
const toast = document.querySelector("[data-toast]");
copyButton?.addEventListener("click", async () => {
  const value = copyButton.dataset.copy;
  try {
    await navigator.clipboard.writeText(value);
    toast.textContent = "Handle copied";
  } catch {
    toast.textContent = value;
  }
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 1800);
});
