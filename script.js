const nav = document.querySelector("nav");
const header = document.querySelector("header");
const navLinks = document.querySelector(".nav__links");

// Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;

const observerCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("isSticky");
  if (entry.isIntersecting) nav.classList.remove("isSticky");
};

const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  observerCallback,
  observerOptions
);
headerObserver.observe(header);

// Smooth Scrolling
navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const dotContainer = document.querySelector(".dots");

  //   Create Dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class = "dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Change color of dot for active slide
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  //   Change Slide Functionality
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const init = function () {
    // Set the starting slide to 0
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // Slider Dots using event delegation
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // All custom data attributes are under dataset, HTML code they are data-(name that will be after dataset)
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
