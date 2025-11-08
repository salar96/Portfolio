// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add animation CSS class
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-category, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .project-card.animate-in, .skill-category.animate-in, .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #00ff41 !important;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #00ff41;
        box-shadow: 0 0 5px #00ff41;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add smooth reveal animations for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        const increment = finalNumber / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                stat.textContent = finalNumber + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Matrix rain effect for hero section
function createMatrixRain() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    canvas.style.zIndex = '0';
    
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
}

// Initialize matrix effect
createMatrixRain();

// Projects Carousel
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('carouselIndicators');

if (carouselTrack && prevBtn && nextBtn) {
    const slides = document.querySelectorAll('.project-slide');
    let currentIndex = 0;
    
    // Create indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < slides.length; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position and active state
    function updateCarousel() {
        if (slides.length === 0) return;
        
        const slideWidth = slides[0].offsetWidth;
        const gap = 32; // 2rem gap
        const moveDistance = slideWidth + gap;
        const offset = -(currentIndex * moveDistance);
        
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = slides.length - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        const maxIndex = slides.length - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Initialize
    createIndicators();
    updateCarousel();
    
    // Re-calculate on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 100);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
}