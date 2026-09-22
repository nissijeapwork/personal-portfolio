const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const progress = document.getElementById("progress");
const nav = document.getElementById("nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const backToTop = document.getElementById("backToTop");

function updateScrollUI(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
  nav?.classList.toggle("scrolled", window.scrollY > 30);
  backToTop?.classList.toggle("show", window.scrollY > 500);

  let current = "home";
  const marker = window.scrollY + Math.min(180, window.innerHeight * 0.28);
  sections.forEach((section) => {
    if (marker >= section.offsetTop) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateScrollUI, { passive:true });
window.addEventListener("resize", updateScrollUI, { passive:true });
updateScrollUI();

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const cursor = document.getElementById("cursor");
if (cursor) {
  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX - 9}px`;
    cursor.style.top = `${event.clientY - 9}px`;
  });
  document.querySelectorAll("a, .tech-card, .project, .service-card, .service-feature, .cta-link, .back-to-top").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.style.transform = "scale(1.8)");
    el.addEventListener("mouseleave", () => cursor.style.transform = "scale(1)");
  });
}

/* Ambient particle field */
const particleContainer = document.getElementById("particles");
if (particleContainer) {
  const particleCount = window.innerWidth < 700 ? 24 : 55;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${12 + Math.random() * 22}s`;
    particle.style.animationDelay = `${-Math.random() * 20}s`;
    particle.style.opacity = `${0.12 + Math.random() * 0.35}`;
    particleContainer.appendChild(particle);
  }
}

/* Gentle pointer parallax on the hero visual */
const heroVisual = document.querySelector(".hero-visual");
if (heroVisual && window.matchMedia("(pointer:fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  });
  heroVisual.addEventListener("mouseleave", () => heroVisual.style.transform = "translate(0,0)");
}

/* Back to top */
backToTop?.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));


/* Responsive hamburger navigation */
const menuToggle = document.getElementById("menuToggle");
const mobileNavLinks = document.querySelector(".nav-links");

function closeMobileMenu(){
  mobileNavLinks?.classList.remove("open");
  menuToggle?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNavLinks?.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

mobileNavLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) closeMobileMenu();
});
