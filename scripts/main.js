        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        // Create particles periodically
        setInterval(createParticle, 300);

        // Projects Carousel functionality
        let currentSlide = 0;
        const totalSlides = 3;
        const track = document.getElementById('projectsTrack');
        const indicators = document.querySelectorAll('.indicator');

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function changeSlide(direction) {
            currentSlide += direction;
            if (currentSlide >= totalSlides) currentSlide = 0;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            updateCarousel();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        // Auto-advance carousel
        setInterval(() => {
            changeSlide(1);
        }, 5000);

        // Make functions global for button onclick
        window.changeSlide = changeSlide;
        window.goToSlide = goToSlide;

        // Add active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Animated Particle Background
        const particlesContainer = document.querySelector('.particles-container');
        function createBackgroundParticle() {
            const particle = document.createElement('span');
            particle.className = 'background-particle';
            // Use a minimal hexagon SVG
            const size = Math.random() * 12 + 10;
            particle.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#00bcd4" stroke-width="1.5" fill="#00bcd4" fill-opacity="0.18"/></svg>`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            // Random horizontal position
            particle.style.left = `${Math.random() * 100}%`;
            // Random animation duration between 5s and 12s
            const duration = Math.random() * 7 + 5;
            particle.style.animationDuration = `${duration}s`;
            // Random delay
            particle.style.animationDelay = `${Math.random() * 3}s`;
            // Random horizontal drift
            const randomX = `${Math.random() * 200 - 100}px`;
            particle.style.setProperty('--random-x', randomX);
            particlesContainer.appendChild(particle);
            setTimeout(() => {
                particle.remove();
            }, (duration + 3) * 1000);
        }
        setInterval(createBackgroundParticle, 250);

        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * 8; // max 8deg
                const rotateY = ((x - centerX) / centerX) * -8;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
                card.classList.add('tilted');
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.classList.remove('tilted');
            });
        });

        // Pricing Modal Popup
        const modalOverlay = document.getElementById('modalOverlay');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        document.querySelectorAll('.pricing-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modalOverlay.classList.add('active');
            });
        });
        modalCloseBtn.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
        });
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });

        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });