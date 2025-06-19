// Application data
const servicesData = [
  {
    "title": "Web Development",
    "description": "Modern responsive websites built with cutting-edge technologies",
    "icon": "🌐"
  },
  {
    "title": "UI/UX Design", 
    "description": "User-centered design solutions that enhance digital experiences",
    "icon": "🎨"
  },
  {
    "title": "Mobile Apps",
    "description": "Native and cross-platform mobile applications",
    "icon": "📱"
  },
  {
    "title": "Brand Identity",
    "description": "Comprehensive branding solutions for modern businesses",
    "icon": "✨"
  }
];

const productsData = [
  {
    "name": "Dashboard Pro",
    "price": "$99",
    "description": "Advanced analytics dashboard"
  },
  {
    "name": "Mobile Kit",
    "price": "$149", 
    "description": "Complete mobile app starter"
  },
  {
    "name": "Design System",
    "price": "$199",
    "description": "Comprehensive design toolkit"
  }
];

// DOM elements
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const servicesGrid = document.querySelector('.services-grid');
const productsGrid = document.querySelector('.products-grid');

// Theme management
let isDarkMode = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initTheme();
    initNavigation();
    initFormHandling();
    renderServices();
    renderProducts();
    initScrollAnimations();
});

// Loader functionality
function initLoader() {
    const progressBar = document.querySelector('.loader-progress-bar');
    const counter = document.querySelector('.loader-counter');
    
    let progress = 0;
    let currentNumber = 0;
    
    const loadingInterval = setInterval(() => {
        // Simulate irregular loading progress
        const increment = Math.random() * 15 + 5; // Random increment between 5-20
        progress = Math.min(progress + increment, 100);
        
        // Update progress bar
        progressBar.style.width = progress + '%';
        
        // Update counter with slight delay for realistic effect
        const targetNumber = Math.floor(progress);
        if (currentNumber < targetNumber) {
            currentNumber = Math.min(currentNumber + Math.ceil(Math.random() * 3), targetNumber);
        }
        
        // Format counter with leading zeros
        counter.textContent = currentNumber.toString().padStart(3, '0');
        
        // Complete loading
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Final update
            progressBar.style.width = '100%';
            counter.textContent = '100';
            
            // Hide loader and show content
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.add('visible');
                document.body.style.overflow = 'visible';
            }, 800);
        }
    }, 100);
    
    // Disable body scroll during loading
    document.body.style.overflow = 'hidden';
}

// Theme toggle functionality
function initTheme() {
    themeToggle.addEventListener('click', toggleTheme);
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    setDarkMode(isDarkMode);
}

function setDarkMode(dark) {
    isDarkMode = dark;
    
    if (dark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
}

// Navigation functionality
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Form handling
function initFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close">&times;</button>
    `;

    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#000' : type === 'error' ? '#000' : '#000'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0;
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        border: 1px solid ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#666'};
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Render services with 3D hover effects
function renderServices() {
    servicesGrid.innerHTML = '';
    
    servicesData.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        
        // Add 3D tilt effect on hover
        serviceCard.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)';
        });
        
        serviceCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        // Add mouse move effect for enhanced 3D
        serviceCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Render products with 3D rotation effects
function renderProducts() {
    productsGrid.innerHTML = '';
    
    productsData.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
        `;
        
        // Add 3D rotation effect on hover
        productCard.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(15deg) translateZ(30px)';
        });
        
        productCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0px)';
        });
        
        // Enhanced mouse tracking for 3D effect
        productCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const centerX = rect.width / 2;
            
            const rotateY = (x - centerX) / centerX * 15;
            
            this.style.transform = `perspective(1000px) rotateY(${rotateY}deg) translateZ(30px)`;
        });
        
        productsGrid.appendChild(productCard);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = [
        '.section-title',
        '.service-card',
        '.product-card',
        '.contact-info',
        '.contact-form'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(element);
        });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === themeToggle) {
            e.preventDefault();
            toggleTheme();
        }
    }
});

// Performance optimization for 3D effects
function optimizePerformance() {
    // Enable hardware acceleration for 3D elements
    const cards = document.querySelectorAll('.service-card, .product-card');
    cards.forEach(card => {
        card.style.willChange = 'transform';
        card.style.backfaceVisibility = 'hidden';
    });
}

// Initialize performance optimizations after content loads
setTimeout(optimizePerformance, 100);