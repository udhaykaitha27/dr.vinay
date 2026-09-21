document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
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

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach((item) => {
            item.classList.add("visible");
        });
    }

    const counters = document.querySelectorAll("[data-count]");

    if ("IntersectionObserver" in window) {
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

                        element.textContent = Math.floor(
                            target * easedProgress
                        ).toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            element.textContent =
                                target.toLocaleString();
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

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }

    const specialtyTabs = document.querySelectorAll(".specialty-tab");

    specialtyTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            specialtyTabs.forEach((item) => {
                item.classList.remove("active");
            });

            tab.classList.add("active");
        });
    });
});