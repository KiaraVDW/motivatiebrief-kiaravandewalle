document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".nav .progress-bar");

    function updateProgress() {
        if (!progressBar) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        progressBar.style.width = `${progress}%`;
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const navHeight = () => {
        const nav = document.querySelector(".nav");
        return nav ? nav.offsetHeight : 90;
    };

    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            const id = href.includes("#") ? href.split("#")[1] : "";
            const target = document.getElementById(id);

            if (!target || (href.startsWith("index.html#") && !location.pathname.endsWith("index.html") && location.pathname !== "/" && location.pathname !== "/motivatiebrief-kiaravandewalle/")) {
                return;
            }

            e.preventDefault();

            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight() - 12;

            window.scrollTo({
                top,
                behavior: "smooth"
            });

            history.pushState(null, "", `#${id}`);
        });
    });

    const reveals = document.querySelectorAll(".reveal:not(.hero):not(.hero-content):not(.hero-visual)");

    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach((section) => revealObserver.observe(section));
    }

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
            dot.type = "button";
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

        next.addEventListener("click", () => showSlide(current + 1));
        prev.addEventListener("click", () => showSlide(current - 1));

        images[0].classList.add("active");
        dots[0].classList.add("active");
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        const offset = 90; // hoogte van je navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: top,
            behavior: "smooth"
        });
    });
});
