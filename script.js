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
    const specialtyImageCredit = document.getElementById(
        "specialtyImageCredit"
    );

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
            image: "images/procedures/kidney-stones.jpg",
            imageAlt: "X-ray image showing a kidney stone",
            imageCredit: "Nevit Dilmen · CC BY-SA 3.0",
            imageCreditUrl:
                "https://commons.wikimedia.org/wiki/File:Staghorn_Kidney_Stone_08779.jpg"
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
            image: "images/procedures/prostate-care.jpg",
            imageAlt: "Ultrasound image used to assess benign prostate enlargement",
            imageCredit: "UltrasoundBPH · CC BY 3.0",
            imageCreditUrl:
                "https://commons.wikimedia.org/wiki/File:UltrasoundBPH.jpg"
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
            image: "images/procedures/uro-oncology.jpg",
            imageAlt: "Surgeon at a da Vinci robotic surgery system",
            imageCredit: "Gashriram · CC BY-SA 4.0",
            imageCreditUrl:
                "https://commons.wikimedia.org/wiki/File:Da_Vinci_Surgery.jpg"
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
            image: "images/procedures/robotic-urology.jpg",
            imageAlt: "A robotic surgery system in an operating room",
            imageCredit: "Nimur · CC BY-SA 3.0",
            imageCreditUrl:
                "https://commons.wikimedia.org/wiki/File:Laproscopic_Surgery_Robot.jpg"
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
            image: "images/procedures/renal-transplant.jpg",
            imageAlt: "Hospital care team supporting a recovering patient",
            imageCredit: "Representative clinical photo · Pexels",
            imageCreditUrl:
                "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg"
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
            image: "images/procedures/andrology.jpg",
            imageAlt: "Sperm cell viewed through a microscope",
            imageCredit: "Annulus microscopy, Sperm cell · CC BY 4.0",
            imageCreditUrl:
                "https://commons.wikimedia.org/wiki/File:Annulus_microscopy,_Sperm_cell.jpg"
        }
    };

    const renderSpecialty = (tab) => {
        if (
            !specialtyCopy ||
            !specialtyImage ||
            !specialtyImageWrap ||
            !specialtyImageCredit
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
        specialtyImageCredit.replaceChildren();
        const creditLink = document.createElement("a");
        creditLink.href = specialty.imageCreditUrl;
        creditLink.target = "_blank";
        creditLink.rel = "noopener noreferrer";
        creditLink.textContent = specialty.imageCredit;
        specialtyImageCredit.append(creditLink);
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
    const videoTitle = document.getElementById("patientVideoTitle");
    const videoDescription = document.getElementById("patientVideoDesc");
    const videoStatus = document.getElementById("patientVideoStatus");
    const videoButtons = document.querySelectorAll(".video-playlist-btn");

    if (videoPlayer && videoTitle && videoDescription && videoStatus) {
        videoButtons.forEach((button) => {
            const thumbnail = button.querySelector(".video-playlist-thumb img");

            if (thumbnail) {
                thumbnail.addEventListener("error", () => {
                    thumbnail.hidden = true;
                });
            }

            button.addEventListener("click", () => {
                const videoPath = button.dataset.videoPath;
                const title = button.dataset.title;
                const description = button.dataset.description;

                if (!videoPath || !title || !description) {
                    videoStatus.textContent =
                        "This video is missing its playlist details.";
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
                videoStatus.textContent = "Loading video...";

                videoPlayer.src = videoPath;
                videoPlayer.load();

                const playRequest = videoPlayer.play();

                if (playRequest) {
                    playRequest.catch(() => {
                        videoStatus.textContent =
                            "Unable to play this video. Check that the video file is available and supported.";
                    });
                }
            });
        });

        videoPlayer.addEventListener("error", () => {
            videoStatus.textContent =
                "Video unavailable. Add the selected video file to the videos folder.";
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
                    "Appointment requests are not configured yet. Please call 040-68334455 to book.";
                appointmentFormStatus.className =
                    "form-message error-message";
                appointmentFormStatus.hidden = false;
                return;
            }

            if (!appointmentForm.reportValidity()) {
                return;
            }

            const formData = new FormData(appointmentForm);
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
                        "Your request is taking longer than expected. Please call 040-68334455 to confirm.";
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
                    "We could not confirm your request. Please call 040-68334455 to book.";
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