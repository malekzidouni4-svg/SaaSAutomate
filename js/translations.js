// الترجمات الكاملة لمشروع SaaSAutomate
// تغطي جميع المراحل والتعديلات الـ 29 برؤية احترافية ثنائية اللغة
const translations = {
  ar: {
    // Navigation (Phase 16 & Headers)
    title: "SaaSAutomate - أفضل أدوات أتمتة الأعمال",
    nav_features: "المميزات",
    nav_roi: "حاسبة ROI 2.0",
    nav_comparison: "المقارنة التفصيلية",
    nav_pricing: "المنصات والأسعار",
    nav_faq: "الأسئلة الشائعة",
    nav_scenarios: "سيناريوهات الأتمتة",
    nav_cta: "اكتشف منصتك",
    
    // Hero Section (Phase 1)
    hero_badge: "الدليل الشامل لأفضل أدوات الأتمتة 🚀",
    hero_title: "اعرف أداة الأتمتة المناسبة لك في أقل من دقيقة",
    hero_desc: "أجب عن بعض الأسئلة حول عملك وميزانيتك وخبرتك، وسنقارن احتياجاتك مع Make وZapier وn8n لنقترح الخيار الأنسب لك.",
    hero_btn1_quiz: "اكتشف منصتك",
    hero_btn2_comparison: "شاهد المقارنة",
    
    // Search (Phase 17)
    search_placeholder: "ابحث عن أداة، ميزة أو سيناريو أتمتة (مثال: Sheets, AI, CRM)...",
    search_no_results: "عذراً، لم نجد أي نتائج تطابق بحثك. جرب كلمات مفتاحية أخرى.",

    // Quiz Translations (Phases 2, 3, 25)
    quiz_title: "ما هي أفضل منصة أتمتة لك؟",
    quiz_desc: "أجب عن 6 أسئلة سريعة لنحدد لك المنصة الأكثر ملاءمة لاحتياجاتك بدقة.",
    quiz_back: "السابق",
    quiz_helper_hint: "اختر إجابة للمتابعة تلقائياً",
    quiz_res_header: "النتيجة والتوصية المناسبة لك",
    quiz_best_badge: "الخيار الموصى به",
    quiz_why_lbl: "لماذا هي مناسبة لك؟",
    quiz_not_why_lbl: "قد لا تكون مناسبة لك إذا:",
    quiz_start_btn: "ابدأ مع هذه المنصة الآن ←",
    quiz_alt_scores: "درجات تطابق البدائل والمنصات الأخرى",
    quiz_reset_btn: "إعادة الاختبار",
    quiz_suitability_explainer: "نظام تقييم شفاف: تحتسب هذه الدرجات بناءً على معايير السعر، سهولة الاستخدام، مهارات البرمجة، والخصوصية المطلوبة.",

    // Quiz Questions (Smart Scoring)
    quiz_q1_text: "السؤال 1: ما هو مستوى خبرتك التقنية؟",
    quiz_q1_o1: "مبتدئ (لا أكود)",
    quiz_q1_o2: "متوسط (أفهم الـ APIs والربط البسيط)",
    quiz_q1_o3: "مطور / محترف تقني",

    quiz_q2_text: "السؤال 2: ما هو هدفك الرئيسي من الأتمتة؟",
    quiz_q2_o1: "أتمتة مهام يومية بسيطة",
    quiz_q2_o2: "التسويق والمبيعات وجلب العملاء",
    quiz_q2_o3: "ربط عدد كبير من التطبيقات والخدمات",
    quiz_q2_o4: "معالجة وتنسيق كميات ضخمة من البيانات",
    quiz_q2_o5: "بناء سيناريوهات عمل معقدة ومتفرعة",
    quiz_q2_o6: "دمج الذكاء الاصطناعي (AI)",

    quiz_q3_text: "السؤال 3: ما هي الميزانية الشهرية المقدرة؟",
    quiz_q3_o1: "أريد خطة مجانية تماماً",
    quiz_q3_o2: "ميزانية منخفضة (أقل من 20$ شهرياً)",
    quiz_q3_o3: "ميزانية متوسطة (20$ - 50$ شهرياً)",
    quiz_q3_o4: "ميزانية مفتوحة (أكثر من 50$ شهرياً)",

    quiz_q4_text: "السؤال 4: هل تفضل تشغيل النظام بالكامل على خادمك الخاص (Self-Hosting)؟",
    quiz_q4_o1: "نعم (تحكم كامل برمجياً وأمان مطلق)",
    quiz_q4_o2: "لا (أفضل سحابي جاهز بدون إدارة خوادم)",
    quiz_q4_o3: "لا أعلم / غير متأكد",

    quiz_q5_text: "السؤال 5: ما هو مستوى التحكم البرمجي والتخصيص المطلوب؟",
    quiz_q5_o1: "بسيط وتلقائي بالكامل بلمسة زر",
    quiz_q5_o2: "مرونة متوسطة مع تعديل شروط بصرية",
    quiz_q5_o3: "تحكم وتخصيص كلي وكتابة كود مخصص",

    quiz_q6_text: "السؤال 6: ما هو حجم الاستخدام المتوقع (عدد العمليات شهرياً)؟",
    quiz_q6_o1: "صغير (أقل من 1,000 عملية شهرياً)",
    quiz_q6_o2: "متوسط (1,000 - 10,000 عملية شهرياً)",
    quiz_q6_o3: "ضخم (أكثر من 10,000 عملية شهرياً)",

    // Features Section
    feat_main_title: "لماذا تحتاج إلى أتمتة أعمالك؟",
    feat_main_desc: "رفع كفاءة العمل وتقليل الأخطاء البشرية عبر الربط الذكي.",
    feat_1_title: "خدمة عملاء 24/7",
    feat_1_desc: "الرد الفوري على استفسارات العملاء وربط منصات الدعم الفني تلقائياً.",
    feat_2_title: "إدارة البيانات",
    feat_2_desc: "نقل وتنسيق البيانات بين قواعد البيانات وجداول السبريد شيت دون تدخل يدوي.",
    feat_3_title: "ربط التطبيقات",
    feat_3_desc: "ربط أكثر من 5000+ تطبيق ونظام سحابي مع بعضها البعض في ثوانٍ معدودة.",

    // ROI Calculator 2.0 (Phases 6 & 7)
    roi_title: "حاسبة العائد على الاستثمار الذكية (ROI 2.0) 📊",
    roi_desc: "حدد حجم ونوع العمل اليدوي في شركتك لتكتشف حجم التوفير المالي ونوصي بالمنصة المثالية لحسابك.",
    roi_res_title: "التوفير الشهري المتوقع",
    roi_res_sub: "بناءً على نوع العمل ونسبة الأتمتة المخصصة له.",
    roi_hours_lbl: "الساعات الموفرة شهرياً",
    roi_annual_lbl: "التوفير السنوي",
    roi_emp_count: "عدد الموظفين:",
    roi_hours_week: "ساعات العمل اليدوي أسبوعياً للموظف:",
    roi_hourly_cost: "تكلفة ساعة الموظف ($):",
    roi_work_type: "نوع العمل والمجال الأساسي:",
    roi_rec_title: "💡 توصية الحاسبة الذكية:",
    
    // Work Types & Automation Rates (Phase 6)
    wt_customer_service: "خدمة العملاء والدعم الفني (أتمتة %60)",
    wt_data_entry: "إدخال البيانات والمحاسبة (أتمتة %85)",
    wt_marketing: "التسويق وجلب العملاء Leads (أتمتة %75)",
    wt_sales: "المبيعات وتتبع الفواتير (أتمتة %70)",
    wt_admin: "الإدارة والجدولة الداخلية (أتمتة %50)",
    wt_orders: "معالجة الطلبات والمتاجر الإلكترونية (أتمتة %80)",
    wt_email: "إدارة البريد الإلكتروني والرسائل (أتمتة %65)",

    // Recommendation Outcomes based on ROI (Phase 7)
    roi_rec_make: "بناءً على حجم العمل الاقتصادي المتوسط، فإن <b>Make.com</b> هي المنصة الأفضل لك لتوفير التكاليف وبناء عمليات بصرية مرنة.",
    roi_rec_zapier: "نظراً لأن ميزانيتك تدعم ذلك أو حجم العمل يتطلب السرعة والسهولة، فإن <b>Zapier</b> سيعطيك الأداء الأسرع دون تعقيد.",
    roi_rec_n8n: "بالنسبة لحجم الاستخدام الضخم والعمليات الكثيرة التي حددتها، فإن خيار الاستضافة الذاتية عبر <b>n8n.io</b> سيوفر عليك آلاف الدولارات شهرياً وسيكون الخيار الأكثر حكمة واقتصادية.",

    // Comparison Table 2.0 Criteria (Phase 4)
    comp_title: "جدول مقارنة شامل 2.0 بين المنصات الثلاث",
    comp_desc: "مقارنة تفصيلية دقيقة ومبنية على معايير معلنة لمساعدتك في اتخاذ القرار الصحيح.",
    comp_th_criterion: "المعيار المقارن",
    comp_th_make: "Make.com (الأفضل قيمة)",
    comp_th_zapier: "Zapier (الأسهل)",
    comp_th_n8n: "n8n.io (للمحترفين والخصوصية)",
    
    // Comparison 2.0 Rows
    crit_price: "السعر والاشتراك",
    crit_free_plan: "الخطة المجانية",
    crit_usability: "سهولة الاستخدام والتعامل",
    crit_integrations: "عدد التكاملات والتطبيقات",
    crit_webhooks: "دعم Webhooks الفوري",
    crit_api: "التحكم عبر الـ API",
    crit_ai_support: "دعم ميزات الذكاء الاصطناعي (AI)",
    crit_code_execution: "تشغيل الأكواد المخصصة",
    crit_self_hosting: "الاستضافة الذاتية (Self-hosting)",
    crit_flexibility: "مرونة بناء السيناريوهات",
    crit_scalability: "قابلية التوسع والملايين",
    crit_for_beginners: "مناسب للمبتدئين",
    crit_for_developers: "مناسب للمطورين والتقنيين",
    crit_for_enterprises: "جاهزية الشركات الكبرى",
    crit_privacy: "الخصوصية وأمن البيانات",
    crit_best_use: "أفضل سيناريو استخدام",

    // Platform Cards (Phase 5)
    platforms_section_title: "منصات الأتمتة الثلاث الموصى بها",
    platforms_section_desc: "تفاصيل واشتراكات المنصات لتحديد بداية رحلتك فوراً وبكل وضوح.",
    card_best_for: "الأفضل لـ:",
    card_usability_rating: "سهولة الاستخدام:",
    card_flexibility_rating: "المرونة والتحكم:",
    card_price_starts: "السعر يبدأ من:",
    card_best_feature: "أفضل ميزة فريدة:",
    card_worst_con: "العيب الرئيسي:",
    card_why_choose: "لماذا تختاره لعملك؟",
    card_cta_btn: "ابدأ الآن مع",

    // Automation Scenarios Section (Phase 8)
    scenarios_title: "ما الذي يمكنك أتمتته؟ 💡",
    scenarios_desc: "أمثلة حقيقية لسيناريوهات وعمليات أوتوماتيكية توفر على فريقك عشرات الساعات أسبوعياً.",
    
    scenario_email_title: "📧 أتمتة البريد والاتصالات",
    scenario_email_desc: "وصول رسالة من عميل ← تحليل محتواها ← حفظ البيانات في جداول ← إرسال إشعار فوري للفريق.",

    scenario_data_title: "📊 مزامنة وتحديث البيانات",
    scenario_data_desc: "تحديث في Google Sheets ← معالجة البيانات وتصنيفها أوتوماتيكياً ← حفظها في قاعدة البيانات ← إرسال تقرير.",

    scenario_orders_title: "🛒 معالجة طلبات المتاجر",
    scenario_orders_desc: "طلب جديد في المتجر ← تحديث المخزون أوتوماتيكياً ← إرسال تأكيد بالبريد للزبون ← إشعار القناة اللوجستية.",

    scenario_ai_title: "🤖 ردود الذكاء الاصطناعي (AI)",
    scenario_ai_desc: "رسالة العميل في الدعم ← تمريرها للـ AI ← تحليل وتصنيف المشكلة ← صياغة الرد أوتوماتيكياً وإرساله للعميل.",

    scenario_marketing_title: "📣 تسويق وجلب العملاء Leads",
    scenario_marketing_desc: "عميل جديد من إعلان فيسبوك ← إضافته فوراً لنظام الـ CRM ← إرسال بريد ترحيبي ← إشعار Slack للمبيعات.",

    // FAQ Section
    faq_title: "الأسئلة الشائعة حول أتمتة الأعمال",
    faq_desc: "إجابات على أكثر الأسئلة شيوعاً لمساعدتك على البدء بكل ثقة واطمئنان.",
    faq_q1: "ما الفرق بين Make و Zapier؟",
    faq_a1: "Make توفر واجهة مرئية أكثر مرونة للسيناريوهات المعقدة وأسعار منخفضة، بينما Zapier تركز على البساطة والسهولة وتدعم عدد تطبيقات أكبر. Zapier أفضل للمبتدئين، و Make أفضل لمن يريد تحكماً أكثر وتكلفة أقل.",
    faq_q2: "هل يمكنني استخدام n8n مجاناً؟",
    faq_a2: "نعم! n8n توفر نسخة مجانية تماماً للاستضافة الذاتية (Self-hosted). يمكنك تثبيتها على خادمك الخاص وتشغيلها بدون أي تكاليف اشتراكات إضافية للعمليات.",
    faq_q3: "كم سأوفر من المال باستخدام الأتمتة؟",
    faq_a3: "يعتمد على حجم العمل اليدوي لديك. استخدم حاسبة ROI 2.0 الخاصة بنا أعلى الصفحة لحساب التوفير المتوقع بناءً على عدد موظفيك والساعات المقضية في العمل اليدوي.",
    faq_q4: "هل تدعم هذه المنصات اللغة العربية؟",
    faq_a4: "Make و Zapier و n8n تدعم واجهات بلغات متعددة، لكن قد لا تكون العربية مدعومة بشكل كامل. معظم الإعدادات تكون بالإنجليزية، لكن المحتوى والبيانات يمكن أن تكون بأي لغة.",
    faq_q5: "هل أحتاج لمهارات برمجية لاستخدام هذه المنصات؟",
    faq_a5: "Zapier و Make لا تحتاج لمهارات برمجية - واجهة السحب والإفلات كافية. أما n8n فتتطلب معرفة تقنية أساسية، خاصة للسيناريوهات المتقدمة.",
    faq_q6: "ما الذي يجب أن أختاره إذا كنت مبتدئاً؟",
    faq_a6: "نوصيك ببدء استخدام Zapier إذا كنت مبتدئاً - إنها الأسهل والأكثر شعبية. بمجرد اكتساب الخبرة، يمكنك الانتقال إلى Make لمزيد من المرونة أو n8n للتحكم الكامل.",

    // Newsletter & Lead Magnet (Phases 13 & 14)
    newsletter_title: "ابقَ على اطلاع دائم بجديد الأتمتة",
    newsletter_desc: "اشترك معنا للحصول على نصائح وتطويرات حصرية وحاسمة في عالم الذكاء الاصطناعي والأتمتة.",
    newsletter_btn: "اشترك واحصل على الدليل مجاناً 🎁",
    newsletter_lead_magnet: "🎁 هدية فورية للمشتركين: احصل على كتابنا الحصري '25 عملية يمكنك أتمتتها في عملك فوراً وتوفير 10 ساعات أسبوعياً' مجاناً!",
    newsletter_privacy: "لن نشارك بريدك الإلكتروني مع أي طرف آخر. يمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.",
    newsletter_success: "تم تسجيل اشتراكك بنجاح! تم إرسال دليل '25 عملية يمكنك أتمتتها' إلى بريدك الإلكتروني فوراً.",

    // Trust Signals (Phases 23 & 24)
    trust_compare_method: "كيف نقوم بالمقارنة؟ نقوم بالتحليل بناءً على معايير واضحة وشاملة: السعر الفعلي، سهولة البناء، مرونة الأكواد المخصصة، مستويات الخصوصية المتطورة، وتجربتنا العملية الطويلة لكل منصة.",
    trust_last_updated: "آخر تحديث شامل للمعلومات والأسعار: أغسطس/سبتمبر 2026",

    // Affiliate Disclosure (Phase 12)
    affiliate_disclosure_footer: "إفصاح الشفافية: قد نحصل على عمولة تسويقية صغيرة إذا قمت بالتسجيل في بعض الخدمات والمنصات من خلال روابطنا، وذلك دون أي تكلفة إضافية عليك نهائياً. توصياتنا محايدة بالكامل ومبنية على معايير المقارنة الموضحة والواقع العملي للخدمات.",

    // Footer
    footer_about: "عن SaaSAutomate",
    footer_about_desc: "منصة محايدة وموثوقة لمقارنة أدوات الأتمتة والمساعدة في اتخاذ أفضل قرار لعملك.",
    footer_links: "الروابط",
    footer_features: "المميزات",
    footer_comparison: "المقارنة",
    footer_pricing: "الأسعار",
    footer_faq: "الأسئلة الشائعة",
    footer_platforms: "المنصات",
    footer_legal: "قانوني",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الاستخدام",
    footer_contact: "اتصل بنا",
    footer_copyright: "© 2026 SaaSAutomate. جميع الحقوق محفوظة."
  },
  
  en: {
    // Navigation (Phase 16 & Headers)
    title: "SaaSAutomate - Best Business Automation Tools",
    nav_features: "Features",
    nav_roi: "ROI 2.0 Calculator",
    nav_comparison: "Detailed Comparison",
    nav_pricing: "Platforms & Prices",
    nav_faq: "FAQ",
    nav_scenarios: "Automation Scenarios",
    nav_cta: "Discover Your Tool",
    
    // Hero Section (Phase 1)
    hero_badge: "The Ultimate Guide to Automation Tools 🚀",
    hero_title: "Find the Best Automation Tool for Your Business in under a minute",
    hero_desc: "Answer a few questions about your business, budget, and experience, and we will compare your needs with Make, Zapier, and n8n to suggest the absolute best fit.",
    hero_btn1_quiz: "Discover Your Platform",
    hero_btn2_comparison: "View Comparison",

    // Search (Phase 17)
    search_placeholder: "Search for a tool, feature, or automation scenario (e.g., Sheets, AI, CRM)...",
    search_no_results: "Sorry, no results matched your search. Try other keywords.",

    // Quiz Translations (Phases 2, 3, 25)
    quiz_title: "Which automation platform is best for you?",
    quiz_desc: "Answer 6 quick questions to let us precisely determine the best automation platform for your exact needs.",
    quiz_back: "Previous",
    quiz_helper_hint: "Choose an option to continue automatically",
    quiz_res_header: "Your Match Results & Recommendation",
    quiz_best_badge: "RECOMMENDED CHOICE",
    quiz_why_lbl: "Why is it a perfect match?",
    quiz_not_why_lbl: "It might not suit you if:",
    quiz_start_btn: "Start with this platform now ←",
    quiz_alt_scores: "Alternative platform match percentages",
    quiz_reset_btn: "Reset Quiz",
    quiz_suitability_explainer: "Transparent rating system: Match percentages are computed based on criteria like budget, usability, coding skills, and required data privacy.",

    // Quiz Questions (Smart Scoring)
    quiz_q1_text: "Question 1: What is your level of technical experience?",
    quiz_q1_o1: "Beginner (No coding experience)",
    quiz_q1_o2: "Intermediate (Understand APIs and simple mapping)",
    quiz_q1_o3: "Developer / Technical Expert",

    quiz_q2_text: "Question 2: What is your primary automation goal?",
    quiz_q2_o1: "Automate simple daily tasks",
    quiz_q2_o2: "Marketing, sales, and lead generation",
    quiz_q2_o3: "Connect a high volume of apps",
    quiz_q2_o4: "Process and format heavy payloads of data",
    quiz_q2_o5: "Build advanced multi-branched scenarios",
    quiz_q2_o6: "Integrate Artificial Intelligence (AI)",

    quiz_q3_text: "Question 3: What is your estimated monthly budget?",
    quiz_q3_o1: "I need a completely free tier",
    quiz_q3_o2: "Low budget (less than $20 / month)",
    quiz_q3_o3: "Medium budget ($20 - $50 / month)",
    quiz_q3_o4: "Open budget (more than $50 / month)",

    quiz_q4_text: "Question 4: Do you prefer self-hosting the platform on your own servers?",
    quiz_q4_o1: "Yes (Complete server control and maximum privacy)",
    quiz_q4_o2: "No (Ready-to-use cloud-hosted service)",
    quiz_q4_o3: "No opinion / Not sure",

    quiz_q5_text: "Question 5: What is your desired level of programmatic control?",
    quiz_q5_o1: "Simple and fully automated visual interface",
    quiz_q5_o2: "Moderate flexibility and visual logic rules",
    quiz_q5_o3: "Full programmatic control and custom code",

    quiz_q6_text: "Question 6: What is your expected monthly execution volume?",
    quiz_q6_o1: "Small (under 1,000 operations / month)",
    quiz_q6_o2: "Medium (1,000 - 10,000 operations / month)",
    quiz_q6_o3: "Huge (over 10,000 operations / month)",

    // Features Section
    feat_main_title: "Why Do You Need Business Automation?",
    feat_main_desc: "Increase work efficiency and reduce human errors through smart integration.",
    feat_1_title: "24/7 Customer Service",
    feat_1_desc: "Instant responses to customer inquiries and automatic linking of support platforms.",
    feat_2_title: "Data Management",
    feat_2_desc: "Transfer and sync data between databases and spreadsheets without manual intervention.",
    feat_3_title: "App Integration",
    feat_3_desc: "Connect 5000+ apps and cloud systems to each other in just seconds.",

    // ROI Calculator 2.0 (Phases 6 & 7)
    roi_title: "Smart ROI 2.0 Savings Calculator 📊",
    roi_desc: "Specify your workforce, hours, and department to reveal detailed savings and get platform recommendations.",
    roi_res_title: "Expected Monthly Savings",
    roi_res_sub: "Based on specific work department and custom automation rates.",
    roi_hours_lbl: "Monthly Hours Saved",
    roi_annual_lbl: "Annual Savings",
    roi_emp_count: "Number of Employees:",
    roi_hours_week: "Weekly manual hours per employee:",
    roi_hourly_cost: "Employee hourly rate ($):",
    roi_work_type: "Primary Department/Work Field:",
    roi_rec_title: "💡 Smart Recommendation:",
    
    // Work Types & Automation Rates (Phase 6)
    wt_customer_service: "Customer Service & Support (60% automated)",
    wt_data_entry: "Data Entry & Bookkeeping (85% automated)",
    wt_marketing: "Marketing & Lead Gen (75% automated)",
    wt_sales: "Sales & Invoicing (70% automated)",
    wt_admin: "Administration & Internal Scheduling (50% automated)",
    wt_orders: "Order Processing & E-commerce (80% automated)",
    wt_email: "Email & Communication Management (65% automated)",

    // Recommendation Outcomes based on ROI (Phase 7)
    roi_rec_make: "Based on your moderate workload and need for cost efficiency, <b>Make.com</b> is your best choice to build robust and visual scenarios.",
    roi_rec_zapier: "Since your budget allows it or you require rapid setup, <b>Zapier</b> will provide the fastest path with zero coding friction.",
    roi_rec_n8n: "With your massive operational scale, self-hosting <b>n8n.io</b> on your own infrastructure will save you thousands of dollars monthly and is the most logical financial choice.",

    // Comparison Table 2.0 Criteria (Phase 4)
    comp_title: "Comprehensive Comparison 2.0 Table",
    comp_desc: "A highly detailed, criteria-based evaluation of Make, Zapier, and n8n to help you decide.",
    comp_th_criterion: "Criterion Evaluated",
    comp_th_make: "Make.com (Best Value)",
    comp_th_zapier: "Zapier (Simplest)",
    comp_th_n8n: "n8n.io (Developer Choice)",
    
    // Comparison 2.0 Rows
    crit_price: "Pricing structure",
    crit_free_plan: "Free tier cap",
    crit_usability: "Usability and learning curve",
    crit_integrations: "Supported apps & directory",
    crit_webhooks: "Instant Webhooks support",
    crit_api: "API custom control",
    crit_ai_support: "Built-in AI & LLM nodes",
    crit_code_execution: "Custom code block execution",
    crit_self_hosting: "Self-hosting support",
    crit_flexibility: "Visual logic flexibility",
    crit_scalability: "Scalability and high volumes",
    crit_for_beginners: "Suitable for beginners",
    crit_for_developers: "Suitable for developers",
    crit_for_enterprises: "Enterprise governance ready",
    crit_privacy: "Data privacy & security",
    crit_best_use: "Best use case scenario",

    // Platform Cards (Phase 5)
    platforms_section_title: "Our Recommended Three Platforms",
    platforms_section_desc: "A closer look at features, pros, and cons to jumpstart your automation journey.",
    card_best_for: "Best For:",
    card_usability_rating: "Ease of Use:",
    card_flexibility_rating: "Flexibility:",
    card_price_starts: "Pricing starts at:",
    card_best_feature: "Best unique feature:",
    card_worst_con: "Main disadvantage:",
    card_why_choose: "Why choose it for your business?",
    card_cta_btn: "Get started with",

    // Automation Scenarios Section (Phase 8)
    scenarios_title: "What Can You Automate? 💡",
    scenarios_desc: "Real-world visual blueprints of automated processes that save teams hundreds of hours.",
    
    scenario_email_title: "📧 Communication Pipelines",
    scenario_email_desc: "Incoming email from client ← parse content with AI ← store details in DB ← dispatch instant Slack alert.",

    scenario_data_title: "📊 Automated Data Syncing",
    scenario_data_desc: "Row added in Google Sheets ← validate & format payload automatically ← sync with database ← email pdf report.",

    scenario_orders_title: "🛒 E-commerce Fulfillment",
    scenario_orders_desc: "New order placed ← auto-update inventory ← generate delivery label ← email transactional receipt to buyer.",

    scenario_ai_title: "🤖 Intelligent AI Responses",
    scenario_ai_desc: "Support ticket received ← analyze with LLM ← classify urgency level ← draft and send accurate reply automatically.",

    scenario_marketing_title: "📣 Marketing & Lead Gen",
    scenario_marketing_desc: "New lead from FB Ads ← add to CRM database ← trigger automated email drip sequence ← notify sales lead.",

    // FAQ Section
    faq_title: "Frequently Asked Questions",
    faq_desc: "Everything you need to know about starting your business automation journey with confidence.",
    faq_q1: "What's the difference between Make and Zapier?",
    faq_a1: "Make offers a highly visual, powerful canvas for complex multi-branch logic at a very affordable price, while Zapier focuses on sheer ease-of-use and linear setups with the largest app library. Zapier is perfect for beginners, Make is ideal for advanced users seeking cost savings.",
    faq_q2: "Can I use n8n for free?",
    faq_a2: "Yes! n8n's community edition is fully open-source and free to self-host. You can host it on your own server and run unlimited tasks without paying licensing fees.",
    faq_q3: "How much money can I save with automation?",
    faq_a3: "It scales with your manual workload. Use our interactive ROI 2.0 calculator above to compute exact financial savings based on your team size and manual task durations.",
    faq_q4: "Do these platforms support Arabic?",
    faq_a4: "Make, Zapier, and n8n allow processing of Arabic text data perfectly. While their builder interfaces are primarily in English, payloads and API texts can be localized in any language.",
    faq_q5: "Do I need coding skills to use these tools?",
    faq_a5: "Zapier and Make are completely no-code with intuitive drag-and-drop mechanics. n8n is low-code and becomes exceptionally powerful when utilizing basic JavaScript or Python.",
    faq_q6: "Which platform should I choose as a beginner?",
    faq_a6: "We highly recommend starting with Zapier for absolute simplicity. Once you understand triggers and actions, you can migrate to Make for cost efficiency and n8n for custom infrastructure.",

    // Newsletter & Lead Magnet (Phases 13 & 14)
    newsletter_title: "Stay Ahead in Business Automation",
    newsletter_desc: "Subscribe to our exclusive newsletter and unlock cutting-edge AI and automation workflows weekly.",
    newsletter_btn: "Subscribe & Download Free Guide 🎁",
    newsletter_lead_magnet: "🎁 Instant Bonus: Receive our premium eBook '25 High-Value Processes You Can Automate Today to Save 10 Hours Weekly' completely free!",
    newsletter_privacy: "We value your privacy. We will never share your information. Unsubscribe at any time.",
    newsletter_success: "Subscription confirmed! We have delivered your free '25 processes to automate' handbook to your inbox.",

    // Trust Signals (Phases 23 & 24)
    trust_compare_method: "How do we compare? Our detailed scoring matrix is completely transparent and evaluated against concrete benchmarks: pricing plans, visual building ease, custom code adaptability, privacy, and extensive production testing.",
    trust_last_updated: "Latest detailed pricing and specs update: August/September 2026",

    // Affiliate Disclosure (Phase 12)
    affiliate_disclosure_footer: "Affiliate Disclosure: Some of the links on this website are affiliate links, meaning we may earn a small referral commission if you subscribe, at absolutely no additional cost to you. Our assessments are impartial and based on verified benchmarks.",

    // Footer
    footer_about: "About SaaSAutomate",
    footer_about_desc: "A trusted, independent platform for comparing business automation tools to help optimize your operational efficiency.",
    footer_links: "Links",
    footer_features: "Features",
    footer_comparison: "Comparison",
    footer_pricing: "Pricing",
    footer_faq: "FAQ",
    footer_platforms: "Platforms",
    footer_legal: "Legal",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    footer_contact: "Contact Us",
    footer_copyright: "© 2026 SaaSAutomate. All rights reserved."
  }
};
