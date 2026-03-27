// SRTTC Website JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // ============ Mobile Navigation ============
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Mobile dropdown toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }

    // ============ Hero Slider ============
    const slides = document.querySelectorAll('.slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    if (sliderDots && slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    }

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        showSlide(n);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    // ============ Testimonial Slider ============
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const testimonialPrevBtn = document.querySelector('.testimonial-btn.prev');
    const testimonialNextBtn = document.querySelector('.testimonial-btn.next');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Create testimonial dots
    if (testimonialDots && testimonialSlides.length > 0) {
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDots.appendChild(dot);
        });
    }

    function showTestimonial(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(dot => dot.classList.remove('active'));

        currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentTestimonial].classList.add('active');
        if (dots[currentTestimonial]) {
            dots[currentTestimonial].classList.add('active');
        }
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }

    function goToTestimonial(n) {
        showTestimonial(n);
        resetTestimonialInterval();
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }

    if (testimonialSlides.length > 0) {
        testimonialInterval = setInterval(nextTestimonial, 6000);

        if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetTestimonialInterval();
        });

        if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetTestimonialInterval();
        });
    }

    // ============ Ticker Animation ============
    const tickerItems = document.querySelector('.ticker-items');
    if (tickerItems) {
        // Clone items for seamless loop
        const items = tickerItems.innerHTML;
        tickerItems.innerHTML += items;
    }

    // ============ Scroll to Top Button ============
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============ Smooth Scroll for Anchor Links ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============ Active Navigation Highlight ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============ Lazy Loading Images ============
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ============ Prevent External Link Redirect ============
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // ============ Form Validation (if exists on page) ============
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#DC3545';
                } else {
                    input.style.borderColor = '#DEE2E6';
                }
            });

            if (isValid) {
                alert('Thank you for your enquiry! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // ============ Add Loading Animation on Page Load ============
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

});
