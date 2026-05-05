// Progress bar
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;
});

// Cursor glow
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
    if (!cursorGlow) return;

    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});

// Reveal animation
const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(section => revealObserver.observe(section));
}

// Algemene slider voor alle data-slider blokken
const sliders = document.querySelectorAll("[data-slider]");

sliders.forEach((slider) => {
    const images = slider.querySelectorAll(".slider-images img");
    const dotsContainer = slider.querySelector(".slider-dots");
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");

    if (images.length === 0 || !dotsContainer || !prev || !next) return;

    let current = 0;

    images.forEach((image, index) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Ga naar slide ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("button");

    function showSlide(index) {
        images[current].classList.remove("active");
        dots[current].classList.remove("active");

        current = (index + images.length) % images.length;

        images[current].classList.add("active");
        dots[current].classList.add("active");
    }

    function nextSlide() {
        showSlide(current + 1);
    }

    function prevSlide() {
        showSlide(current - 1);
    }

    next.addEventListener("click", () => {
        nextSlide();
    });

    prev.addEventListener("click", () => {
        prevSlide();
    });

    images[0].classList.add("active");
    dots[0].classList.add("active");
});