// Central Data Layer for SaaSAutomate
// Matches all Comparison 2.0 and Smart Recommendation criteria (Phases 4, 5, 11, 18, 25)
const platformsData = {
  make: {
    id: "make",
    name: "Make.com",
    tagline: {
      ar: "الأفضل قيمة والأنسب للمشاريع المتوسطة والسيناريوهات المتقدمة",
      en: "Best value and ideal for mid-size projects and advanced scenarios"
    },
    scores: {
      usability: 8,
      flexibility: 9,
      forBeginners: 7,
      forDevelopers: 8,
      selfHosting: 2,
      aiSupport: 9,
      priceScore: 9,
      privacy: 7
    },
    specs: {
      price: {
        ar: "يبدأ من 9$ / شهرياً",
        en: "Starts from $9 / month"
      },
      freePlan: {
        ar: "1,000 عملية مجانية شهرياً",
        en: "1,000 free operations/month"
      },
      easeOfUse: {
        ar: "ممتازة (محرر مرئي تفاعلي بسحب وإفلات)",
        en: "Excellent (interactive drag-and-drop visual builder)"
      },
      integrationsCount: {
        ar: "أكثر من 1,500+ تطبيق ونظام",
        en: "Over 1,500+ apps & services"
      },
      webhooks: {
        ar: "نعم، فورية وفائقة السرعة",
        en: "Yes, instant and ultra-fast"
      },
      api: {
        ar: "نعم، متكامل للتحكم بالعمليات والسيناريوهات",
        en: "Yes, fully featured for controlling workflows"
      },
      aiFeatures: {
        ar: "دعم ذكي وتكامل كامل مع OpenAI، Anthropic، إلخ",
        en: "Smart assistance and native OpenAI, Anthropic nodes"
      },
      codeExecution: {
        ar: "نعم، تشغيل JavaScript مخصص وتنسيقات JSON",
        en: "Yes, custom JavaScript execution & JSON parsing"
      },
      selfHosting: {
        ar: "لا (سحابي فقط)",
        en: "No (Cloud only)"
      },
      flexibility: {
        ar: "مرن جداً مع تفرعات وتكرارات غير محدودة",
        en: "Extremely flexible with unlimited branches & loops"
      },
      scalability: {
        ar: "ممتاز للشركات الناشئة والمشاريع سريعة النمو",
        en: "Superb for startups and fast-growing projects"
      },
      forBeginnersRating: {
        ar: "★★★★☆ (سهل الفهم والتطبيق)",
        en: "★★★★☆ (Easy to learn and configure)"
      },
      forDevelopersRating: {
        ar: "★★★★☆ (ميزات برمجية و APIs متطورة)",
        en: "★★★★☆ (Advanced code nodes & APIs)"
      },
      forEnterprises: {
        ar: "مناسب جداً مع ميزات أمنية وحوكمة مخصصة",
        en: "Fully compliant with enterprise security and governance"
      },
      privacy: {
        ar: "توافق كامل مع معايير GDPR و SOC2 السحابية",
        en: "Full compliance with cloud GDPR & SOC2 standards"
      },
      bestUse: {
        ar: "بناء الأتمتة المعقدة والربط المتشعب بأفضل تكلفة",
        en: "Building complex automation & multi-branch tasks at low cost"
      }
    },
    pros: {
      ar: [
        "واجهة سحب وإفلات بصرية متقدمة تتيح تتبع البيانات خطوة بخطوة",
        "تكلفة منخفضة للغاية وقيمة ممتازة مقابل السعر",
        "دعم معقد لبناء التكرارات وتعديل هياكل البيانات البرمجية",
        "تكامل قوي وفوري مع أدوات الذكاء الاصطناعي الحديثة"
      ],
      en: [
        "Advanced drag-and-drop visual interface to trace data live",
        "Very low cost per operation and extreme value-for-money",
        "Complex handling of arrays, loops, and custom JSON logic",
        "Powerful, native integrations with modern AI models"
      ]
    },
    cons: {
      ar: [
        "قد يحتاج لبعض منحنى التعلم لفهم التنسيقات المتقدمة",
        "لا يتيح خيار الاستضافة الذاتية على خادمك الخاص"
      ],
      en: [
        "Slight learning curve for handling advanced data structures",
        "Does not support on-premise self-hosting"
      ]
    },
    bestFor: {
      ar: "الشركات الصغيرة والمتوسطة والمشاريع المتقدمة",
      en: "Small and medium companies, and advanced workflows"
    },
    mainFeature: {
      ar: "Visual workflow builder (محرر مرئي متشعب)",
      en: "Visual workflow builder (multi-branched)"
    },
    mainCon: {
      ar: "لا يدعم الاستضافة الذاتية",
      en: "No self-hosted options"
    },
    link: "https://www.make.com"
  },

  zapier: {
    id: "zapier",
    name: "Zapier",
    tagline: {
      ar: "الأسهل للمبتدئين والشركات التي تبحث عن السرعة والدعم الأوسع للتطبيقات",
      en: "Easiest for beginners and companies seeking speed & widest app support"
    },
    scores: {
      usability: 10,
      flexibility: 7,
      forBeginners: 10,
      forDevelopers: 5,
      selfHosting: 1,
      aiSupport: 8,
      priceScore: 5,
      privacy: 9
    },
    specs: {
      price: {
        ar: "يبدأ من 19.99$ / شهرياً",
        en: "Starts from $19.99 / month"
      },
      freePlan: {
        ar: "100 عملية مجانية شهرياً (خطوات ثنائية فقط)",
        en: "100 free tasks/month (two-step only)"
      },
      easeOfUse: {
        ar: "سهلة جداً ومثالية للمبتدئين بدون أي تعقيد",
        en: "Super easy and perfect for absolute beginners"
      },
      integrationsCount: {
        ar: "أكثر من 5,000+ تطبيق عالمي (الأكبر على الإطلاق)",
        en: "Over 5,000+ apps supported (The largest ecosystem)"
      },
      webhooks: {
        ar: "نعم، متاحة في الخطط المدفوعة والمتقدمة",
        en: "Yes, available in paid and premium plans"
      },
      api: {
        ar: "محدود مقارنة بالمنصات الأخرى",
        en: "Limited compared to other platforms"
      },
      aiFeatures: {
        ar: "أدوات مدمجة لبناء واجهات ومساعدين ذكيين (Copilots)",
        en: "Built-in Copilot and AI prompt builders"
      },
      codeExecution: {
        ar: "نعم، كود JavaScript أو Python بسيط لتعديل النصوص",
        en: "Yes, basic JavaScript or Python to format text"
      },
      selfHosting: {
        ar: "لا (سحابي مغلق)",
        en: "No (Closed Cloud only)"
      },
      flexibility: {
        ar: "متوسطة، مناسب للأتمتة المتسلسلة والمباشرة",
        en: "Moderate, ideal for sequential linear workflows"
      },
      scalability: {
        ar: "مرتفع التكلفة عند زيادة العمليات بشكل كبير",
        en: "Very expensive at high operational scale"
      },
      forBeginnersRating: {
        ar: "★★★★★ (الأسهل والأبسط عالمياً)",
        en: "★★★★★ (The absolute easiest in the world)"
      },
      forDevelopersRating: {
        ar: "★★☆☆☆ (خيارات تخصيص كود محدودة)",
        en: "★★☆☆☆ (Limited custom coding options)"
      },
      forEnterprises: {
        ar: "دعم متقدم جداً للشركات الكبرى وأمان عالٍ",
        en: "Highly secure and trusted by global enterprises"
      },
      privacy: {
        ar: "أعلى درجات الخصوصية وأمان معتمد بالكامل",
        en: "Industry-standard data governance and security certs"
      },
      bestUse: {
        ar: "الأتمتة المباشرة والسريعة وربط التطبيقات النادرة",
        en: "Quick linear integrations and connecting niche apps"
      }
    },
    pros: {
      ar: [
        "يدعم أكبر مكتبة تطبيقات وأنظمة في العالم",
        "سهل للغاية في الإعداد ولا يتطلب أي خبرة تقنية",
        "استقرار وموثوقية عالية جداً للمهام البسيطة",
        "أدوات ذكاء اصطناعي لبناء مساعدين ونماذج عمل سريعة"
      ],
      en: [
        "Supports the largest app library on the planet",
        "Extremely easy setup with zero coding requirements",
        "Rock-solid stability and uptime for linear tasks",
        "Innovative AI assistants and copilot integration"
      ]
    },
    cons: {
      ar: [
        "أسعار مرتفعة جداً وتصاعدية للعمليات الضخمة",
        "مرونة بناء العمليات المعقدة والشرطية محدودة في الواجهة"
      ],
      en: [
        "Extremely expensive as execution volume increases",
        "Visual editor lacks advanced controls for loops and complex branches"
      ]
    },
    bestFor: {
      ar: "المبتدئين والفرق غير التقنية والشركات الكبرى",
      en: "Beginners, non-technical teams, and enterprises"
    },
    mainFeature: {
      ar: "5,000+ supported apps (أكبر ربط تطبيقات)",
      en: "5,000+ supported apps (Largest ecosystem)"
    },
    mainCon: {
      ar: "تكلفة مرتفعة جداً مع زيادة الاستخدام",
      en: "Very expensive at high volumes"
    },
    link: "https://zapier.com"
  },

  n8n: {
    id: "n8n",
    name: "n8n.io",
    tagline: {
      ar: "الأفضل للمطورين والشركات التي تبحث عن التحكم الكامل والخصوصية بأقل تكلفة",
      en: "Best for developers and companies seeking full control & privacy at minimal cost"
    },
    scores: {
      usability: 6,
      flexibility: 10,
      forBeginners: 3,
      forDevelopers: 10,
      selfHosting: 10,
      aiSupport: 10,
      priceScore: 10,
      privacy: 10
    },
    specs: {
      price: {
        ar: "مجاني بالكامل (استضافة ذاتية) أو يبدأ من 20€ سحابياً",
        en: "100% Free (Self-hosted) or starts from €20 cloud"
      },
      freePlan: {
        ar: "نسخة الاستضافة الذاتية مجانية بالكامل ومفتوحة المصدر",
        en: "Self-hosted version is entirely free with no caps"
      },
      easeOfUse: {
        ar: "متوسطة إلى معقدة (تتطلب فهم برمجي أساسي)",
        en: "Moderate to complex (requires basic technical skills)"
      },
      integrationsCount: {
        ar: "أكثر من 400+ تطبيق أساسي مع دعم متكامل للـ HTTP",
        en: "Over 400+ native nodes with robust generic HTTP support"
      },
      webhooks: {
        ar: "نعم، فورية وقابلة للتخصيص بالكامل برمجياً",
        en: "Yes, fully customizable and programmatic webhooks"
      },
      api: {
        ar: "نعم، تحكم كامل وخيارات برمجة متقدمة عبر Node API",
        en: "Yes, absolute API control and execution triggers"
      },
      aiFeatures: {
        ar: "متقدم جداً (محرر ذكاء اصطناعي مدمج لبناء عملاء ذكيين ولغات برمجة)",
        en: "Elite AI nodes (built-in LangChain nodes for custom AI agents)"
      },
      codeExecution: {
        ar: "نعم، كتابة وتمرير أكواد JavaScript أو Python بالكامل داخل العمليات",
        en: "Yes, full JavaScript & Python code block executions inside nodes"
      },
      selfHosting: {
        ar: "نعم، مدعوم بالكامل ومثالي للتحكم المطلق",
        en: "Yes, natively supported via Docker, npm, etc."
      },
      flexibility: {
        ar: "قوة غير محدودة، تحكم كامل وتخصيص بجميع خطوات معالجة البيانات",
        en: "Uncapped programmatic flexibility for all data payloads"
      },
      scalability: {
        ar: "فائقة وقليلة التكلفة جداً، تعتمد فقط على موارد خادمك الخاص",
        en: "Incredibly scalable, bound only by your server resources"
      },
      forBeginnersRating: {
        ar: "★★☆☆☆ (يحتاج لخبرة برمجية وفهم APIs)",
        en: "★★☆☆☆ (Requires technical and API setup knowledge)"
      },
      forDevelopersRating: {
        ar: "★★★★★ (الجنة الحقيقية للمبرمجين والمطورين)",
        en: "★★★★★ (The absolute paradise for developers)"
      },
      forEnterprises: {
        ar: "رائع للشركات التقنية التي تحتاج للخصوصية المطلقة للبيانات",
        en: "Perfect for tech companies wanting zero third-party data access"
      },
      privacy: {
        ar: "أعلى مستويات الخصوصية لأن البيانات لا تغادر خادمك الخاص",
        en: "Unparalleled privacy — data never leaves your infrastructure"
      },
      bestUse: {
        ar: "أتمتة العمليات البرمجية الضخمة وبناء عملاء الذكاء الاصطناعي المتطورين",
        en: "High-volume developer pipelines and hosting custom AI Agents"
      }
    },
    pros: {
      ar: [
        "نسخة الاستضافة الذاتية (Self-hosted) مجانية بالكامل بدون قيود",
        "توفير هائل في التكاليف عند معالجة ملايين البيانات والعمليات شهرياً",
        "أقوى منصة لبناء وتخصيص عملاء الذكاء الاصطناعي (LangChain مدمج)",
        "خصوصية مطلقة وأمان كامل لبيانات عملائك وعملياتك"
      ],
      en: [
        "Completely free self-hosting without any limits on executions",
        "Massive financial savings at millions of operations per month",
        "Built-in advanced AI Agent structures (native LangChain blocks)",
        "100% data privacy and total control over your security policy"
      ]
    },
    cons: {
      ar: [
        "تتطلب معرفة برمجية وإدارة خوادم لإعدادها وصيانتها بشكل صحيح",
        "عدد التطبيقات المربوطة أقل مقارنة بالمكتبة الضخمة لـ Zapier"
      ],
      en: [
        "Requires system administration & coding skills to install and maintain",
        "Fewer native app integrations compared to Zapier's directory"
      ]
    },
    bestFor: {
      ar: "المطورين والشركات التقنية الكبرى ومحبي الخصوصية",
      en: "Developers, technical startups, and privacy-focused teams"
    },
    mainFeature: {
      ar: "Self-hosted capability (إمكانية الاستضافة الذاتية)",
      en: "Self-hosted capability (100% Free)"
    },
    mainCon: {
      ar: "يحتاج لمهارات برمجية وصيانة الخادم",
      en: "Requires server setup & coding"
    },
    link: "https://n8n.io"
  }
};

// Export to make it accessible to script.js and testing frameworks
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { platformsData };
} else {
  window.platformsData = platformsData;
}
