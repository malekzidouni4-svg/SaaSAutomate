// ===== Global Variables =====
let currentLang = localStorage.getItem('lang') || 'ar';
let isDarkMode = localStorage.getItem('theme') !== 'light';

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeTheme();
    calculateROI();
});

// ===== Language Functions =====
function initializeLanguage() {
    applyLanguage(currentLang);
    document.getElementById('lang-btn').textContent = currentLang === 'ar' ? 'EN' : 'AR';
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
    document.getElementById('lang-btn').textContent = currentLang === 'ar' ? 'EN' : 'AR';
}

function applyLanguage(lang) {
    // Set HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update font family based on language
    document.body.style.fontFamily = lang === 'ar' 
        ? "'Cairo', sans-serif" 
        : "'Inter', sans-serif";
    
    // Update all translated elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// ===== Theme Functions =====
function initializeTheme() {
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
        document.getElementById('theme-btn').textContent = '🌙';
    } else {
        document.getElementById('theme-btn').textContent = '☀️';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        document.getElementById('theme-btn').textContent = '☀️';
    } else {
        document.body.classList.add('light-mode');
        document.getElementById('theme-btn').textContent = '🌙';
    }
}

// ===== ROI Calculator Functions =====
function calculateROI() {
    // Get input values
    const employees = parseInt(document.getElementById('employees').value) || 10;
    const hoursPerWeek = parseInt(document.getElementById('hours').value) || 8;
    const hourlyRate = parseInt(document.getElementById('cost').value) || 25;
    
    // Update displayed values
    document.getElementById('val-emp').textContent = employees;
    document.getElementById('val-hours').textContent = hoursPerWeek;
    document.getElementById('val-cost').textContent = hourlyRate;
    
    // Calculations
    const hoursPerMonth = hoursPerWeek * employees * 4.33; // Average weeks per month
    const automationRate = 0.7; // 70% automation
    const savedHours = hoursPerMonth * automationRate;
    const monthlySaving = savedHours * hourlyRate;
    const annualSaving = monthlySaving * 12;
    
    // Update display
    document.getElementById('monthly-saving').textContent = `$${Math.round(monthlySaving).toLocaleString()}`;
    document.getElementById('saved-hours').textContent = `${Math.round(savedHours).toLocaleString()} ${currentLang === 'ar' ? 'ساعة' : 'hours'}`;
    document.getElementById('annual-saving').textContent = `$${Math.round(annualSaving).toLocaleString()}`;
}

// ===== FAQ Functions =====
function toggleFAQ(index) {
    const answer = document.getElementById(`faq-ans-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.textContent = '−';
    } else {
        answer.classList.add('hidden');
        icon.textContent = '+';
    }
}

// ===== Newsletter Functions =====
function handleNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
        alert(currentLang === 'ar' 
            ? 'الرجاء إدخال بريد إلكتروني صحيح' 
            : 'Please enter a valid email');
        return;
    }
    
    // Store in localStorage (in production, send to server)
    let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }
    
    // Show success message
    alert(currentLang === 'ar' 
        ? 'شكراً على الاشتراك! تحقق من بريدك الإلكتروني.' 
        : 'Thank you for subscribing! Check your email.');
    
    event.target.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Sticky Effect =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

// ===== Mobile Menu Toggle (if needed) =====
function setupMobileMenu() {
    // Add mobile menu functionality here if needed
    const navLinks = document.getElementById('nav-links');
    
    // You can add a hamburger menu icon and toggle visibility
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '☰';
    hamburger.className = 'md:hidden text-slate-200 text-xl';
    hamburger.onclick = function() {
        navLinks.classList.toggle('hidden');
    };
}

// ===== Analytics (Optional - Add your own tracking) =====
function trackEvent(category, action, label) {
    // Replace with your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// ===== Performance Optimization =====
// Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ===== Share Functions =====
function shareOnTwitter() {
    const url = window.location.href;
    const text = currentLang === 'ar' 
        ? 'تحقق من أفضل منصات الأتمتة - SaaSAutomate'
        : 'Check out the best automation platforms - SaaSAutomate';
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    trackEvent('share', 'twitter', 'homepage');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    trackEvent('share', 'linkedin', 'homepage');
}

// ===== Contact Form Handler (if you add a contact form) =====
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.querySelector('[name="name"]').value,
        email: event.target.querySelector('[name="email"]').value,
        message: event.target.querySelector('[name="message"]').value,
        timestamp: new Date().toISOString()
    };
    
    // Store locally (in production, send to server/email service)
    let contacts = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    contacts.push(formData);
    localStorage.setItem('contact_submissions', JSON.stringify(contacts));
    
    alert(currentLang === 'ar' 
        ? 'شكراً! سنتواصل معك قريباً.'
        : 'Thank you! We\'ll contact you soon.');
    
    event.target.reset();
}

// ===== Export for Testing =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleLanguage,
        toggleTheme,
        calculateROI,
        toggleFAQ,
        handleNewsletter,
        isValidEmail
    };
}
