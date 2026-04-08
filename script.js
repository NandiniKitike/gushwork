const heroSlides = [
  "assets/imgone.png",
  "assets/imgone.png",
  "assets/imgone.png",
  "assets/imgone.png",
  "assets/imgone.png",
  "assets/imgone.png",
];

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const mainImage = carousel.querySelector(".carousel-image");
  const thumbs = Array.from(carousel.querySelectorAll(".thumb"));
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const zoomPreview = carousel.querySelector(".zoom-preview");
  const zoomLens = carousel.querySelector(".zoom-lens");
  const mainBox = carousel.querySelector(".carousel-main");
  let current = 0;

  const setSlide = (index) => {
    current = (index + heroSlides.length) % heroSlides.length;
    mainImage.src = heroSlides[current];
    zoomPreview.style.backgroundImage = `url('${heroSlides[current]}')`;
    thumbs.forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === current);
    });
  };

  prevBtn.addEventListener("click", () => setSlide(current - 1));
  nextBtn.addEventListener("click", () => setSlide(current + 1));

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => setSlide(idx));
  });

  mainBox.addEventListener("mouseenter", () => mainBox.classList.add("zooming"));
  mainBox.addEventListener("mouseleave", () => mainBox.classList.remove("zooming"));

  mainBox.addEventListener("mousemove", (e) => {
    moveLens(e);
    // Update background with active slide
    zoomPreview.style.backgroundImage = `url('${heroSlides[current]}')`;
  });

  setSlide(0);
}

// Carousel Zoom Lens Helper
function moveLens(event) {
  const lens = document.querySelector(".zoom-lens");
  const preview = document.querySelector(".zoom-preview");
  const img = document.querySelector(".carousel-image");
  if (!lens || !preview || !img) return;

  const rect = img.getBoundingClientRect();
  let x = event.clientX - rect.left - lens.offsetWidth / 2;
  let y = event.clientY - rect.top - lens.offsetHeight / 2;

  // Contain lens
  if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
  if (x < 0) x = 0;
  if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
  if (y < 0) y = 0;

  lens.style.left = x + "px";
  lens.style.top = y + "px";

  // Calculate Zoom Ratio
  const cx = preview.offsetWidth / lens.offsetWidth;
  const cy = preview.offsetHeight / lens.offsetHeight;

  preview.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  preview.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
}

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  button.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
      }
    });
    item.classList.toggle("open");
  });
});

if (faqItems.length) {
  faqItems.forEach((item, idx) => {
    item.classList.toggle("open", idx === 0);
  });
}

const appsCarousel = document.querySelector("[data-apps-carousel]");
if (appsCarousel) {
  const prev = document.querySelector("[data-apps-prev]");
  const next = document.querySelector("[data-apps-next]");
  const scrollAmount = 320;

  prev.addEventListener("click", () => {
    appsCarousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  next.addEventListener("click", () => {
    appsCarousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

const processSteps = [
  {
    title: "High-Grade Raw Material Selection",
    text: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    bullets: ["PE100 grade material", "Optimal molecular weight distribution"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "Precision Extrusion",
    text: "High-output extruders melt and homogenize polymer pellets to create a smooth, consistent pipe structure.",
    bullets: ["Uniform melt flow", "Consistent throughput"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "Controlled Cooling",
    text: "Multi-zone water baths stabilize the pipe while preserving dimensional accuracy and mechanical properties.",
    bullets: ["Rapid cooling control", "Minimal ovality"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "Exact Sizing",
    text: "Vacuum calibration ensures every pipe meets the defined outer diameter and wall thickness.",
    bullets: ["Precision calibration", "Stable roundness"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "In-Line Quality Control",
    text: "Automated sensors measure ovality, thickness, and surface finish to ensure compliance.",
    bullets: ["Real-time monitoring", "Instant adjustments"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "Marking & Traceability",
    text: "Automated inkjet marking ensures every pipe is traceable and compliant with standards.",
    bullets: ["Laser alignment", "Standard-compliant markings"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "Precision Cutting",
    text: "Servo-driven cutters deliver clean, accurate pipe lengths with minimal waste.",
    bullets: ["Accurate length control", "Clean edges"],
    image: "assets/imgthree.jpg",
  },
  {
    title: "Secure Packaging",
    text: "Protective wrapping ensures pipes arrive on-site without deformation or contamination.",
    bullets: ["Protective bundling", "Shipment-ready labeling"],
    image: "assets/imgthree.png",
  },
];

const processTabs = document.querySelectorAll("[data-process-tabs] .tab");
if (processTabs.length) {
  const titleEl = document.getElementById("processTitle");
  const textEl = document.getElementById("processText");
  const listEl = document.getElementById("processList");
  const imageEl = document.getElementById("processImage");
  const badgeEl = document.getElementById("stepBadge");
  const prevBtn = document.getElementById("processPrev");
  const nextBtn = document.getElementById("processNext");
  let currentStep = 0;

  const updateStep = (index) => {
    currentStep = index;
    const step = processSteps[index];
    titleEl.textContent = step.title;
    textEl.textContent = step.text;
    listEl.innerHTML = step.bullets.map((bullet) => `<li>${bullet}</li>`).join("");
    imageEl.src = step.image;
    
    if (badgeEl) {
      badgeEl.textContent = `Step ${index + 1}/${processSteps.length}: ${
        processTabs[index] ? processTabs[index].textContent : "Step"
      }`;
    }

    processTabs.forEach((tab) => {
      tab.classList.toggle("active", Number(tab.dataset.step) === index);
    });
  };

  processTabs.forEach((tab) => {
    tab.addEventListener("click", () => updateStep(Number(tab.dataset.step)));
  });

  if (prevBtn) prevBtn.addEventListener("click", () => updateStep((currentStep - 1 + processSteps.length) % processSteps.length));
  if (nextBtn) nextBtn.addEventListener("click", () => updateStep((currentStep + 1) % processSteps.length));

  updateStep(0);
}

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navActions = document.querySelector(".nav-actions");
const body = document.body;

if (menuToggle && navActions) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navActions.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close menu when clicking a link
  const navLinks = navActions.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navActions.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });
}
