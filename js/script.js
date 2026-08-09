// ===== Global Variables =====
let currentLang = localStorage.getItem('lang') || 'ar';
let isDarkMode = localStorage.getItem('theme') !== 'light';

// Quiz State (Phases 2 & 3 Smart Recommendation)
let quizAnswers = {};
let currentQuizStep = 1;
const totalQuizSteps = 6;

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeTheme();
    renderComparisonTable();
    renderPlatformCards();
    calculateROI();
    updateQuizUI();

    // Log analytic event (Phase 19 & 20)
    trackEvent('page_view', 'load', 'homepage');
});

// ===== Mobile Hamburger Navigation Menu Toggle (Phase 16) =====
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            trackEvent('navigation', 'mobile_menu_open', 'hamburger');
        } else {
            menu.classList.add('hidden');
            trackEvent('navigation', 'mobile_menu_close', 'hamburger');
        }
    }
}

// ===== Contact Form Mock Submission (Phase 15) =====
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    let contactMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    contactMessages.push({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('contact_messages', JSON.stringify(contactMessages));

    const alertMsg = translations[currentLang]['contact_success_alert'] || 'Mock message sent successfully!';
    alert(alertMsg);
    form.reset();
}

// ===== Language Functions =====
function initializeLanguage() {
    applyLanguage(currentLang);
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    }

    // Rerender all dynamic data based on active language (Phase 18 Data Layer architecture)
    renderComparisonTable();
    renderPlatformCards();
    calculateROI();

    if (document.getElementById('quiz-steps') && document.getElementById('quiz-steps').classList.contains('hidden')) {
        calculateQuizScore();
    } else {
        updateQuizUI();
    }

    trackEvent('language', 'toggle', currentLang);
}

function applyLanguage(lang) {
    // Set HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update font family based on language
    document.body.style.fontFamily = lang === 'ar' 
        ? "'Cairo', sans-serif" 
        : "'Inter', sans-serif";
    
    // Update all static translated elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update dynamic inputs placeholders
    const searchInput = document.getElementById('live-search');
    if (searchInput) {
        searchInput.placeholder = translations[lang]['search_placeholder'] || searchInput.placeholder;
    }

    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.placeholder = lang === 'ar' ? 'بريدك الإلكتروني...' : 'Your Email address...';
    }
}

// ===== Theme Functions =====
function initializeTheme() {
    const themeBtn = document.getElementById('theme-btn');
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '🌙';
    } else {
        if (themeBtn) themeBtn.textContent = '☀️';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const themeBtn = document.getElementById('theme-btn');
    
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        if (themeBtn) themeBtn.textContent = '☀️';
    } else {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '🌙';
    }
    trackEvent('theme', 'toggle', isDarkMode ? 'dark' : 'light');
}

// ===== Render Comparison 2.0 Table (Phase 4 & Phase 18 Centralization) =====
function renderComparisonTable() {
    const tbody = document.getElementById('comparison-table-body');
    if (!tbody || !window.platformsData) return;

    // Define table criteria row mappings
    const criteria = [
      { key: "price", label: "crit_price" },
      { key: "freePlan", label: "crit_free_plan" },
      { key: "easeOfUse", label: "crit_ease_of_use" },
      { key: "integrationsCount", label: "crit_integrations" },
      { key: "webhooks", label: "crit_webhooks" },
      { key: "api", label: "crit_api" },
      { key: "aiFeatures", label: "crit_ai_support" },
      { key: "codeExecution", label: "crit_code_execution" },
      { key: "selfHosting", label: "crit_self_hosting" },
      { key: "flexibility", label: "crit_flexibility" },
      { key: "scalability", label: "crit_scalability" },
      { key: "forBeginnersRating", label: "crit_for_beginners" },
      { key: "forDevelopersRating", label: "crit_for_developers" },
      { key: "forEnterprises", label: "crit_for_enterprises" },
      { key: "privacy", label: "crit_privacy" },
      { key: "bestUse", label: "crit_best_use" }
    ];

    tbody.innerHTML = '';

    criteria.forEach(crit => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/20 transition-colors";

        // Translated Criterion label
        const tdLabel = document.createElement('td');
        tdLabel.className = "py-4 px-6 font-semibold border-b border-slate-800/50";
        tdLabel.textContent = translations[currentLang][crit.label] || crit.key;

        // Platform values
        const tdMake = document.createElement('td');
        tdMake.className = "py-4 px-6 text-slate-300 border-b border-slate-800/50";
        tdMake.textContent = window.platformsData.make.specs[crit.key] ? window.platformsData.make.specs[crit.key][currentLang] : '';

        const tdZapier = document.createElement('td');
        tdZapier.className = "py-4 px-6 text-slate-300 border-b border-slate-800/50";
        tdZapier.textContent = window.platformsData.zapier.specs[crit.key] ? window.platformsData.zapier.specs[crit.key][currentLang] : '';

        const tdN8n = document.createElement('td');
        tdN8n.className = "py-4 px-6 text-slate-300 border-b border-slate-800/50";
        tdN8n.textContent = window.platformsData.n8n.specs[crit.key] ? window.platformsData.n8n.specs[crit.key][currentLang] : '';

        tr.appendChild(tdLabel);
        tr.appendChild(tdMake);
        tr.appendChild(tdZapier);
        tr.appendChild(tdN8n);
        tbody.appendChild(tr);
    });
}

// ===== Render Platform Cards 2.0 (Phase 5 Platform Cards & Phase 11 & Phase 18) =====
function renderPlatformCards() {
    const container = document.getElementById('platform-cards-container');
    if (!container || !window.platformsData) return;

    container.innerHTML = '';

    Object.keys(window.platformsData).forEach(key => {
        const platform = window.platformsData[key];

        // Stars generation helper
        const renderStars = (num) => '★'.repeat(num) + '☆'.repeat(10 - num);

        const card = document.createElement('div');
        // Custom styling colors based on platform key
        let accentBorder = "border-slate-700/60";
        let titleColor = "text-blue-400";
        let btnBg = "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20";
        let ratingUsability = platform.scores.usability;
        let ratingFlexibility = platform.scores.flexibility;

        if (key === 'zapier') {
            accentBorder = "border-purple-500/80 border-2";
            titleColor = "text-purple-400";
            btnBg = "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20";
        } else if (key === 'n8n') {
            titleColor = "text-emerald-400";
            btnBg = "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20";
        }

        card.className = `bg-slate-800/40 ${accentBorder} p-8 rounded-3xl flex flex-col justify-between hover:scale-[1.01] transition-all hover:shadow-xl hover:shadow-blue-500/5 relative`;

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-2xl font-extrabold ${titleColor}">${platform.name}</h3>
                    <span class="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        ${translations[currentLang]['badge_' + key] || ''}
                    </span>
                </div>
                <p class="text-xs text-slate-400 mb-6 leading-relaxed min-h-[40px]">${platform.tagline[currentLang]}</p>

                <div class="space-y-3 mb-6 text-sm">
                    <div class="flex justify-between">
                        <span class="text-slate-400">${translations[currentLang]['card_best_for']}</span>
                        <span class="font-bold text-slate-200">${platform.bestFor[currentLang]}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">${translations[currentLang]['card_usability_rating']}</span>
                        <span class="text-amber-400 font-medium">${renderStars(ratingUsability)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">${translations[currentLang]['card_flexibility_rating']}</span>
                        <span class="text-blue-400 font-medium">${renderStars(ratingFlexibility)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">${translations[currentLang]['card_price_starts']}</span>
                        <span class="font-bold text-slate-100">${platform.specs.price[currentLang]}</span>
                    </div>
                </div>

                <div class="border-t border-slate-800/80 pt-4 mb-6 text-xs space-y-2.5">
                    <div>
                        <span class="font-bold text-emerald-400 block mb-1">✓ ${translations[currentLang]['card_best_feature']}</span>
                        <span class="text-slate-300 leading-relaxed">${platform.mainFeature[currentLang]}</span>
                    </div>
                    <div>
                        <span class="font-bold text-red-400 block mb-1">✗ ${translations[currentLang]['card_worst_con']}</span>
                        <span class="text-slate-400 leading-relaxed">${platform.mainCon[currentLang]}</span>
                    </div>
                </div>

                <div class="border-t border-slate-800/80 pt-4 mb-8">
                    <span class="text-xs font-semibold text-slate-400 block mb-2" data-i18n="card_why_choose">${translations[currentLang]['card_why_choose']}</span>
                    <ul class="space-y-1.5 text-xs text-slate-300">
                        ${platform.pros[currentLang].slice(0, 2).map(pro => `<li>✓ ${pro}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div>
                <a href="${platform.link}" target="_blank" rel="noopener noreferrer" onclick="trackAffiliateClick('${platform.id}')" class="w-full inline-block text-center ${btnBg} text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg text-sm">
                    ${translations[currentLang]['card_cta_btn']} ${platform.name}
                </a>
                <p class="text-slate-500 text-[10px] text-center mt-2" data-i18n="affiliate_disclosure_footer">
                    * قد نحصل على عمولة عند التسجيل دون تكلفة عليك.
                </p>
            </div>
        `;

        container.appendChild(card);
    });
}

// ===== Quiz Logic (Phases 2 & 3 Smart Recommendation) =====
function selectOption(step, value) {
    quizAnswers[step] = value;

    // Custom events (Phase 20)
    if (step === 1) {
        trackEvent('recommendation_started', 'quiz_start', 'q1_beginner');
    }

    if (step < totalQuizSteps) {
        currentQuizStep = step + 1;
        updateQuizUI();
    } else {
        // Quiz complete - calculate and show results
        calculateQuizScore();
        trackEvent('recommendation_completed', 'quiz_finish', 'all_steps_answered');
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

    const quizStepsContainer = document.getElementById('quiz-steps');
    const quizResultsContainer = document.getElementById('quiz-results');
    const quizFooterNavContainer = document.getElementById('quiz-footer-nav');

    if (quizStepsContainer) quizStepsContainer.classList.remove('hidden');
    if (quizResultsContainer) quizResultsContainer.classList.add('hidden');
    if (quizFooterNavContainer) quizFooterNavContainer.classList.remove('hidden');

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
    // SCORING ENGINE (PROPER NON-ARTIFICIAL NORMALIZED SCORE OUT OF 100%)
    // Let's accumulate weighted score matrices per choice.
    // Each question has a max potential value of 5 points.
    // Total potential maximum is 30 points.
    let scores = { make: 0, zapier: 0, n8n: 0 };

    // Q1 (Experience)
    const exp = quizAnswers[1];
    if (exp === 'beginner') {
        scores.zapier += 5;
        scores.make += 2;
        scores.n8n += 0;
    } else if (exp === 'intermediate') {
        scores.make += 5;
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
        scores.zapier += 5;
        scores.make += 3;
        scores.n8n += 1;
    } else if (goal === 'marketing') {
        scores.zapier += 5;
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
        scores.n8n += 4;
        scores.zapier += 1;
    } else if (goal === 'ai') {
        scores.n8n += 5;
        scores.make += 4;
        scores.zapier += 2;
    }

    // Q3 (Budget)
    const budget = quizAnswers[3];
    if (budget === 'free') {
        scores.n8n += 5;
        scores.make += 1;
        scores.zapier += 0;
    } else if (budget === 'low') {
        scores.make += 5;
        scores.n8n += 4;
        scores.zapier += 1;
    } else if (budget === 'medium') {
        scores.make += 5;
        scores.zapier += 4;
        scores.n8n += 2;
    } else if (budget === 'high') {
        scores.zapier += 5;
        scores.make += 4;
        scores.n8n += 2;
    }

    // Q4 (Self-hosting)
    const hosting = quizAnswers[4];
    if (hosting === 'yes') {
        scores.n8n += 5;
        scores.make += 0;
        scores.zapier += 0;
    } else if (hosting === 'no') {
        scores.zapier += 5;
        scores.make += 5;
        scores.n8n += 1;
    } else if (hosting === 'maybe') {
        scores.make += 5;
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
        scores.n8n += 5;
        scores.make += 3;
        scores.zapier += 0;
    }

    // Q6 (Usage size)
    const volume = quizAnswers[6];
    if (volume === 'small') {
        scores.zapier += 5;
        scores.make += 4;
        scores.n8n += 2;
    } else if (volume === 'medium') {
        scores.make += 5;
        scores.zapier += 4;
        scores.n8n += 3;
    } else if (volume === 'large') {
        scores.n8n += 5;
        scores.make += 4;
        scores.zapier += 1;
    }

    // Absolute Maximum theoretical score per platform is 30 points.
    // Calculate normalized Compatibility Score mathematically (0 - 100%)
    const maxPotential = 30;
    let matchPercentages = {
        make: Math.round((scores.make / maxPotential) * 100),
        zapier: Math.round((scores.zapier / maxPotential) * 100),
        n8n: Math.round((scores.n8n / maxPotential) * 100)
    };

    // Sort platforms by compatibility score
    let sortedMatches = Object.keys(matchPercentages).sort((a, b) => matchPercentages[b] - matchPercentages[a]);
    let bestPlatform = sortedMatches[0];
    let secondPlatform = sortedMatches[1];
    let thirdPlatform = sortedMatches[2];

    const activeDetails = window.platformsData[bestPlatform];

    // Determine Match Label Badge
    let scoreVal = matchPercentages[bestPlatform];
    let matchLabel = translations[currentLang]['match_excellent'];
    let badgeColorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (scoreVal >= 90) {
        matchLabel = translations[currentLang]['match_excellent'];
        badgeColorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    } else if (scoreVal >= 75) {
        matchLabel = translations[currentLang]['match_strong'];
        badgeColorClass = "bg-blue-500/10 text-blue-400 border-blue-500/30";
    } else if (scoreVal >= 55) {
        matchLabel = translations[currentLang]['match_good'];
        badgeColorClass = "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
    } else {
        matchLabel = translations[currentLang]['match_moderate'];
        badgeColorClass = "bg-orange-500/10 text-orange-400 border-orange-500/30";
    }

    // Generate Dynamic Recommendation Explanation based on actual inputs (Third Section requirements)
    let winnerExplanation = "";
    let keyFactors = [];
    let customDrawback = "";

    if (bestPlatform === 'zapier') {
        winnerExplanation = currentLang === 'ar'
            ? "اخترنا لك Zapier لأنك تبحث عن حل مرن وسهل الاستخدام للغاية لا يتطلب صيانة خوادم، وتفضل الدعم الأكبر للتطبيقات والربط السريع للمهام اليومية دون كتابة أي كود برمجي."
            : "We recommended Zapier because you prioritize extreme ease of use, zero server maintenance overhead, and want direct linear task integrations with the absolute largest library of apps.";

        // key factors
        if (quizAnswers[1] === 'beginner') {
            keyFactors.push(currentLang === 'ar' ? "تفادي تعقيدات البرمجة ومناسب تماماً للمبتدئين" : "Zero programming overhead fits beginners perfectly");
        }
        if (quizAnswers[4] === 'no') {
            keyFactors.push(currentLang === 'ar' ? "تفضيل الخوادم السحابية المدارة بالكامل دون صيانة" : "Preference for managed cloud solutions without maintenance");
        }
        if (quizAnswers[2] === 'daily' || quizAnswers[2] === 'marketing') {
            keyFactors.push(currentLang === 'ar' ? "الرغبة في إنهاء مهام التسويق والمهام اليومية بسرعة" : "Desire to finish marketing and daily flows with speed");
        }
        keyFactors.push(currentLang === 'ar' ? "توصيل أسرع بفضل مكتبة 5000+ تطبيق" : "Rapid assembly via a 5,000+ app directory");

        customDrawback = currentLang === 'ar'
            ? "المنصة تصبح باهظة الثمن ومكلفة للغاية عند تصاعد عدد العمليات أو رغبتك ببناء تفرعات شرطية معقدة."
            : "The billing becomes highly expensive as execution volume scales, and custom visual logic branches are limited.";

    } else if (bestPlatform === 'make') {
        winnerExplanation = currentLang === 'ar'
            ? "اخترنا لك Make.com لأنك تبحث عن التوازن المثالي بين السعر الاقتصادي والتفرع البصري المعقد، دون التورط في تعقيدات الاستضافة الذاتية للشركات الصغيرة والمتوسطة."
            : "We recommended Make.com because you want the perfect balance of budget efficiency and advanced visual looping/conditional branching without dealing with self-hosted maintenance.";

        if (quizAnswers[3] === 'low' || quizAnswers[3] === 'medium') {
            keyFactors.push(currentLang === 'ar' ? "الحرص على أفضل قيمة اقتصادية مقابل السعر المنخفض" : "Securing the highest value-for-money at a low monthly price");
        }
        if (quizAnswers[2] === 'complex' || quizAnswers[2] === 'ai') {
            keyFactors.push(currentLang === 'ar' ? "الحاجة لبناء سيناريوهات أتمتة وتكرارات مرئية معقدة" : "Need to construct visually complex scenarios and loops");
        }
        if (quizAnswers[5] === 'medium') {
            keyFactors.push(currentLang === 'ar' ? "طلب مرونة متوسطة إلى متقدمة بصرية بالكامل" : "Requirement for moderate-to-high purely visual flexibility");
        }
        keyFactors.push(currentLang === 'ar' ? "محرر مرئي متشعب يسمح برسم المسارات التفاعلية" : "Interactive canvas allowing free mapping of data paths");

        customDrawback = currentLang === 'ar'
            ? "يملك منحنى تعليمي متوسط لفهم هياكل وتنسيقات الـ JSON المعقدة مقارنة بـ Zapier."
            : "It possesses a slightly steeper learning curve to manipulate complex JSON structures than Zapier.";

    } else { // n8n
        winnerExplanation = currentLang === 'ar'
            ? "اخترنا لك n8n لأنك تفضل الخصوصية المطلقة للبيانات، وترغب في استضافة النظام ذاتياً للتخلص من فواتير العمليات السحابية، مع استغلال مهاراتك البرمجية لتخصيص كلي."
            : "We recommended n8n because you prefer absolute data privacy, self-hosting compatibility to eliminate third-party task charges, and have the coding skills for extreme customization.";

        if (quizAnswers[4] === 'yes') {
            keyFactors.push(currentLang === 'ar' ? "تفضيل الخصوصية المطلقة وتخزين البيانات على خادم محلي" : "Preference for total data privacy on your own server");
        }
        if (quizAnswers[1] === 'expert') {
            keyFactors.push(currentLang === 'ar' ? "الاستفادة من مهاراتك في البرمجة وكتابة أكواد مخصصة" : "Leveraging your software engineering and coding expertise");
        }
        if (quizAnswers[3] === 'free' || quizAnswers[6] === 'large') {
            keyFactors.push(currentLang === 'ar' ? "الرغبة في تشغيل عمليات وملايين المهام مجاناً وبدون قيود" : "Desire to run uncapped millions of executions with zero extra costs");
        }
        keyFactors.push(currentLang === 'ar' ? "دعم مدمج لعناصر LangChain لبناء عملاء ووكلاء الذكاء الاصطناعي" : "Native LangChain nodes supporting custom AI Agent models");

        customDrawback = currentLang === 'ar'
            ? "تتطلب صيانة تقنية للخادم لحل انقطاعات docker أو تضخم قواعد البيانات، وعدد تطبيقات الربط المباشر أقل."
            : "Requires server administration to resolve Docker downtime or DB bloat, and features fewer native app connections.";
    }

    // Best Alternative logic
    let alternativeTitle = "";
    let alternativeExplanation = "";
    if (bestPlatform === 'zapier') {
        alternativeTitle = "Make.com";
        alternativeExplanation = currentLang === 'ar'
            ? "البديل الأفضل هو Make.com لأنه يوفر أسعاراً أرخص بكثير، لكنه يتطلب وقتاً أطول للتعلم ومواءمة تدفق البيانات."
            : "The best alternative is Make.com because it is far cheaper, but it will demand a steeper learning curve for your team.";
    } else if (bestPlatform === 'make') {
        alternativeTitle = "n8n.io";
        alternativeExplanation = currentLang === 'ar'
            ? "البديل الأفضل هو n8n.io للتحكم بالخصوصية والاستضافة الذاتية المجانية، ولكنه سيتطلب خبرة برمجية لإدارة الخادم."
            : "The best alternative is n8n.io for total private self-hosting, but it requires server management expertise.";
    } else {
        alternativeTitle = "Make.com";
        alternativeExplanation = currentLang === 'ar'
            ? "البديل الأفضل هو Make.com إذا كنت ترغب بالانتقال للسحابة وتوفير صيانة الخوادم، لكنك ستفقد ميزة الاستضافة المجانية."
            : "The best alternative is Make.com to drop server maintenance overhead, but you will lose free unlimited task self-hosting.";
    }

    // Toggle Quiz container & Results
    const quizSteps = document.getElementById('quiz-steps');
    const quizResults = document.getElementById('quiz-results');
    const quizFooterNav = document.getElementById('quiz-footer-nav');

    if (quizSteps) quizSteps.classList.add('hidden');
    if (quizResults) quizResults.classList.remove('hidden');
    if (quizFooterNav) quizFooterNav.classList.add('hidden');

    // Populate Results UI Elements cleanly
    const bestTitleEl = document.getElementById('best-platform-title');
    const bestPercentEl = document.getElementById('best-match-percent');
    const bestReasonEl = document.getElementById('best-platform-reason');
    const bestLinkEl = document.getElementById('best-platform-link');
    const labelEl = document.getElementById('best-match-label');

    if (bestTitleEl) bestTitleEl.textContent = activeDetails.name;
    if (bestPercentEl) bestPercentEl.textContent = `${scoreVal}%`;
    if (bestReasonEl) bestReasonEl.textContent = winnerExplanation;
    if (bestLinkEl) bestLinkEl.href = activeDetails.link;
    if (labelEl) {
        labelEl.textContent = matchLabel;
        labelEl.className = `inline-block text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${badgeColorClass}`;
    }

    // Key factors UI list
    const factorsUl = document.getElementById('best-platform-factors');
    if (factorsUl) {
        factorsUl.innerHTML = '';
        keyFactors.forEach(factor => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-2.5 text-sm text-slate-300';
            li.innerHTML = `<span class="text-blue-400 font-bold">✓</span> <span>${factor}</span>`;
            factorsUl.appendChild(li);
        });
    }

    // Load Pros dynamically
    const prosUl = document.getElementById('best-platform-pros');
    if (prosUl) {
        prosUl.innerHTML = '';
        activeDetails.pros[currentLang].forEach(proText => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-2.5 text-sm text-emerald-400 font-medium';
            li.innerHTML = `<span>✓</span> <span class="text-slate-300 font-normal">${proText}</span>`;
            prosUl.appendChild(li);
        });
    }

    // Load Cons dynamically
    const consUl = document.getElementById('best-platform-cons');
    if (consUl) {
        consUl.innerHTML = '';
        const liDrawback = document.createElement('li');
        liDrawback.className = 'flex items-start gap-2.5 text-sm text-red-400 font-medium';
        liDrawback.innerHTML = `<span>✗</span> <span class="text-slate-300 font-normal">${customDrawback}</span>`;
        consUl.appendChild(liDrawback);
    }

    // Load Alternative info
    const altTitleEl = document.getElementById('alt-platform-title');
    const altDescEl = document.getElementById('alt-platform-explanation');
    if (altTitleEl) altTitleEl.textContent = alternativeTitle;
    if (altDescEl) altDescEl.textContent = alternativeExplanation;

    // Load Alternatives match percentages list
    const altContainer = document.getElementById('alt-platforms-list');
    if (altContainer) {
        altContainer.innerHTML = '';
        const altList = [secondPlatform, thirdPlatform];
        altList.forEach(platKey => {
            const details = window.platformsData[platKey];
            const percent = matchPercentages[platKey];

            const item = document.createElement('div');
            item.className = 'border-b border-slate-800 pb-3 last:border-0';
            item.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-slate-200 text-sm">${details.name}</span>
                    <span class="text-xs font-bold text-slate-400">${percent}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-blue-500 h-1.5 rounded-full" style="width: ${percent}%"></div>
                </div>
            `;
            altContainer.appendChild(item);
        });
    }

    // Scroll to results cleanly
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
    quizAnswers = {};
    currentQuizStep = 1;
    updateQuizUI();
    trackEvent('recommendation_reset', 'quiz_reset', 'start_over');
}

// ===== ROI Calculator 2.0 Functions (Phases 6 & 7) =====
function calculateROI() {
    // Graceful handling of edge case inputs to prevent NaN or breakages
    const employeesInput = document.getElementById('employees');
    const hoursInput = document.getElementById('hours');
    const costInput = document.getElementById('cost');

    let employees = employeesInput ? parseInt(employeesInput.value) : 10;
    let hoursPerWeek = hoursInput ? parseInt(hoursInput.value) : 8;
    let hourlyRate = costInput ? parseInt(costInput.value) : 25;

    if (isNaN(employees) || employees < 0) employees = 0;
    if (isNaN(hoursPerWeek) || hoursPerWeek < 0) hoursPerWeek = 0;
    if (isNaN(hourlyRate) || hourlyRate < 0) hourlyRate = 0;

    // Constrain extremely high input values to avoid layout damage
    if (employees > 1000000) employees = 1000000;
    if (hoursPerWeek > 168) hoursPerWeek = 168;
    if (hourlyRate > 10000) hourlyRate = 10000;
    
    // Update displayed range values safely
    const valEmp = document.getElementById('val-emp');
    const valHours = document.getElementById('val-hours');
    const valCost = document.getElementById('val-cost');

    if (valEmp) valEmp.textContent = employees.toLocaleString();
    if (valHours) valHours.textContent = hoursPerWeek.toLocaleString();
    if (valCost) valCost.textContent = hourlyRate.toLocaleString();
    
    // Mapping Work Types to dynamic automation suitability rates (Phase 6 ROI 2.0)
    const workTypeSelect = document.getElementById('work-type');
    const workType = workTypeSelect ? workTypeSelect.value : 'customer_service';
    const workTypeAutomationRates = {
        customer_service: 0.60,
        data_entry: 0.85,
        marketing: 0.75,
        sales: 0.70,
        admin: 0.50,
        orders: 0.80,
        email: 0.65
    };

    const automationRate = workTypeAutomationRates[workType] || 0.70;

    // Complete calculations
    const hoursPerMonth = hoursPerWeek * employees * 4.33;
    const savedHours = hoursPerMonth * automationRate;
    const monthlySaving = savedHours * hourlyRate;
    const annualSaving = monthlySaving * 12;
    
    // Update results display safely
    const monthlySavingEl = document.getElementById('monthly-saving');
    const savedHoursEl = document.getElementById('saved-hours');
    const annualSavingEl = document.getElementById('annual-saving');

    if (monthlySavingEl) monthlySavingEl.textContent = `$${Math.round(monthlySaving).toLocaleString()}`;
    if (savedHoursEl) savedHoursEl.textContent = `${Math.round(savedHours).toLocaleString()} ${currentLang === 'ar' ? 'ساعة' : 'hours'}`;
    if (annualSavingEl) annualSavingEl.textContent = `$${Math.round(annualSaving).toLocaleString()}`;

    // Update dynamic sub-text with specific rate
    const subText = document.getElementById('roi-res-sub-text');
    if (subText) {
        subText.textContent = currentLang === 'ar'
            ? `تقدير تقريبي بناءً على نسبة أتمتة تبلغ ${Math.round(automationRate * 100)}% ولا يُقَدّم كضمان مالي.`
            : `Approximate estimation based on an automation rate of ${Math.round(automationRate * 100)}% (not a financial guarantee).`;
    }

    // ROI + Recommendation Output logic (Phase 7 Integration)
    const recBox = document.getElementById('roi-platform-recommendation');
    if (recBox) {
        let recommendationKey = "roi_rec_make";
        const monthlyWorkloadOperations = hoursPerMonth * 60; // rough estimation of task volume

        if (monthlyWorkloadOperations > 15000) {
            recommendationKey = "roi_rec_n8n";
        } else if (employees < 3 && hoursPerWeek < 5) {
            recommendationKey = "roi_rec_zapier";
        } else {
            recommendationKey = "roi_rec_make";
        }

        recBox.innerHTML = translations[currentLang][recommendationKey] || translations[currentLang]['roi_rec_make'];
    }

    trackEvent('roi_calculated', 'calculate', `emp_${employees}_hours_${hoursPerWeek}_cost_${hourlyRate}`);
}

// ===== Live Search Filtering Logic (Phase 17 Search) =====
function handleSearch() {
    const queryEl = document.getElementById('live-search');
    const query = queryEl ? queryEl.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('.scenario-card');

    cards.forEach(card => {
        const keywords = card.getAttribute('data-keywords') || '';
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');

        const title = titleEl ? titleEl.textContent.toLowerCase() : '';
        const desc = descEl ? descEl.textContent.toLowerCase() : '';

        if (keywords.includes(query) || title.includes(query) || desc.includes(query) || query === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    trackEvent('search', 'filter_scenarios', query);
}

// ===== FAQ Functions =====
function toggleFAQ(index) {
    const answer = document.getElementById(`faq-ans-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    if (answer) {
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            if (icon) icon.textContent = '−';
        } else {
            answer.classList.add('hidden');
            if (icon) icon.textContent = '+';
        }
    }
}

// ===== Newsletter subscription with Lead Magnet Trigger (Phases 13 & 14) =====
function handleNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';
    
    // Validate email
    if (!email || !isValidEmail(email)) {
        alert(currentLang === 'ar' 
            ? 'الرجاء إدخال بريد إلكتروني صحيح' 
            : 'Please enter a valid email');
        return;
    }
    
    // simulated subscriber storage
    let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }
    
    // Show Lead Magnet Success Confirmation (Phase 13 & 14)
    alert(translations[currentLang]['newsletter_success'] || 'Subscribed successfully!');

    trackEvent('newsletter_subscribed', 'lead_magnet_download', email);
    
    event.target.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Centralized Affiliate Tracker (Phases 11 & 12 & 19) =====
function trackAffiliateClick(platformId) {
    trackEvent('affiliate_clicked', 'referral', platformId);
}

// ===== Analytics Logger (Phase 19 & Phase 20 Custom Events) =====
function trackEvent(category, action, label) {
    console.log(`[SaaSAutomate Analytics] Category: ${category} | Action: ${action} | Label: ${label}`);

    // Store in browser database for custom audit log
    let analyticsLog = JSON.parse(localStorage.getItem('saasautomate_analytics_events') || '[]');
    analyticsLog.push({
        category,
        action,
        label,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('saasautomate_analytics_events', JSON.stringify(analyticsLog));
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();

            // Close mobile menu if open
            const menu = document.getElementById('mobile-menu');
            if (menu && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }

            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Sticky Background Effect =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    }
});

// ===== Export for Testing =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleLanguage,
        toggleTheme,
        calculateROI,
        toggleFAQ,
        handleNewsletter,
        handleContactForm,
        isValidEmail,
        selectOption,
        prevStep,
        resetQuiz,
        toggleMobileMenu,
        handleSearch,
        trackAffiliateClick,
        trackEvent
    };
}
