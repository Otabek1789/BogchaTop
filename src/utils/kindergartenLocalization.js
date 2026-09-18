// Localization helper for kindergarten dynamic properties

const LANG_MAP = {
  en: {
    "O'zbek": "Uzbek",
    "Rus": "Russian",
    "Ingliz": "English",
    "Узбекский": "Uzbek",
    "Русский": "Russian",
    "Английский": "English"
  },
  ru: {
    "O'zbek": "Узбекский",
    "Rus": "Русский",
    "Ingliz": "Английский",
    "Uzbek": "Узбекский",
    "Russian": "Русский",
    "English": "Английский"
  },
  uz: {
    "Uzbek": "O'zbek",
    "Russian": "Rus",
    "English": "Ingliz",
    "Узбекский": "O'zbek",
    "Русский": "Rus",
    "Английский": "Ingliz"
  }
};

const FEATURE_MAP = {
  en: {
    "Basseyn": "Swimming pool",
    "5 mahal ovqat": "5 meals a day",
    "Ingliz tili intensiv": "Intensive English",
    "Gimnastika": "Gymnastics",
    "Eco muhit": "Eco environment",
    "Mental arifmetika": "Mental arithmetic",
    "Shaxmat": "Chess",
    "Video kuzatuv": "24/7 CCTV",
    "4 mahal ovqat": "4 meals a day",
    "Raqs": "Dance",
    "Logoped": "Speech therapist",
    "Lego room": "Lego room",
    "Xalqaro dastur": "International curriculum",
    "Native speaker": "Native speaker",
    "Robototexnika": "Robotics",
    "Art studiya": "Art studio",
    "Milliy an'analar": "National traditions",
    "Kurash": "Wrestling",
    "Katta hovli": "Spacious playground",
    "Psixolog": "Psychologist",
    "Musiqa": "Music"
  }
};

const DESC_MAP = {
  en: {
    "Happy Kids Academy - bu bolangizning har tomonlama rivojlanishi uchun yaratilgan zamonaviy maktabgacha ta'lim muassasasi.":
      "Happy Kids Academy is a modern pre-school education institution designed for the comprehensive development of your child.",
    "Erkatoy bog'chasi bolalarga zamonaviy bilim berish bilan bir qatorda, ularning ijodiy qobiliyatlarini rivojlantirishga qaratilgan.":
      "Erkatoy kindergarten provides modern education while fostering children's creative and practical abilities.",
    "Sifatli ta'lim, hamyonbop narxlar. Miracle baby - kelajak avlod uchun to'g'ri tanlov.":
      "Quality education at affordable prices. Miracle Baby is the right choice for the future generation.",
    "Xalqaro standartlar asosida ta'lim beruvchi premium klassdagi bolalar bog'chasi.":
      "A premium-class kindergarten providing world-class education based on international standards.",
    "Milliy qadriyatlarimiz asosida farzandlarimizni tarbiyalaydigan shinam makon.":
      "A cozy haven that fosters our children based on time-honored values and modern care.",
    "Katta yashil hududga ega bolalar uchun ajoyib dam olish va o'qish markazi.":
      "A wonderful learning and recreational center for children featuring a large green territory."
  }
};

export function getLocalizedDescription(kg, lang = 'uz') {
  if (!kg || !kg.description) return '';
  if (typeof kg.description === 'string') return kg.description;
  if (kg.description[lang]) return kg.description[lang];
  if (lang === 'en') {
    const uzDesc = kg.description['uz'] || '';
    if (DESC_MAP.en[uzDesc]) return DESC_MAP.en[uzDesc];
    if (kg.description['ru']) return kg.description['ru'];
  }
  return kg.description[lang] || kg.description['uz'] || kg.description['ru'] || '';
}

export function getLocalizedLanguages(kg, lang = 'uz') {
  if (!kg || !kg.languages) return [];
  if (Array.isArray(kg.languages)) {
    if (lang === 'en') {
      return kg.languages.map(l => LANG_MAP.en[l] || l);
    }
    return kg.languages;
  }
  if (kg.languages[lang] && Array.isArray(kg.languages[lang]) && kg.languages[lang].length > 0) {
    return kg.languages[lang];
  }
  const fallback = kg.languages['uz'] || kg.languages['ru'] || [];
  if (lang === 'en') {
    return fallback.map(l => LANG_MAP.en[l] || l);
  }
  if (lang === 'ru') {
    return fallback.map(l => LANG_MAP.ru[l] || l);
  }
  return fallback;
}

export function getLocalizedFeatures(kg, lang = 'uz') {
  if (!kg || !kg.features) return [];
  if (Array.isArray(kg.features)) {
    if (lang === 'en') {
      return kg.features.map(f => FEATURE_MAP.en[f] || f);
    }
    return kg.features;
  }
  if (kg.features[lang] && Array.isArray(kg.features[lang]) && kg.features[lang].length > 0) {
    return kg.features[lang];
  }
  const fallback = kg.features['uz'] || kg.features['ru'] || [];
  if (lang === 'en') {
    return fallback.map(f => FEATURE_MAP.en[f] || f);
  }
  return fallback;
}

export function getLocalizedAddress(kg, lang = 'uz') {
  if (!kg || !kg.address) return '';
  if (typeof kg.address === 'string') return kg.address;
  if (kg.address[lang]) return kg.address[lang];
  return kg.address['uz'] || kg.address['ru'] || '';
}

export function getLocalizedPrice(kg, lang = 'uz') {
  if (!kg || !kg.price) return '';
  if (typeof kg.price === 'string') {
    if (lang === 'en') return kg.price.replace('UZS/oy', 'UZS/month').replace('oy', 'month');
    return kg.price;
  }
  if (kg.price[lang]) return kg.price[lang];
  const uzPrice = kg.price['uz'] || '';
  if (lang === 'en') return uzPrice.replace('UZS/oy', 'UZS/month').replace('oy', 'month');
  return uzPrice;
}
