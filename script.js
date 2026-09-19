document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
            });
        });
    }

    const revealItems = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;
                const target = Number(element.dataset.count);
                const duration = 1400;
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    element.textContent = Math.floor(target * easedProgress).toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = target.toLocaleString();
                    }
                };

                requestAnimationFrame(updateCounter);
                observer.unobserve(element);
            });
        },
        {
            threshold: 0.6
        }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
});