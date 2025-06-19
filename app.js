
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


const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const servicesGrid = document.querySelector('.services-grid');
const productsGrid = document.querySelector('.products-grid');


let isDarkMode = false;

document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initTheme();
    initNavigation();
    initFormHandling();
    renderServices();
    renderProducts();
    initScrollAnimations();
});


function initLoader() {
    const progressBar = document.querySelector('.loader-progress-bar');
    const counter = document.querySelector('.loader-counter');
    
    let progress = 0;
    let currentNumber = 0;
    
    const loadingInterval = setInterval(() => {
       
        const increment = Math.random() * 15 + 5; 
        progress = Math.min(progress + increment, 100);
        
     
        progressBar.style.width = progress + '%';
       
        const targetNumber = Math.floor(progress);
        if (currentNumber < targetNumber) {
            currentNumber = Math.min(currentNumber + Math.ceil(Math.random() * 3), targetNumber);
        }
        

        counter.textContent = currentNumber.toString().padStart(3, '0');

        if (progress >= 100) {
            clearInterval(loadingInterval);
            
  
            progressBar.style.width = '100%';
            counter.textContent = '100';
           
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.add('visible');
                document.body.style.overflow = 'visible';
            }, 800);
        }
    }, 100);
    

    document.body.style.overflow = 'hidden';
}


function initTheme() {
    themeToggle.addEventListener('click', toggleTheme);

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
    

    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
     
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

function initFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
     
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
  
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function showNotification(message, type = 'info') {

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

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

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
        
        serviceCard.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)';
        });
        
        serviceCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
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
       
        productCard.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(15deg) translateZ(30px)';
        });
        
        productCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0px)';
        });
        
 
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
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(element);
        });
    });
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === themeToggle) {
            e.preventDefault();
            toggleTheme();
        }
    }
});

function optimizePerformance() {

    const cards = document.querySelectorAll('.service-card, .product-card');
    cards.forEach(card => {
        card.style.willChange = 'transform';
        card.style.backfaceVisibility = 'hidden';
    });
}
setTimeout(optimizePerformance, 100);