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
    calculateCostSimulation();
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

    // Rerender all dynamic data based on active language (Phase 18 Data Layer architecture)
    renderComparisonTable();
    renderPlatformCards();
    calculateROI();
    calculateCostSimulation();

    if (document.getElementById('quiz-steps').classList.contains('hidden')) {
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
        tdMake.textContent = window.platformsData.make.specs[crit.key][currentLang];

        const tdZapier = document.createElement('td');
        tdZapier.className = "py-4 px-6 text-slate-300 border-b border-slate-800/50";
        tdZapier.textContent = window.platformsData.zapier.specs[crit.key][currentLang];

        const tdN8n = document.createElement('td');
        tdN8n.className = "py-4 px-6 text-slate-300 border-b border-slate-800/50";
        tdN8n.textContent = window.platformsData.n8n.specs[crit.key][currentLang];

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

// ===== Quiz Logic (Phase 2 & 3 Smart Recommendation) =====
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
    // Scoring engine (Phase 2 Scoring algorithm)
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
        scores.n8n += 5;
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

    // Determine absolute match percentages (max potential points is 32)
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

    const activeDetails = window.platformsData[bestPlatform];

    // Update Results UI Elements (Phases 3 & 25 details)
    document.getElementById('quiz-steps').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    document.getElementById('quiz-footer-nav').classList.add('hidden');

    document.getElementById('best-platform-title').textContent = activeDetails.name;
    document.getElementById('best-match-percent').textContent = `${matchPercentages[bestPlatform]}%`;
    document.getElementById('best-platform-reason').textContent = activeDetails.tagline[currentLang];
    document.getElementById('best-platform-link').href = activeDetails.link;

    // Load Pros dynamically
    const prosUl = document.getElementById('best-platform-pros');
    prosUl.innerHTML = '';
    activeDetails.pros[currentLang].forEach(proText => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.textContent = proText;
        prosUl.appendChild(li);
    });

    // Load Cons dynamically
    const consUl = document.getElementById('best-platform-cons');
    consUl.innerHTML = '';
    activeDetails.cons[currentLang].forEach(conText => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 text-slate-400';
        li.textContent = `✗ ${conText}`;
        consUl.appendChild(li);
    });

    // Load Alternatives match percentages list
    const altContainer = document.getElementById('alt-platforms-list');
    altContainer.innerHTML = '';

    const altList = [secondPlatform, thirdPlatform];
    altList.forEach(platKey => {
        const details = window.platformsData[platKey];
        const percent = matchPercentages[platKey];

        const item = document.createElement('div');
        item.className = 'border-b border-slate-800 pb-3 last:border-0';
        item.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-slate-200">${details.name}</span>
                <span class="text-xs font-bold text-slate-400">${percent}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-blue-500 h-1.5 rounded-full" style="width: ${percent}%"></div>
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
    trackEvent('recommendation_reset', 'quiz_reset', 'start_over');
}

// ===== ROI Calculator 2.0 Functions (Phases 6 & 7) =====
function calculateROI() {
    // Get inputs
    const employees = parseInt(document.getElementById('employees').value) || 10;
    const hoursPerWeek = parseInt(document.getElementById('hours').value) || 8;
    const hourlyRate = parseInt(document.getElementById('cost').value) || 25;
    const workType = document.getElementById('work-type').value || 'customer_service';
    
    // Update displayed range values
    document.getElementById('val-emp').textContent = employees;
    document.getElementById('val-hours').textContent = hoursPerWeek;
    document.getElementById('val-cost').textContent = hourlyRate;
    
    // Mapping Work Types to dynamic automation suitability rates (Phase 6 ROI 2.0)
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
    
    // Update results display
    document.getElementById('monthly-saving').textContent = `$${Math.round(monthlySaving).toLocaleString()}`;
    document.getElementById('saved-hours').textContent = `${Math.round(savedHours).toLocaleString()} ${currentLang === 'ar' ? 'ساعة' : 'hours'}`;
    document.getElementById('annual-saving').textContent = `$${Math.round(annualSaving).toLocaleString()}`;

    // Update dynamic sub-text with specific rate
    const subText = document.getElementById('roi-res-sub-text');
    if (subText) {
        subText.textContent = currentLang === 'ar'
            ? `بناءً على نسبة أتمتة مخصصة لعملك تبلغ ${Math.round(automationRate * 100)}%.`
            : `Based on a customized automation rate of ${Math.round(automationRate * 100)}% for your department.`;
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

// ===== Cost Simulator Logic =====
function calculateCostSimulation() {
    const slider = document.getElementById('task-volume');
    if (!slider) return;

    const tasks = parseInt(slider.value) || 10000;
    const taskValDisplay = document.getElementById('sim-task-val');
    if (taskValDisplay) {
        taskValDisplay.textContent = tasks.toLocaleString();
    }

    // Cost calculations based on platform pricing tiers (2026 data)
    let makeCost = 0;
    if (tasks <= 1000) makeCost = 0;
    else if (tasks <= 10000) makeCost = 9;
    else if (tasks <= 40000) makeCost = 29;
    else if (tasks <= 80000) makeCost = 53;
    else if (tasks <= 150000) makeCost = 120;
    else makeCost = Math.round(120 + (tasks - 150000) * 0.0008);

    let zapierCost = 0;
    if (tasks <= 100) zapierCost = 0;
    else if (tasks <= 750) zapierCost = 20;
    else if (tasks <= 2000) zapierCost = 49;
    else if (tasks <= 5000) zapierCost = 89;
    else if (tasks <= 10000) zapierCost = 129;
    else if (tasks <= 50000) zapierCost = 299;
    else if (tasks <= 100000) zapierCost = 599;
    else zapierCost = Math.round(599 + (tasks - 100000) * 0.003);

    let n8nCloudCost = 0;
    if (tasks <= 2500) n8nCloudCost = 22;
    else if (tasks <= 10000) n8nCloudCost = 55;
    else if (tasks <= 50000) n8nCloudCost = 132;
    else n8nCloudCost = Math.round(132 + (tasks - 50000) * 0.002);

    const n8nSelfCost = 0; // Self-hosted community edition is 100% free

    // Update displays
    document.getElementById('sim-cost-make').textContent = makeCost === 0 ? (currentLang === 'ar' ? 'مجاني' : 'Free') : `$${makeCost} / ${currentLang === 'ar' ? 'شهر' : 'mo'}`;
    document.getElementById('sim-cost-zapier').textContent = zapierCost === 0 ? (currentLang === 'ar' ? 'مجاني' : 'Free') : `$${zapierCost} / ${currentLang === 'ar' ? 'شهر' : 'mo'}`;
    document.getElementById('sim-cost-n8n-cloud').textContent = `$${n8nCloudCost} / ${currentLang === 'ar' ? 'شهر' : 'mo'}`;
    document.getElementById('sim-cost-n8n-self').textContent = `$0 / ${currentLang === 'ar' ? 'شهر' : 'mo'}`;

    // Highlight cheapest cloud option
    const maxCloud = Math.max(makeCost, zapierCost, n8nCloudCost);
    const minCloud = Math.min(makeCost, zapierCost, n8nCloudCost);
    const monthlyDiff = maxCloud - minCloud;

    document.getElementById('sim-diff-amount').textContent = `$${monthlyDiff.toLocaleString()} / ${currentLang === 'ar' ? 'شهر' : 'mo'}`;

    const simRec = document.getElementById('sim-cheapest-recommendation');
    if (simRec) {
        if (tasks >= 50000) {
            simRec.innerHTML = currentLang === 'ar'
                ? `<b>n8n (الاستضافة الذاتية)</b> هو الخيار الذكي الموفر جداً لهذا الحجم الضخم، يليه <b>Make.com</b> كخيار سحابي اقتصادي.`
                : `<b>n8n (Self-Hosted)</b> is the ultimate money saver for high volumes, followed by <b>Make.com</b> as the best value cloud option.`;
        } else {
            simRec.innerHTML = currentLang === 'ar'
                ? `<b>Make.com</b> يقدم القيمة الأفضل والأنسب لمستويات الاستخدام السحابية مقارنة بـ Zapier.`
                : `<b>Make.com</b> offers the absolute best cloud value-for-money compared to Zapier.`;
        }
    }

    trackEvent('cost_simulation', 'calculate', `tasks_${tasks}`);
}

// ===== Print / Export Summary Function =====
function printSummaryReport() {
    window.print();
    trackEvent('report', 'print_export', 'summary_report');
}

// ===== Live Search Filtering Logic (Phase 17 Search) =====
function handleSearch() {
    const query = document.getElementById('live-search').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.scenario-card');

    cards.forEach(card => {
        const keywords = card.getAttribute('data-keywords') || '';
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();

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
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.textContent = '−';
    } else {
        answer.classList.add('hidden');
        icon.textContent = '+';
    }
}

// ===== Newsletter subscription with Lead Magnet Trigger (Phases 13 & 14) =====
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
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
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
        isValidEmail,
        selectOption,
        prevStep,
        resetQuiz,
        toggleMobileMenu,
        handleSearch,
        trackAffiliateClick,
        trackEvent,
        calculateCostSimulation,
        printSummaryReport
    };
}
