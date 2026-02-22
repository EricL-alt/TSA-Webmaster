/* =========================
   HIGHLIGHT CAROUSEL
   (SIMPLE FADE/GALLERY + DOTS)
========================= */


const slides = document.querySelectorAll("[data-highlight-slide]");
const prevBtn = document.querySelector("[data-highlight-prev]");
const nextBtn = document.querySelector("[data-highlight-next]");
const dotsContainer = document.querySelector("[data-highlight-dots]");


let currentIndex = 0;


// Initialize
function initCarousel() {
  if (slides.length === 0) return;


  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = ''; // Clear existing
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
  }


  // Show first slide
  slides[0].classList.add('is-active');
}


function updateDots(index) {
  if (!dotsContainer) return;
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('is-active'));
  if (dots[index]) dots[index].classList.add('is-active');
}


function showSlide(index) {
  // Wrap around index
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;


  // Remove active class from all slides
  slides.forEach(slide => {
    slide.classList.remove('is-active');
  });


  // Add active class to new slide
  slides[index].classList.add('is-active');


  // Update dots
  updateDots(index);


  currentIndex = index;
}


function nextSlide() {
  showSlide(currentIndex + 1);
}


function prevSlide() {
  showSlide(currentIndex - 1);
}


nextBtn?.addEventListener("click", nextSlide);
prevBtn?.addEventListener("click", prevSlide);


// Auto-advance
let autoSlide = setInterval(nextSlide, 8000);


// Pause on hover (optional, good for UX)
const wrapper = document.querySelector('.highlightWrap');
wrapper?.addEventListener('mouseenter', () => clearInterval(autoSlide));
wrapper?.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 8000));


// Run init
initCarousel();




/* =========================
   DIVERSITY FADE-IN
========================= */


const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);


document
  .querySelectorAll(".diversity__stats, .diversity__art, .diversity__badge, .card")
  .forEach(el => observer.observe(el));




document.querySelectorAll(".fade-in-item").forEach(el => observer.observe(el));








