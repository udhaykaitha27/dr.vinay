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
         * Add database storage or email delivery here.
         * Example:
         * mail('your-email@example.com', 'New Appointment Request', $message);
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
    <title>Dr. Aarav Mehta | Urologist & Andrologist</title>
    <meta name="description" content="Expert urology, kidney stone, prostate and men's health care. Book an appointment with Dr. Aarav Mehta.">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site-header">
    <div class="topbar">
        <div class="container topbar-inner">
            <div class="topbar-item">
                <span class="topbar-icon">☎</span>
                <a href="tel:+919582373383">+91 95823 73383</a>
            </div>

            <div class="topbar-item topbar-hours">
                <span class="topbar-icon">◷</span>
                <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
            </div>

            <a class="topbar-whatsapp" href="https://wa.me/919315158716" target="_blank">
                WhatsApp Consultation
            </a>
        </div>
    </div>

    <div class="navbar">
        <div class="container nav-inner">
            <a href="#home" class="brand">
                <span class="brand-mark">+</span>
                <span>
                    <strong>DR. AARAV MEHTA</strong>
                    <small>UROLOGIST & ANDROLOGIST</small>
                </span>
            </a>

            <button class="menu-toggle" id="menuToggle" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="main-nav" id="mainNav">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#specializations">Specializations</a>
                <a href="#why-us">Why Choose Us</a>
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
                ADVANCED UROLOGY CARE
            </div>

            <h1>
                Expert care for
                <em>better health</em>
                and recovery.
            </h1>

            <p>
                Trusted urology, andrology and minimally invasive surgical care
                designed around your comfort, privacy and long-term wellbeing.
            </p>

            <div class="hero-actions">
                <a href="#appointment" class="button button-primary">
                    Make An Appointment
                    <span>→</span>
                </a>

                <a href="tel:+919582373383" class="button button-outline">
                    Call Now
                </a>
            </div>

            <div class="hero-trust">
                <div class="trust-avatars">
                    <span>AK</span>
                    <span>RS</span>
                    <span>PM</span>
                </div>
                <div>
                    <strong>Trusted by 10,000+ patients</strong>
                    <small>Compassionate care. Advanced expertise.</small>
                </div>
            </div>
        </div>

        <div class="hero-visual reveal">
            <div class="hero-image-frame">
                <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85"
                    alt="Professional male doctor"
                >
            </div>

            <div class="experience-card">
                <span class="experience-number">21+</span>
                <span class="experience-label">Years of<br>Experience</span>
            </div>

            <div class="specialist-card">
                <span class="specialist-icon">✚</span>
                <span>
                    <strong>Specialist Care</strong>
                    <small>Advanced diagnosis</small>
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
                Clinical precision with
                <span>human understanding.</span>
            </h2>

            <p>
                Dr. Aarav Mehta is a senior Urologist, Andrologist and General
                Surgeon with more than two decades of experience in treating
                kidney stones, prostate conditions, urinary disorders and
                men's health concerns.
            </p>

            <p>
                His practice combines evidence-based medicine, advanced
                technology and personal attention to deliver clear diagnosis,
                effective treatment and a comfortable recovery journey.
            </p>

            <a href="#appointment" class="text-link">
                Know More About The Doctor <span>→</span>
            </a>
        </div>
    </div>
</section>

<section class="doctor-section section-padding">
    <div class="container doctor-grid">
        <div class="doctor-image-wrap reveal">
            <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=85"
                alt="Doctor in a medical clinic"
            >
            <div class="doctor-stamp">
                <span>MBBS</span>
                <span>MS</span>
                <span>DNB</span>
            </div>
        </div>

        <div class="doctor-copy reveal">
            <div class="eyebrow">
                <span class="eyebrow-line"></span>
                MEET YOUR SPECIALIST
            </div>

            <h2>Dr. Aarav Mehta</h2>
            <p class="doctor-title">MBBS, MS, DNB - Urology</p>

            <p>
                A patient-focused specialist providing advanced endourology,
                laparoscopic, laser and minimally invasive procedures with
                attention to detail at every stage of care.
            </p>

            <div class="qualification-list">
                <div>
                    <strong>MBBS</strong>
                    <span>Medical education and clinical foundation</span>
                </div>
                <div>
                    <strong>MS</strong>
                    <span>General Surgery</span>
                </div>
                <div>
                    <strong>DNB</strong>
                    <span>Urology and Genito-Urinary Surgery</span>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="stats-section">
    <div class="container stats-grid">
        <div class="stat-item reveal">
            <strong data-count="21">0</strong><span>+</span>
            <small>Years of Experience</small>
        </div>

        <div class="stat-item reveal">
            <strong data-count="10000">0</strong><span>+</span>
            <small>Patients Treated</small>
        </div>

        <div class="stat-item reveal">
            <strong data-count="5000">0</strong><span>+</span>
            <small>Successful Procedures</small>
        </div>

        <div class="stat-item reveal">
            <strong data-count="98">0</strong><span>%</span>
            <small>Patient Satisfaction</small>
        </div>
    </div>
</section>

<section class="services-section section-padding" id="specializations">
    <div class="container">
        <div class="section-heading reveal">
            <div class="section-label">
                <span>02</span>
                AREAS OF EXPERTISE
            </div>

            <h2>Advanced care for<br><span>urological wellbeing.</span></h2>

            <p>
                Comprehensive diagnosis and treatment for common and complex
                urological conditions.
            </p>
        </div>

        <div class="service-grid">
            <article class="service-card reveal">
                <span class="service-number">01</span>
                <div class="service-icon">◈</div>
                <h3>Kidney Stone Treatment</h3>
                <p>Modern laser and minimally invasive treatment options for kidney and urinary stones.</p>
                <a href="#appointment">Learn More →</a>
            </article>

            <article class="service-card service-card-featured reveal">
                <span class="service-number">02</span>
                <div class="service-icon">⌁</div>
                <h3>Prostate Care</h3>
                <p>Diagnosis and personalized treatment for prostate enlargement and related urinary symptoms.</p>
                <a href="#appointment">Learn More →</a>
            </article>

            <article class="service-card reveal">
                <span class="service-number">03</span>
                <div class="service-icon">✚</div>
                <h3>Andrology</h3>
                <p>Confidential, evidence-based care for male infertility and sexual health conditions.</p>
                <a href="#appointment">Learn More →</a>
            </article>

            <article class="service-card reveal">
                <span class="service-number">04</span>
                <div class="service-icon">⌘</div>
                <h3>Laparoscopic Urology</h3>
                <p>Precision-led surgical procedures designed to reduce discomfort and improve recovery.</p>
                <a href="#appointment">Learn More →</a>
            </article>

            <article class="service-card reveal">
                <span class="service-number">05</span>
                <div class="service-icon">◎</div>
                <h3>Ureteric Conditions</h3>
                <p>Specialist evaluation and treatment of urinary tract and ureter-related conditions.</p>
                <a href="#appointment">Learn More →</a>
            </article>

            <article class="service-card reveal">
                <span class="service-number">06</span>
                <div class="service-icon">◇</div>
                <h3>Robotic-Assisted Surgery</h3>
                <p>Advanced surgical technology supporting accuracy, control and faster recovery.</p>
                <a href="#appointment">Learn More →</a>
            </article>
        </div>
    </div>
</section>

<section class="why-section section-padding" id="why-us">
    <div class="container why-grid">
        <div class="why-content reveal">
            <div class="section-label">
                <span>03</span>
                WHY CHOOSE US
            </div>

            <h2>Care that puts<br><span>you first.</span></h2>

            <p>
                Every consultation is built around clear communication,
                appropriate treatment and respect for your individual needs.
            </p>

            <a href="#appointment" class="button button-primary">Schedule A Consultation <span>→</span></a>
        </div>

        <div class="why-list">
            <div class="why-item reveal">
                <span class="why-icon">01</span>
                <div>
                    <h3>Experienced Specialist</h3>
                    <p>More than 21 years of focused clinical and surgical experience.</p>
                </div>
            </div>

            <div class="why-item reveal">
                <span class="why-icon">02</span>
                <div>
                    <h3>Advanced Technology</h3>
                    <p>Modern diagnostic and minimally invasive treatment methods.</p>
                </div>
            </div>

            <div class="why-item reveal">
                <span class="why-icon">03</span>
                <div>
                    <h3>Personalized Treatment</h3>
                    <p>Plans created around your symptoms, diagnosis and recovery goals.</p>
                </div>
            </div>

            <div class="why-item reveal">
                <span class="why-icon">04</span>
                <div>
                    <h3>Confidential Consultations</h3>
                    <p>A respectful and private environment for every patient.</p>
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

            <h2>Trusted by patients<br><span>and their families.</span></h2>
        </div>

        <div class="review-grid">
            <article class="review-card reveal">
                <div class="stars">★★★★★</div>
                <p>
                    “The consultation was detailed, clear and reassuring.
                    The entire treatment process was explained properly.”
                </p>
                <strong>Rajesh K.</strong>
                <small>Verified Patient</small>
            </article>

            <article class="review-card review-card-highlight reveal">
                <div class="stars">★★★★★</div>
                <p>
                    “Professional, patient and very approachable. I am happy
                    with the treatment and recovery.”
                </p>
                <strong>Manish S.</strong>
                <small>Verified Patient</small>
            </article>

            <article class="review-card reveal">
                <div class="stars">★★★★★</div>
                <p>
                    “A very comfortable experience from diagnosis through
                    follow-up. Highly recommended.”
                </p>
                <strong>Vikas R.</strong>
                <small>Verified Patient</small>
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

            <h2>Take the first step toward <span>better health.</span></h2>

            <p>
                Schedule a consultation for expert diagnosis and personalized
                urological care.
            </p>

            <div class="appointment-contact">
                <a href="tel:+919582373383">☎ +91 95823 73383</a>
                <a href="mailto:care@example.com">✉ care@example.com</a>
            </div>
        </div>

        <form class="appointment-form reveal" method="POST" action="#appointment">
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
                    <input type="text" name="name" placeholder="Enter your name" required>
                </label>

                <label>
                    Mobile Number
                    <input type="text" name="phone" placeholder="+91 XXXXX XXXXX" required>
                </label>
            </div>

            <label>
                Email Address
                <input type="email" name="email" placeholder="you@example.com">
            </label>

            <label>
                Select Service
                <select name="service">
                    <option value="">Choose a service</option>
                    <option value="Kidney Stone Treatment">Kidney Stone Treatment</option>
                    <option value="Prostate Care">Prostate Care</option>
                    <option value="Andrology">Andrology</option>
                    <option value="Laparoscopic Urology">Laparoscopic Urology</option>
                    <option value="General Consultation">General Consultation</option>
                </select>
            </label>

            <label>
                Your Message
                <textarea name="message" rows="4" placeholder="Tell us briefly about your concern"></textarea>
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
                <span class="brand-mark">+</span>
                <span>
                    <strong>DR. AARAV MEHTA</strong>
                    <small>UROLOGIST & ANDROLOGIST</small>
                </span>
            </a>

            <p>
                Advanced urological care with clinical expertise,
                compassion and personal attention.
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
            <h3>Services</h3>
            <a href="#specializations">Kidney Stone Treatment</a>
            <a href="#specializations">Prostate Care</a>
            <a href="#specializations">Andrology</a>
            <a href="#specializations">Laparoscopic Urology</a>
            <a href="#specializations">Robotic Surgery</a>
        </div>

        <div class="footer-column footer-contact">
            <h3>Get In Touch</h3>
            <a href="tel:+919582373383">+91 95823 73383</a>
            <a href="mailto:care@example.com">care@example.com</a>
            <p>
                B-1, Medical Care Road,<br>
                New Delhi, India - 110027
            </p>
        </div>
    </div>

    <div class="container footer-bottom">
        <span>© <?php echo date('Y'); ?> Dr. Aarav Mehta. All Rights Reserved.</span>
        <span>Designed for better healthcare experiences.</span>
    </div>
</footer>

<a class="floating-whatsapp" href="https://wa.me/919315158716" target="_blank" aria-label="Chat on WhatsApp">
    <span>◉</span>
</a>

<script src="script.js"></script>
</body>
</html>