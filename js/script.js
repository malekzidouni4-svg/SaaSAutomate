// ===== Global Variables =====
let currentLang = localStorage.getItem('lang') || 'ar';
let isDarkMode = localStorage.getItem('theme') !== 'light';

// Quiz State
let quizAnswers = {};
let currentQuizStep = 1;
const totalQuizSteps = 6;

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeTheme();
    calculateROI();
    updateQuizUI();
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

    // Recalculate ROI and refresh quiz results if visible to match active language
    calculateROI();
    if (document.getElementById('quiz-steps').classList.contains('hidden')) {
        calculateQuizScore();
    }
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

    // Update placeholders if any
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.placeholder = lang === 'ar' ? 'بريدك الإلكتروني' : 'Your Email';
    }

    // Update Quiz progress text
    const progressText = document.getElementById('quiz-progress-text');
    if (progressText && currentQuizStep <= totalQuizSteps) {
        progressText.textContent = lang === 'ar'
            ? `السؤال ${currentQuizStep} من ${totalQuizSteps}`
            : `Question ${currentQuizStep} of ${totalQuizSteps}`;
    }
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

// ===== Quiz Logic (Phase 2 & 3 Smart Recommendation) =====
function selectOption(step, value) {
    quizAnswers[step] = value;

    if (step < totalQuizSteps) {
        currentQuizStep = step + 1;
        updateQuizUI();
    } else {
        // Quiz complete - calculate and show results
        calculateQuizScore();
    }
}

function prevStep() {
    if (currentQuizStep > 1) {
        currentQuizStep--;
        updateQuizUI();
    }
}

function updateQuizUI() {
    // Show current step, hide others
    const steps = document.querySelectorAll('.quiz-step');
    steps.forEach(stepEl => {
        const stepNum = parseInt(stepEl.dataset.step);
        if (stepNum === currentQuizStep) {
            stepEl.classList.remove('hidden');
        } else {
            stepEl.classList.add('hidden');
        }
    });

    // Show/hide Quiz container & Results
    document.getElementById('quiz-steps').classList.remove('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-footer-nav').classList.remove('hidden');

    // Update Progress Bar
    const progressPercent = Math.round(((currentQuizStep) / totalQuizSteps) * 100);
    const progressBar = document.getElementById('quiz-progress-bar');
    const progressPercentText = document.getElementById('quiz-progress-percent');
    const progressText = document.getElementById('quiz-progress-text');

    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (progressPercentText) progressPercentText.textContent = `${progressPercent}%`;
    if (progressText) {
        progressText.textContent = currentLang === 'ar'
            ? `السؤال ${currentQuizStep} من ${totalQuizSteps}`
            : `Question ${currentQuizStep} of ${totalQuizSteps}`;
    }

    // Manage Previous Button Visibility
    const prevBtn = document.getElementById('quiz-prev-btn');
    if (prevBtn) {
        if (currentQuizStep > 1) {
            prevBtn.classList.remove('invisible');
        } else {
            prevBtn.classList.add('invisible');
        }
    }
}

function calculateQuizScore() {
    // Platform Base profiles matching quiz variables
    let scores = { make: 0, zapier: 0, n8n: 0 };

    // Q1 (Experience)
    const exp = quizAnswers[1];
    if (exp === 'beginner') {
        scores.zapier += 4;
        scores.make += 2;
        scores.n8n += 0;
    } else if (exp === 'intermediate') {
        scores.make += 4;
        scores.zapier += 3;
        scores.n8n += 2;
    } else if (exp === 'expert') {
        scores.n8n += 5;
        scores.make += 3;
        scores.zapier += 1;
    }

    // Q2 (Goal)
    const goal = quizAnswers[2];
    if (goal === 'daily') {
        scores.zapier += 4;
        scores.make += 3;
        scores.n8n += 1;
    } else if (goal === 'marketing') {
        scores.zapier += 4;
        scores.make += 4;
        scores.n8n += 1;
    } else if (goal === 'integrations') {
        scores.zapier += 5;
        scores.make += 3;
        scores.n8n += 2;
    } else if (goal === 'data') {
        scores.n8n += 5;
        scores.make += 3;
        scores.zapier += 1;
    } else if (goal === 'complex') {
        scores.make += 5;
        scores.n8n += 5;
        scores.zapier += 1;
    } else if (goal === 'ai') {
        scores.make += 4;
        scores.n8n += 4;
        scores.zapier += 2;
    }

    // Q3 (Budget)
    const budget = quizAnswers[3];
    if (budget === 'free') {
        scores.n8n += 5; // self-hosted is free
        scores.make += 2;
        scores.zapier += 0;
    } else if (budget === 'low') {
        scores.make += 4;
        scores.n8n += 4;
        scores.zapier += 1;
    } else if (budget === 'medium') {
        scores.make += 4;
        scores.zapier += 3;
        scores.n8n += 2;
    } else if (budget === 'high') {
        scores.zapier += 5;
        scores.make += 3;
        scores.n8n += 1;
    }

    // Q4 (Self-hosting)
    const hosting = quizAnswers[4];
    if (hosting === 'yes') {
        scores.n8n += 6;
        scores.make += 0;
        scores.zapier += 0;
    } else if (hosting === 'no') {
        scores.zapier += 4;
        scores.make += 4;
        scores.n8n += 1;
    } else if (hosting === 'maybe') {
        scores.make += 4;
        scores.zapier += 3;
        scores.n8n += 3;
    }

    // Q5 (Control level)
    const control = quizAnswers[5];
    if (control === 'simple') {
        scores.zapier += 5;
        scores.make += 3;
        scores.n8n += 1;
    } else if (control === 'medium') {
        scores.make += 5;
        scores.zapier += 3;
        scores.n8n += 3;
    } else if (control === 'full') {
        scores.n8n += 6;
        scores.make += 3;
        scores.zapier += 0;
    }

    // Q6 (Usage size)
    const volume = quizAnswers[6];
    if (volume === 'small') {
        scores.zapier += 4;
        scores.make += 3;
        scores.n8n += 2;
    } else if (volume === 'medium') {
        scores.make += 4;
        scores.zapier += 3;
        scores.n8n += 3;
    } else if (volume === 'large') {
        scores.n8n += 6;
        scores.make += 4;
        scores.zapier += 1;
    }

    // Determine absolute match percentages (max potential points is around 30)
    const maxScore = 32;
    let matchPercentages = {
        make: Math.min(98, Math.round((scores.make / maxScore) * 100) + 40),
        zapier: Math.min(98, Math.round((scores.zapier / maxScore) * 100) + 40),
        n8n: Math.min(98, Math.round((scores.n8n / maxScore) * 100) + 40)
    };

    // Sort platforms by percentage
    let sortedMatches = Object.keys(matchPercentages).sort((a, b) => matchPercentages[b] - matchPercentages[a]);
    let bestPlatform = sortedMatches[0];
    let secondPlatform = sortedMatches[1];
    let thirdPlatform = sortedMatches[2];

    // Details for each platform
    const platformDetails = {
        make: {
            title: "Make.com",
            link: "https://www.make.com",
            pros: {
                ar: [
                    "✓ واجهة سحب وإفلات بصرية متقدمة وسهلة الفهم",
                    "✓ تكلفة عمليات منخفضة جداً وقيمة ممتازة مقابل السعر",
                    "✓ يدعم بناء سيناريوهات متفرعة ومتشعبة بدون تعقيد برمجى",
                    "✓ دعم قوي للذكاء الاصطناعي وربط مختلف الخدمات السحابية"
                ],
                en: [
                    "✓ Advanced and intuitive drag-and-drop visual workflow builder",
                    "✓ Very low execution costs and extreme value-for-money",
                    "✓ Easily supports building complex multi-branched scenarios",
                    "✓ Solid AI integration capabilities with over 1,000 global apps"
                ]
            },
            reason: {
                ar: "مناسب جداً لاحتياجاتك حيث يوفر التوازن المثالي بين القوة البصرية للواجهة، والتكلفة الاقتصادية الممتازة للعمليات المتكررة، دون الحاجة لخبرة برمجية عميقة.",
                en: "Excellent fit for your needs as it offers the perfect sweet spot between visual ease of building, massive multi-branch capability, and incredibly affordable execution pricing."
            }
        },
        zapier: {
            title: "Zapier",
            link: "https://zapier.com",
            pros: {
                ar: [
                    "✓ أسهل وأبسط أداة للمبتدئين لبدء الأتمتة في ثوانٍ",
                    "✓ يدعم أكبر عدد من التطبيقات عالمياً (أكثر من 5,000 تطبيق)",
                    "✓ لا يحتاج لأي خبرة تقنية أو فهم لهياكل البيانات والمعطيات",
                    "✓ استقرار عالي جداً وموثوقية ممتازة لربط المهام البسيطة"
                ],
                en: [
                    "✓ Easiest and simplest tool for absolute beginners to start in seconds",
                    "✓ Supports the largest directory of apps globally (5,000+ services)",
                    "✓ Zero coding or technical background required",
                    "✓ High reliability and continuous uptime stability for simple zaps"
                ]
            },
            reason: {
                ar: "مناسب لك للغاية نظراً لتركيزك على السهولة الفائقة والربط السريع والمباشر بين تطبيقاتك اليومية المفضلة دون تعقيد أو حاجة للبرمجة.",
                en: "A wonderful match because you prioritize sheer simplicity, quick setup, and need access to the absolute widest ecosystem of applications without coding hassle."
            }
        },
        n8n: {
            title: "n8n.io",
            link: "https://n8n.io",
            pros: {
                ar: [
                    "✓ إمكانية الاستضافة الذاتية (Self-hosted) مجاناً بالكامل",
                    "✓ تحكم مطلق 100% في بياناتك وخصوصيتها وأمنها",
                    "✓ مرونة برمجية كاملة وكتابة كود مخصص (JavaScript/Python)",
                    "✓ تكلفة صفرية تقريباً عند تشغيل ملايين المهام على خادمك"
                ],
                en: [
                    "✓ Completely free to self-host on your own private server",
                    "✓ 100% privacy and complete control over client data security",
                    "✓ Unmatched developer flexibility with custom code nodes",
                    "✓ Near-zero scaling costs when running millions of operations"
                ]
            },
            reason: {
                ar: "الخيار الأفضل للمحترفين والمطورين الذين يبحثون عن التحكم الكامل بأكوادهم وبنية خوادمهم والخصوصية المطلقة للبيانات بأقل تكلفة تشغيلية ممكنة.",
                en: "The ultimate choice for technical developers and teams looking for full private server deployment, deep logical control, custom coding capabilities, and near-zero scaling fees."
            }
        }
    };

    // Update Results UI Elements
    document.getElementById('quiz-steps').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    document.getElementById('quiz-footer-nav').classList.add('hidden');

    const activeDetails = platformDetails[bestPlatform];
    document.getElementById('best-platform-title').textContent = activeDetails.title;
    document.getElementById('best-match-percent').textContent = `${matchPercentages[bestPlatform]}%`;
    document.getElementById('best-platform-reason').textContent = activeDetails.reason[currentLang];
    document.getElementById('best-platform-link').href = activeDetails.link;

    // Update Pros List
    const prosUl = document.getElementById('best-platform-pros');
    prosUl.innerHTML = '';
    activeDetails.pros[currentLang].forEach(proText => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.textContent = proText;
        prosUl.appendChild(li);
    });

    // Update Alternatives
    const altContainer = document.getElementById('alt-platforms-list');
    altContainer.innerHTML = '';

    const altList = [secondPlatform, thirdPlatform];
    altList.forEach(platKey => {
        const details = platformDetails[platKey];
        const percent = matchPercentages[platKey];

        const item = document.createElement('div');
        item.className = 'border-b border-slate-800 pb-3 last:border-0';
        item.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-slate-200">${details.title}</span>
                <span class="text-xs font-bold text-slate-400">${percent}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-slate-500 h-1.5 rounded-full" style="width: ${percent}%"></div>
            </div>
        `;
        altContainer.appendChild(item);
    });

    // Scroll to results cleanly
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
    quizAnswers = {};
    currentQuizStep = 1;
    updateQuizUI();
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
        isValidEmail,
        selectOption,
        prevStep,
        resetQuiz
    };
}
