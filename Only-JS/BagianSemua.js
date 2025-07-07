// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const starsContainer = document.getElementById("starsContainer");
const galleryModal = document.getElementById("galleryModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const contactForm = document.getElementById("contactForm");
const comet = document.getElementById("comet");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createStars();
  initializeNavigation();
  initializeScrollEffects();
  initializeGallery();
  initializeContactForm();
  initializeAnimations();
});

// Create animated stars
function createStars() {
  const numberOfStars = 100;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    starsContainer.appendChild(star);
  }
}

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Scroll effects and animations
function initializeScrollEffects() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Parallax effect for background elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const planets = document.querySelectorAll(".planet");

    planets.forEach((planet, index) => {
      const speed = 0.1 + index * 0.05;
      planet.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".exploration-card, .gallery-item, .timeline-item, .contact-card");
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Gallery functionality
function initializeGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  const galleryData = {
    nebula: {
      title: "Nebula Orion",
      description: "Salah satu nebula paling spektakuler di konstelasi Orion, tempat kelahiran bintang-bintang baru.",
    },
    planet: {
      title: "Saturnus dan Cincinnya",
      description: "Planet gas raksasa dengan sistem cincin yang menakjubkan, terdiri dari miliaran partikel es dan batu.",
    },
    rocket: {
      title: "Peluncuran SpaceX Falcon Heavy",
      description: "Roket paling kuat yang beroperasi saat ini, mampu membawa muatan besar ke orbit dan luar angkasa.",
    },
    galaxy: {
      title: "Galaksi Andromeda",
      description: "Galaksi spiral terdekat dengan Bima Sakti, berisi lebih dari satu triliun bintang.",
    },
    astronaut: {
      title: "Spacewalk ISS",
      description: "Astronaut melakukan aktivitas ekstravehikular di luar Stasiun Luar Angkasa Internasional.",
    },
    satellite: {
      title: "Teleskop Hubble",
      description: "Teleskop luar angkasa yang telah mengungkap misteri alam semesta selama lebih dari 30 tahun.",
    },
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imageType = this.getAttribute("data-image");
      const data = galleryData[imageType];

      if (data) {
        modalImage.textContent = this.querySelector(".gallery-placeholder").textContent;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        galleryModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal
  modalClose.addEventListener("click", closeModal);
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeModal();
    }
  });

  function closeModal() {
    galleryModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && galleryModal.style.display === "block") {
      closeModal();
    }
  });
}

// Contact form functionality
function initializeContactForm() {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="btn-icon">🛰️</span> Mengirim Transmisi...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(`Transmisi berhasil dikirim, ${name}! Base Station akan segera merespons ses.`);
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Additional animations and interactions
function initializeAnimations() {
  // Hero buttons interaction
  const exploreBtn = document.getElementById("exploreBtn");
  const liveStreamBtn = document.getElementById("liveStreamBtn");

  exploreBtn.addEventListener("click", () => {
    document.querySelector("#exploration").scrollIntoView({
      behavior: "smooth",
    });
  });

  liveStreamBtn.addEventListener("click", () => {
    alert("🔴 Live Stream akan segera dimulai! Bersiaplah untuk petualangan kosmik yang menakjubkan.");
  });

  // Exploration cards interaction
  const explorationCards = document.querySelectorAll(".exploration-card");
  explorationCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      let message = "";

      switch (category) {
        case "planets":
          message = "🌍 Memuat database planet... Bersiaplah menjelajahi dunia-dunia baru!";
          break;
        case "phenomena":
          message = "⭐ Mengakses arsip fenomena kosmik... Keajaiban alam semesta menanti!";
          break;
        case "technology":
          message = "🚀 Membuka blueprint teknologi masa depan... Inovasi tanpa batas!";
          break;
      }

      alert(message);
    });
  });

  // Mouse tracking for stars
  document.addEventListener("mousemove", (e) => {
    const stars = document.querySelectorAll(".star");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    stars.forEach((star, index) => {
      const speed = ((index % 5) + 1) * 0.5;
      const x = mouseX * speed;
      const y = mouseY * speed;

      star.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Comet animation trigger
  setInterval(() => {
    comet.style.animation = "none";
    comet.offsetHeight; // Trigger reflow
    comet.style.animation = "comet-trail 15s linear infinite";
  }, 20000);

  // Add floating animation to cards on hover
  const cards = document.querySelectorAll(".exploration-card, .contact-card, .stat-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.animation = "float 2s ease-in-out infinite";
    });

    card.addEventListener("mouseleave", function () {
      this.style.animation = "none";
    });
  });
}

// Utility functions
function getRandomPosition() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };
}

function createParticleEffect(x, y) {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "#00d4ff";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "9999";

  document.body.appendChild(particle);

  // Animate particle
  particle.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 },
    ],
    {
      duration: 1000,
      easing: "ease-out",
    }
  ).onfinish = () => {
    particle.remove();
  };
}

// Add click particle effect
document.addEventListener("click", (e) => {
  createParticleEffect(e.clientX, e.clientY);
});

// Performance optimization
let ticking = false;

function updateAnimations() {
  // Update any continuous animations here
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

// Optimize scroll events
window.addEventListener("scroll", requestTick);

// Console welcome message
console.log(`
🚀 Welcome to StellarVision! 🚀
═══════════════════════════════
Selamat datang di portal eksplorasi galaksi!
Developed with ❤️ for space enthusiasts everywhere.

Ready to explore the cosmos? 🌌
`);
