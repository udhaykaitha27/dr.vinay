<?php
$successMessage = '';
$errorMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if ($name === '' || $phone === '') {
        $errorMessage = 'Please enter your name and mobile number.';
    } elseif (!preg_match('/^[0-9+\-\s()]{8,20}$/', $phone)) {
        $errorMessage = 'Please enter a valid mobile number.';
    } elseif ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = 'Please enter a valid email address.';
    } else {
        /*
         * Add secure database storage, SMTP email delivery,
         * Medicover appointment API, or a trusted form service here.
         *
         * This example only displays a success message.
         */

        $successMessage = 'Thank you. Your appointment request has been received.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dr. Vinay Ausekar | Senior Consultant Urologist | Medicover Hospitals</title>

    <meta
        name="description"
        content="Consult Dr. Vinay Ausekar, Senior Consultant Urologist at Medicover Hospitals, Financial District, Hyderabad. Expertise in kidney stones, uro-oncology, robotic surgery, renal transplant and andrology."
    >

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site-header">
    <div class="topbar">
        <div class="container topbar-inner">
            <div class="topbar-item">
                <span class="topbar-icon">☎</span>
                <a href="tel:04068334455">040-68334455</a>
            </div>

            <div class="topbar-item topbar-hours">
                <span class="topbar-icon">◷</span>
                <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
            </div>

            <a
                class="topbar-whatsapp"
                href="https://wa.me/917075493806"
                target="_blank"
                rel="noopener"
            >
                WhatsApp Consultation
            </a>
        </div>
    </div>

    <div class="navbar">
        <div class="container nav-inner">
            <a href="#home" class="brand">
                <img
                    class="medicover-logo"
                    src="images/medicover-logo.png"
                    alt="Medicover Hospitals"
                >

                <span class="brand-divider"></span>

                <span class="brand-doctor">
                    <strong>DR. VINAY AUSEKAR</strong>
                    <small>SENIOR CONSULTANT UROLOGIST</small>
                </span>
            </a>

            <button
                class="menu-toggle"
                id="menuToggle"
                aria-label="Open menu"
                aria-expanded="false"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="main-nav" id="mainNav">
                <a href="#home">Home</a>
                <a href="#about">About Doctor</a>
                <a href="#specializations">Specializations</a>
                <a href="#why-us">Why Medicover</a>
                <a href="#reviews">Reviews</a>
                <a href="#contact">Contact</a>
                <a href="#appointment" class="nav-button">Book Appointment</a>
            </nav>
        </div>
    </div>
</header>

<main>

<section class="hero" id="home">
    <div class="hero-glow hero-glow-one"></div>
    <div class="hero-glow hero-glow-two"></div>

    <div class="container hero-grid">
        <div class="hero-content reveal">
            <div class="eyebrow">
                <span class="eyebrow-line"></span>
                MEDICOVER HOSPITALS
            </div>

            <h1>
                Advanced urology care
                for <em>better health.</em>
            </h1>

            <p>
                Consult Dr. Vinay Ausekar, Senior Consultant Urologist at
                Medicover Hospitals, Financial District, Hyderabad.
            </p>

            <div class="hero-actions">
                <a href="#appointment" class="button button-primary">
                    Book An Appointment
                    <span>→</span>
                </a>

                <a href="tel:04068334455" class="button button-outline">
                    Call Medicover
                </a>
            </div>

            <div class="hero-trust">
                <div class="trust-badge">M</div>

                <div>
                    <strong>Patient-focused urological care</strong>
                    <small>Modern diagnosis. Advanced treatment. Trusted care.</small>
                </div>
            </div>
        </div>

        <div class="hero-visual reveal">
            <div class="hero-image-frame">
                <img
                    src="images/dr-vinay-ausekar.png"
                    alt="Dr. Vinay Ausekar, Senior Consultant Urologist"
                >
            </div>

            <div class="experience-card">
                <span class="experience-number">6+</span>

                <span class="experience-label">
                    Years of<br>
                    Experience
                </span>
            </div>

            <div class="specialist-card">
                <span class="specialist-icon">✚</span>

                <span>
                    <strong>Senior Consultant</strong>
                    <small>Urologist</small>
                </span>
            </div>
        </div>
    </div>
</section>

<section class="intro-section section-padding" id="about">
    <div class="container intro-grid">
        <div class="section-label reveal">
            <span>01</span>
            ABOUT THE DOCTOR
        </div>

        <div class="intro-content reveal">
            <h2>
                Experience, precision and
                <span>personalised urology care.</span>
            </h2>

            <p>
                Dr. Vinay Ausekar is a Senior Consultant Urologist at
                Medicover Hospitals, Financial District, Hyderabad. He
                provides comprehensive care for kidney stones, prostate
                conditions, urinary disorders, urological cancers and
                men's health concerns.
            </p>

            <p>
                His clinical expertise includes endourology, laparoscopic and
                robotic urology, uro-oncology, renal transplantation,
                reconstructive urology and andrology.
            </p>

            <a href="#appointment" class="text-link">
                Book A Consultation <span>→</span>
            </a>
        </div>
    </div>
</section>

<section class="doctor-section section-padding">
    <div class="container doctor-grid">
        <div class="doctor-image-wrap reveal">
            <img
                src="images/dr-vinay-ausekar.png"
                alt="Dr. Vinay Ausekar at Medicover Hospitals"
            >

            <div class="doctor-stamp">
                <span>MBBS</span>
                <span>MS</span>
                <span>MCh</span>
            </div>
        </div>

        <div class="doctor-copy reveal">
            <div class="eyebrow">
                <span class="eyebrow-line"></span>
                MEET YOUR SPECIALIST
            </div>

            <h2>Dr. Vinay Ausekar</h2>

            <p class="doctor-title">
                MBBS, MS (General Surgery), MCh (Urology)
            </p>

            <p>
                Dr. Vinay Ausekar is a Senior Consultant Urologist offering
                advanced and minimally invasive treatment for a broad range
                of urological conditions.
            </p>

            <div class="qualification-list">
                <div>
                    <strong>MBBS</strong>
                    <span>Medical qualification</span>
                </div>

                <div>
                    <strong>MS</strong>
                    <span>General Surgery</span>
                </div>

                <div>
                    <strong>MCh</strong>
                    <span>Urology</span>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="stats-section">
    <div class="container stats-grid">
        <div class="stat-item reveal">
            <strong data-count="6">0</strong>
            <span>+</span>
            <small>Years of Experience</small>
        </div>

        <div class="stat-item reveal">
            <strong>₹1000</strong>
            <small>Consultation Fee</small>
        </div>

        <div class="stat-item reveal">
            <strong>93</strong>
            <span>%</span>
            <small>Patient Rating</small>
        </div>

        <div class="stat-item reveal">
            <strong>6</strong>
            <span>+</span>
            <small>Specialist Treatment Areas</small>
        </div>
    </div>
</section>

<section class="specialties-section section-padding" id="specializations">
    <div class="container">
        <div class="specialties-heading reveal">
            <div class="section-label">
                <span>02</span>
                AREAS OF EXPERTISE
            </div>

            <h2>
                Advanced care for
                <span>urological wellbeing.</span>
            </h2>
        </div>

        <div class="specialties-layout">
            <div class="specialty-tabs">
                <button class="specialty-tab active" type="button">
                    <span>◈</span>
                    Kidney Stone Treatment
                </button>

                <button class="specialty-tab" type="button">
                    <span>⌁</span>
                    Prostate Care
                </button>

                <button class="specialty-tab" type="button">
                    <span>✚</span>
                    Uro-Oncology
                </button>

                <button class="specialty-tab" type="button">
                    <span>◇</span>
                    Robotic &amp; Laparoscopic Urology
                </button>

                <button class="specialty-tab" type="button">
                    <span>◎</span>
                    Renal Transplant
                </button>

                <button class="specialty-tab" type="button">
                    <span>⌘</span>
                    Andrology &amp; Men's Health
                </button>
            </div>

            <div class="specialty-description">
                <p>
                    Dr. Vinay Ausekar provides comprehensive urological care
                    using modern diagnostic methods and minimally invasive
                    treatment techniques at Medicover Hospitals.
                </p>

                <ul>
                    <li>
                        <strong>Kidney Stone Care:</strong>
                        URSL, RIRS, PCNL and laser lithotripsy.
                    </li>

                    <li>
                        <strong>Prostate Treatment:</strong>
                        Care for enlarged prostate, TURP and laser procedures.
                    </li>

                    <li>
                        <strong>Uro-Oncology:</strong>
                        Treatment for kidney, bladder and prostate cancers.
                    </li>

                    <li>
                        <strong>Advanced Surgery:</strong>
                        Laparoscopic and robotic-assisted procedures.
                    </li>

                    <li>
                        <strong>Specialised Urology:</strong>
                        Renal transplant, reconstructive urology and andrology.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section class="why-section section-padding" id="why-us">
    <div class="container why-grid">
        <div class="why-content reveal">
            <div class="section-label">
                <span>03</span>
                WHY CHOOSE MEDICOVER
            </div>

            <h2>
                Trusted care with
                <span>advanced expertise.</span>
            </h2>

            <p>
                From diagnosis to treatment and follow-up, patients receive
                coordinated care supported by modern hospital facilities and
                experienced specialists.
            </p>

            <a href="#appointment" class="button button-primary">
                Schedule A Consultation <span>→</span>
            </a>
        </div>

        <div class="why-list">
            <div class="why-item reveal">
                <span class="why-icon">01</span>

                <div>
                    <h3>Experienced Urologist</h3>
                    <p>
                        Specialised care by Dr. Vinay Ausekar, Senior Consultant
                        Urologist.
                    </p>
                </div>
            </div>

            <div class="why-item reveal">
                <span class="why-icon">02</span>

                <div>
                    <h3>Advanced Procedures</h3>
                    <p>
                        Access to minimally invasive, laparoscopic and robotic
                        procedures.
                    </p>
                </div>
            </div>

            <div class="why-item reveal">
                <span class="why-icon">03</span>

                <div>
                    <h3>Comprehensive Treatment</h3>
                    <p>
                        Care for stones, prostate conditions, cancers,
                        transplant and andrology.
                    </p>
                </div>
            </div>

            <div class="why-item reveal">
                <span class="why-icon">04</span>

                <div>
                    <h3>Convenient Location</h3>
                    <p>
                        Medicover Hospital, Financial District, Nanakramguda,
                        Hyderabad.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="reviews-section section-padding" id="reviews">
    <div class="container">
        <div class="section-heading centered reveal">
            <div class="section-label">
                <span>04</span>
                PATIENT EXPERIENCES
            </div>

            <h2>
                Trusted by patients
                <br>
                <span>and their families.</span>
            </h2>
        </div>

        <div class="review-grid">
            <article class="review-card reveal">
                <div class="stars">★★★★★</div>

                <p>
                    “The consultation was detailed, clear and reassuring.
                    The entire treatment process was explained properly.”
                </p>

                <strong>Rajesh K.</strong>
                <small>Patient Review</small>
            </article>

            <article class="review-card review-card-highlight reveal">
                <div class="stars">★★★★★</div>

                <p>
                    “Professional, patient and very approachable. I am happy
                    with the treatment and recovery.”
                </p>

                <strong>Manish S.</strong>
                <small>Patient Review</small>
            </article>

            <article class="review-card reveal">
                <div class="stars">★★★★★</div>

                <p>
                    “A very comfortable experience from diagnosis through
                    follow-up. Highly recommended.”
                </p>

                <strong>Vikas R.</strong>
                <small>Patient Review</small>
            </article>
        </div>
    </div>
</section>

<section class="appointment-section section-padding" id="appointment">
    <div class="container appointment-grid">
        <div class="appointment-copy reveal">
            <div class="section-label">
                <span>05</span>
                BOOK YOUR VISIT
            </div>

            <h2>
                Take the first step toward
                <span>better urological health.</span>
            </h2>

            <p>
                Book a consultation with Dr. Vinay Ausekar at Medicover
                Hospitals, Financial District, Hyderabad.
            </p>

            <div class="appointment-contact">
                <a href="tel:04068334455">☎ 040-68334455</a>

                <a href="mailto:info@medicoverhospitals.in">
                    ✉ info@medicoverhospitals.in
                </a>
            </div>
        </div>

        <form
            class="appointment-form reveal"
            method="POST"
            action="#appointment"
        >
            <?php if ($successMessage): ?>
                <div class="form-message success-message">
                    <?php echo htmlspecialchars($successMessage); ?>
                </div>
            <?php endif; ?>

            <?php if ($errorMessage): ?>
                <div class="form-message error-message">
                    <?php echo htmlspecialchars($errorMessage); ?>
                </div>
            <?php endif; ?>

            <div class="form-row">
                <label>
                    Your Name

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                    >
                </label>

                <label>
                    Mobile Number

                    <input
                        type="text"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        required
                    >
                </label>
            </div>

            <label>
                Email Address

                <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                >
            </label>

            <label>
                Select Service

                <select name="service">
                    <option value="">Choose a service</option>
                    <option value="Kidney Stone Treatment">
                        Kidney Stone Treatment
                    </option>
                    <option value="Prostate Care">
                        Prostate Care
                    </option>
                    <option value="Uro-Oncology">
                        Uro-Oncology
                    </option>
                    <option value="Robotic and Laparoscopic Urology">
                        Robotic and Laparoscopic Urology
                    </option>
                    <option value="Renal Transplant">
                        Renal Transplant
                    </option>
                    <option value="Andrology and Men's Health">
                        Andrology and Men's Health
                    </option>
                    <option value="General Consultation">
                        General Consultation
                    </option>
                </select>
            </label>

            <label>
                Your Message

                <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us briefly about your concern"
                ></textarea>
            </label>

            <button type="submit" class="button button-primary form-button">
                Send Appointment Request <span>→</span>
            </button>

            <small class="form-note">
                Your information is kept private and used only to contact you.
            </small>
        </form>
    </div>
</section>

</main>

<footer class="site-footer" id="contact">
    <div class="container footer-grid">
        <div class="footer-brand">
            <a href="#home" class="brand">
                <img
                    class="medicover-logo"
                    src="images/medicover-logo.png"
                    alt="Medicover Hospitals"
                >
            </a>

            <p>
                Advanced urological care at Medicover Hospitals with modern
                technology, experienced specialists and patient-focused
                treatment.
            </p>
        </div>

        <div class="footer-column">
            <h3>Useful Links</h3>

            <a href="#home">Home</a>
            <a href="#about">About Doctor</a>
            <a href="#specializations">Specializations</a>
            <a href="#reviews">Patient Reviews</a>
            <a href="#appointment">Book Appointment</a>
        </div>

        <div class="footer-column">
            <h3>Specialist Services</h3>

            <a href="#specializations">Kidney Stone Treatment</a>
            <a href="#specializations">Prostate Care</a>
            <a href="#specializations">Uro-Oncology</a>
            <a href="#specializations">Robotic Surgery</a>
            <a href="#specializations">Renal Transplant</a>
        </div>

        <div class="footer-column footer-contact">
            <h3>Get In Touch</h3>

            <a href="tel:04068334455">040-68334455</a>

            <a href="mailto:info@medicoverhospitals.in">
                info@medicoverhospitals.in
            </a>

            <p>
                Medicover Hospital,<br>
                Myscape Road, Beside The District Building,<br>
                Financial District, Nanakramguda,<br>
                Hyderabad, Telangana - 500032
            </p>
        </div>
    </div>

    <div class="container footer-bottom">
        <span>
            © <?php echo date('Y'); ?> Medicover Hospitals. All Rights Reserved.
        </span>

        <span>
            Dr. Vinay Ausekar | Senior Consultant Urologist
        </span>
    </div>
</footer>

<a
    class="floating-whatsapp"
    href="https://wa.me/917075493806"
    target="_blank"
    rel="noopener"
    aria-label="Chat on WhatsApp"
>
    <span>◉</span>
</a>

<script src="script.js"></script>
</body>
</html>