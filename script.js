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
    const specialtyCopy = document.getElementById("specialtyCopy");
    const specialtyImage = document.getElementById("specialtyImage");
    const specialtyImageWrap = document.getElementById("specialtyImageWrap");

    const specialties = {
        "kidney-stones": {
            title: "Kidney Stone Treatment",
            description:
                "Minimally invasive treatment for kidney stones, with a procedure selected for the stone's size and location.",
            procedures: [
                "Ureteroscopy (URSL) and laser lithotripsy",
                "Retrograde intrarenal surgery (RIRS)",
                "Percutaneous nephrolithotomy (PCNL)"
            ],
            image: "images/procedures/Kidney%20Pain-1.png",
            imageAlt: "Client-provided illustration for kidney stone care"
        },
        prostate: {
            title: "Prostate Care",
            description:
                "Evaluation and treatment for prostate conditions, including benign enlargement and associated urinary symptoms.",
            procedures: [
                "Transurethral resection of the prostate (TURP)",
                "Laser prostate enucleation",
                "Individualised assessment and treatment planning"
            ],
            image: "images/procedures/Prostate%20Pain-2.png",
            imageAlt: "Client-provided illustration for prostate care"
        },
        "uro-oncology": {
            title: "Uro-Oncology",
            description:
                "Comprehensive surgical care for cancers affecting the kidney, bladder, and prostate.",
            procedures: [
                "Laparoscopic and robotic kidney cancer surgery",
                "Bladder cancer surgery, including radical cystectomy",
                "Prostate cancer care"
            ],
            image: "images/procedures/Kidney%20Pain%20Medical-3.png",
            imageAlt: "Client-provided medical illustration for uro-oncology"
        },
        "robotic-urology": {
            title: "Robotic & Laparoscopic Urology",
            description:
                "Minimally invasive surgical approaches for selected urological conditions, supporting smaller incisions and recovery.",
            procedures: [
                "Robotic-assisted urological surgery",
                "Laparoscopic nephrectomy",
                "Laparoscopic pyeloplasty"
            ],
            image: "images/procedures/Robotic%20Surgery-4.png",
            imageAlt: "Client-provided illustration for robotic surgery"
        },
        "renal-transplant": {
            title: "Renal Transplant",
            description:
                "Urological care through kidney transplant evaluation, surgery, and post-transplant follow-up.",
            procedures: [
                "Pre-transplant evaluation",
                "Kidney transplant surgery",
                "Post-transplant urological follow-up"
            ],
            image: "images/procedures/Surgeon%20Presenting%20Kidney%20with%20Renal%20System-5.png",
            imageAlt: "Client-provided illustration for renal transplant care"
        },
        andrology: {
            title: "Andrology & Men's Health",
            description:
                "Confidential specialist care for male infertility, erectile dysfunction, and testicular conditions.",
            procedures: [
                "Male infertility evaluation",
                "Erectile dysfunction management",
                "Assessment of testicular conditions"
            ],
            image: "images/procedures/Urology%20Consultation-6.png",
            imageAlt: "Client-provided illustration for urology consultation"
        }
    };

    const renderSpecialty = (tab) => {
        if (
            !specialtyCopy ||
            !specialtyImage ||
            !specialtyImageWrap
        ) {
            return;
        }

        const specialty = specialties[tab.dataset.specialty];

        if (!specialty) {
            return;
        }

        specialtyTabs.forEach((item) => {
            const isActive = item === tab;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });

        specialtyCopy.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = specialty.title;

        const description = document.createElement("p");
        description.textContent = specialty.description;

        const proceduresHeading = document.createElement("h4");
        proceduresHeading.textContent = "Procedures and care";

        const procedureList = document.createElement("ul");

        specialty.procedures.forEach((procedure) => {
            const item = document.createElement("li");
            item.textContent = procedure;
            procedureList.append(item);
        });

        specialtyCopy.append(
            heading,
            description,
            proceduresHeading,
            procedureList
        );

        specialtyImageWrap.hidden = true;
        specialtyImage.hidden = true;
        specialtyImage.alt = specialty.imageAlt;
        specialtyImage.onload = () => {
            specialtyImage.hidden = false;
            specialtyImageWrap.hidden = false;
        };
        specialtyImage.onerror = () => {
            specialtyImageWrap.hidden = true;
        };
        specialtyImage.src = specialty.image;
    };

    specialtyTabs.forEach((tab) => {
        tab.addEventListener("click", () => renderSpecialty(tab));
    });

    const initialSpecialty = document.querySelector(
        ".specialty-tab[aria-selected='true']"
    );

    if (initialSpecialty) {
        renderSpecialty(initialSpecialty);
    }

    const videoPlayer = document.getElementById("mainVideoPlayer");
    const videoTitle = document.getElementById("doctorVideoTitle");
    const videoDescription = document.getElementById("doctorVideoDesc");
    const videoStatus = document.getElementById("doctorVideoStatus");
    const videoButtons = document.querySelectorAll(".video-playlist-btn");
    const videoLink = document.getElementById("doctorReelLink");

    if (
        videoPlayer &&
        videoTitle &&
        videoDescription &&
        videoStatus &&
        videoLink
    ) {
        videoButtons.forEach((button) => {
            const thumbnail = button.querySelector(".video-playlist-thumb img");

            if (thumbnail) {
                thumbnail.addEventListener("error", () => {
                    thumbnail.hidden = true;
                });
            }

            button.addEventListener("click", () => {
                const reelId = button.dataset.reelId;
                const title = button.dataset.title;
                const description = button.dataset.description;

                if (!reelId || !/^[A-Za-z0-9_-]+$/.test(reelId) ||
                    !title || !description) {
                    videoStatus.textContent =
                        "This Reel is missing its playlist details.";
                    return;
                }

                videoButtons.forEach((item) => {
                    item.classList.remove("video-btn-active");
                    item.setAttribute("aria-pressed", "false");
                });

                button.classList.add("video-btn-active");
                button.setAttribute("aria-pressed", "true");
                videoTitle.textContent = title;
                videoDescription.textContent = description;
                videoStatus.textContent = "Loading Instagram Reel...";
                videoPlayer.title = title;
                videoPlayer.src =
                    "https://www.instagram.com/reel/" + reelId + "/embed/";
                videoLink.href =
                    "https://www.instagram.com/reel/" + reelId + "/";
            });
        });

        videoPlayer.addEventListener("load", () => {
            videoStatus.textContent = "";
        });
    }

    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentFormStatus = document.getElementById(
        "appointmentFormStatus"
    );

    const readAppointmentStatus = (endpoint, requestId) =>
        new Promise((resolve, reject) => {
            const callbackName =
                "appointmentCallback_" +
                Date.now() +
                "_" +
                Math.floor(Math.random() * 1000000);
            const callbackScript = document.createElement("script");
            const timeout = window.setTimeout(() => {
                cleanup();
                reject(new Error("Appointment status check timed out."));
            }, 5000);

            const cleanup = () => {
                window.clearTimeout(timeout);
                delete window[callbackName];
                callbackScript.remove();
            };

            window[callbackName] = (result) => {
                cleanup();
                resolve(result);
            };

            callbackScript.onerror = () => {
                cleanup();
                reject(new Error("Could not check the appointment status."));
            };
            callbackScript.src =
                endpoint +
                "?requestId=" +
                encodeURIComponent(requestId) +
                "&callback=" +
                encodeURIComponent(callbackName) +
                "&poll=" +
                Date.now();
            document.head.append(callbackScript);
        });

    if (appointmentForm && appointmentFormStatus) {
        appointmentForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const endpoint = appointmentForm.dataset.endpoint.trim();
            const submitButton = appointmentForm.querySelector(
                "button[type='submit']"
            );

            if (
                !/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(
                    endpoint
                )
            ) {
                appointmentFormStatus.textContent =
                    "Appointment requests are not configured yet. Please call +91 99664 09838 to book.";
                appointmentFormStatus.className =
                    "form-message error-message";
                appointmentFormStatus.hidden = false;
                return;
            }

            if (!appointmentForm.reportValidity()) {
                return;
            }

            const formData = new FormData(appointmentForm);
            if (String(formData.get("faxNumber") || "").trim()) {
                appointmentFormStatus.textContent =
                    "We could not submit your request. Please refresh the page and try again, or call +91 99664 09838 to book.";
                appointmentFormStatus.className =
                    "form-message error-message";
                appointmentFormStatus.hidden = false;
                return;
            }

            const requestId =
                window.crypto &&
                typeof window.crypto.randomUUID === "function"
                    ? window.crypto.randomUUID()
                    : Date.now().toString(36) +
                      Math.random().toString(36).slice(2);
            const request = Object.fromEntries(formData.entries());

            request.requestId = requestId;
            appointmentFormStatus.textContent = "Sending your request...";
            appointmentFormStatus.className = "form-message";
            appointmentFormStatus.hidden = false;

            if (submitButton) {
                submitButton.disabled = true;
            }

            const submissionController = new AbortController();
            const submissionTimeout = window.setTimeout(
                () => submissionController.abort(),
                10000
            );

            try {
                await fetch(endpoint, {
                    method: "POST",
                    mode: "no-cors",
                    signal: submissionController.signal,
                    headers: {
                        "Content-Type": "text/plain;charset=UTF-8"
                    },
                    body: JSON.stringify(request)
                });
                window.clearTimeout(submissionTimeout);

                const deadline = Date.now() + 20000;
                let result = { pending: true };

                while (result.pending && Date.now() < deadline) {
                    await new Promise((resolve) =>
                        window.setTimeout(resolve, 500)
                    );
                    result = await readAppointmentStatus(endpoint, requestId);
                }

                if (result.pending) {
                    appointmentFormStatus.textContent =
                        "Your request is taking longer than expected. Please call +91 99664 09838 to confirm.";
                    appointmentFormStatus.className =
                        "form-message error-message";
                } else {
                    appointmentFormStatus.textContent = result.message;
                    appointmentFormStatus.className = result.success
                        ? "form-message success-message"
                        : "form-message error-message";

                    if (result.success) {
                        window.location.assign("thank-you.php");
                        return;
                    }
                }
            } catch (error) {
                appointmentFormStatus.textContent =
                    "We could not confirm your request. Please call +91 99664 09838 to book.";
                appointmentFormStatus.className =
                    "form-message error-message";
                console.error("Appointment submission failed:", error);
            } finally {
                window.clearTimeout(submissionTimeout);
                appointmentFormStatus.hidden = false;

                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }
});