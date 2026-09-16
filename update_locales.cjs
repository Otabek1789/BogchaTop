const fs = require('fs');

// New keys to add to all 3 locale files
const newKeys = {
  uz: {
    favorites: {
      pageTitle: "Sevimli bog'chalar",
      pageSubtitle: "Sizga yoqqan va saqlab qo'yilgan bog'chalar ro'yxati",
      emptyTitle: "Sevimlilar ro'yxati bo'sh",
      emptyDesc: "Hozircha hech qanday bog'chani sevimlilar qatoriga qo'shmadingiz.",
      viewKindergartens: "Bog'chalarni ko'rish"
    },
    profile: {
      pageTitle: "Mening Profilim",
      fullName: "F.I.SH",
      emailLabel: "Email manzil",
      phoneLabel: "Telefon raqam",
      addressLabel: "Yashash manzili",
      cancel: "Bekor qilish",
      save: "Saqlash",
      editProfile: "Ma'lumotlarni tahrirlash",
      platformUser: "Platforma foydalanuvchisi",
      saveSuccess: "Profil ma'lumotlari muvaffaqiyatli saqlandi!"
    },
    myApps: {
      pageTitle: "Mening Arizalarim va Kundalik",
      noApps: "Arizalar mavjud emas",
      noAppsDesc: "Siz hali hech qaysi bog'chaga ariza yubormagansiz. Bog'chalar ro'yxatidan o'zingizga yoqqanini tanlab ariza qoldirishingiz mumkin.",
      viewKindergartens: "Bog'chalarni ko'rish",
      approved: "Qabul qilingan",
      rejected: "Rad etilgan",
      pending: "Kutilmoqda",
      yourChild: "Farzandingiz",
      yourName: "Sizning ismingiz",
      yourPhone: "Telefon raqamingiz",
      yearsOld: "yosh",
      dailySchedule: "Farzandingizning bugungi jadvali (Demo)",
      clickToView: "Kundalikni ko'rish uchun bosing ⬇️",
      arrival: "Kelish",
      arrivedDesc: "Bog'chaga qabul qilindi",
      breakfast: "Nonushta 🥣",
      breakfastDesc: "Suli bo'tqasi va saryog'li non",
      lessonTime: "Dars vaqti 📚",
      lessonDesc: "Ingliz tili alifbosi (A'lo baho)",
      playTime: "O'yin vaqti ⚽",
      playDesc: "Ochiq havoda o'yinlar",
      lunch: "Tushlik 🍲",
      lunchDesc: "Mastava va mevali kompot",
      napTime: "Uxlash vaqti 😴",
      napDesc: "Sokin dam olish"
    },
    detailExtra: {
      photoGallery: "Foto Galereya",
      leaveReview: "Fikr qoldirish",
      reviewNote: "Sizning fikringiz to'g'ridan-to'g'ri bog'cha ma'muriyatiga yuboriladi va ommaga ko'rsatilmaydi.",
      yourName: "Ismingiz",
      writeReview: "Fikringizni yozing...",
      send: "Yuborish",
      applyBtn: "Ariza qoldirish",
      applyTitle: "Ariza yuborish",
      applyDesc: "bog'chasiga qabul uchun ariza qoldiring",
      parentName: "Ota-onaning ismi",
      parentNamePh: "Ismingiz",
      phonePh: "Telefon raqam",
      childName: "Farzandingiz ismi",
      childNamePh: "Ism",
      childAge: "Yoshi",
      childAgePh: "Yosh",
      submitApp: "Ariza yuborish",
      appSuccess: "Arizangiz muvaffaqiyatli yuborildi!",
      reviewSuccess: "Fikringiz muvaffaqiyatli yuborildi! U faqat bog'cha ma'muriyatiga ko'rinadi."
    },
    kgFilters: {
      district: "Tuman",
      language: "Ta'lim tili",
      all: "Barchasi",
      priceUpTo: "Narx (gacha)",
      listView: "Ro'yxat",
      mapView: "Xarita",
      details: "Batafsil"
    },
    mapPage: {
      title: "Interaktiv Bog'chalar Xaritasi 🗺️",
      subtitle: "O'zingizga qulay hududdagi eng yaxshi bog'chalarni toping",
      details: "Batafsil ko'rish"
    },
    heroExtra: {
      resultsFound: "ta natija topildi",
      first5Shown: "Birinchi 5 tasi ko'rsatilmoqda",
      nothingFound: "Hech narsa topilmadi"
    },
    misc: {
      loading: "Yuklanmoqda...",
      chatPlaceholder: "Yunusoboddagi ingliz tili bog'chalari..."
    },
    admin: {
      allKindergartens: "Barcha Bog'chalar",
      applications: "Arizalar",
      reviews: "Izohlar",
      crmTitle: "Bog'cha CRM",
      dashboardDesc: "Boshqaruv paneli",
      notifications: "Bildirishnomalar",
      newApp: "Yangi ariza:",
      newAppDesc: "Alisher M. dan ariza tushdi.",
      newReview: "Yangi izoh:",
      newReviewDesc: "\"Bog'cha judayam zo'r...\" (5 yulduz)",
      backToSite: "Saytga qaytish",
      confirmDelete: "Haqiqatan ham o'chirmoqchimisiz?",
      groupNameExample: "Guruh nomi (masalan: Lochin)"
    },
    auth: {
      enterEmailFirst: "Parolni tiklash uchun avval elektron pochtangizni kiriting.",
      socialNotReady: "orqali kirish hozircha tayyor emas",
      toggleLang: "Tilni o'zgartirish",
      toggleTheme: "Mavzuni o'zgartirish"
    }
  },
  ru: {
    favorites: {
      pageTitle: "Избранные сады",
      pageSubtitle: "Список сохранённых вами детских садов",
      emptyTitle: "Список избранного пуст",
      emptyDesc: "Вы пока не добавили ни одного детского сада в избранное.",
      viewKindergartens: "Посмотреть сады"
    },
    profile: {
      pageTitle: "Мой Профиль",
      fullName: "Ф.И.О",
      emailLabel: "Email адрес",
      phoneLabel: "Номер телефона",
      addressLabel: "Адрес проживания",
      cancel: "Отмена",
      save: "Сохранить",
      editProfile: "Редактировать данные",
      platformUser: "Пользователь платформы",
      saveSuccess: "Данные профиля успешно сохранены!"
    },
    myApps: {
      pageTitle: "Мои Заявки и Ежедневник",
      noApps: "Заявок нет",
      noAppsDesc: "Вы ещё не отправляли заявки ни в один детский сад. Выберите понравившийся из списка и оставьте заявку.",
      viewKindergartens: "Посмотреть сады",
      approved: "Принято",
      rejected: "Отклонено",
      pending: "Ожидание",
      yourChild: "Ваш ребёнок",
      yourName: "Ваше имя",
      yourPhone: "Ваш телефон",
      yearsOld: "лет",
      dailySchedule: "Расписание вашего ребёнка на сегодня (Демо)",
      clickToView: "Нажмите, чтобы увидеть расписание ⬇️",
      arrival: "Прибытие",
      arrivedDesc: "Принят в детский сад",
      breakfast: "Завтрак 🥣",
      breakfastDesc: "Овсяная каша и хлеб с маслом",
      lessonTime: "Время уроков 📚",
      lessonDesc: "Английский алфавит (Отлично)",
      playTime: "Время игр ⚽",
      playDesc: "Игры на свежем воздухе",
      lunch: "Обед 🍲",
      lunchDesc: "Мастава и фруктовый компот",
      napTime: "Тихий час 😴",
      napDesc: "Спокойный отдых"
    },
    detailExtra: {
      photoGallery: "Фото Галерея",
      leaveReview: "Оставить отзыв",
      reviewNote: "Ваш отзыв будет отправлен напрямую администрации детского сада и не будет опубликован.",
      yourName: "Ваше имя",
      writeReview: "Напишите ваш отзыв...",
      send: "Отправить",
      applyBtn: "Оставить заявку",
      applyTitle: "Отправить заявку",
      applyDesc: "Оставьте заявку на приём в детский сад",
      parentName: "Имя родителя",
      parentNamePh: "Ваше имя",
      phonePh: "Номер телефона",
      childName: "Имя ребёнка",
      childNamePh: "Имя",
      childAge: "Возраст",
      childAgePh: "Возраст",
      submitApp: "Отправить заявку",
      appSuccess: "Ваша заявка успешно отправлена!",
      reviewSuccess: "Ваш отзыв успешно отправлен! Он виден только администрации."
    },
    kgFilters: {
      district: "Район",
      language: "Язык обучения",
      all: "Все",
      priceUpTo: "Цена (до)",
      listView: "Список",
      mapView: "Карта",
      details: "Подробнее"
    },
    mapPage: {
      title: "Интерактивная Карта Детских Садов 🗺️",
      subtitle: "Найдите лучшие детские сады в удобном для вас районе",
      details: "Подробнее"
    },
    heroExtra: {
      resultsFound: "результатов найдено",
      first5Shown: "Показаны первые 5",
      nothingFound: "Ничего не найдено"
    },
    misc: {
      loading: "Загрузка...",
      chatPlaceholder: "Сады с английским в Юнусабаде..."
    },
    admin: {
      allKindergartens: "Все Детские Сады",
      applications: "Заявки",
      reviews: "Отзывы",
      crmTitle: "CRM Детского Сада",
      dashboardDesc: "Панель управления",
      notifications: "Уведомления",
      newApp: "Новая заявка:",
      newAppDesc: "Получена заявка от Алишера М.",
      newReview: "Новый отзыв:",
      newReviewDesc: "\"Сад просто отличный...\" (5 звёзд)",
      backToSite: "Вернуться на сайт",
      confirmDelete: "Вы уверены, что хотите удалить?",
      groupNameExample: "Название группы (например: Лочин)"
    },
    auth: {
      enterEmailFirst: "Для сброса пароля сначала введите вашу электронную почту.",
      socialNotReady: "вход пока не доступен",
      toggleLang: "Сменить язык",
      toggleTheme: "Сменить тему"
    }
  },
  en: {
    favorites: {
      pageTitle: "Favorite Kindergartens",
      pageSubtitle: "Your saved and liked kindergartens list",
      emptyTitle: "Favorites list is empty",
      emptyDesc: "You haven't added any kindergarten to your favorites yet.",
      viewKindergartens: "View Kindergartens"
    },
    profile: {
      pageTitle: "My Profile",
      fullName: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      addressLabel: "Home Address",
      cancel: "Cancel",
      save: "Save",
      editProfile: "Edit Profile",
      platformUser: "Platform User",
      saveSuccess: "Profile data saved successfully!"
    },
    myApps: {
      pageTitle: "My Applications & Daily Journal",
      noApps: "No applications yet",
      noAppsDesc: "You haven't submitted any application yet. Browse kindergartens and apply to one you like.",
      viewKindergartens: "View Kindergartens",
      approved: "Approved",
      rejected: "Rejected",
      pending: "Pending",
      yourChild: "Your child",
      yourName: "Your name",
      yourPhone: "Your phone",
      yearsOld: "years old",
      dailySchedule: "Your child's schedule for today (Demo)",
      clickToView: "Click to view the schedule ⬇️",
      arrival: "Arrival",
      arrivedDesc: "Accepted to kindergarten",
      breakfast: "Breakfast 🥣",
      breakfastDesc: "Oatmeal porridge and buttered bread",
      lessonTime: "Lesson Time 📚",
      lessonDesc: "English alphabet (Excellent)",
      playTime: "Play Time ⚽",
      playDesc: "Outdoor games",
      lunch: "Lunch 🍲",
      lunchDesc: "Soup and fruit compote",
      napTime: "Nap Time 😴",
      napDesc: "Quiet rest"
    },
    detailExtra: {
      photoGallery: "Photo Gallery",
      leaveReview: "Leave a Review",
      reviewNote: "Your review will be sent directly to the kindergarten administration and will not be published publicly.",
      yourName: "Your Name",
      writeReview: "Write your review...",
      send: "Send",
      applyBtn: "Apply Now",
      applyTitle: "Submit Application",
      applyDesc: "Apply for admission to the kindergarten",
      parentName: "Parent's Name",
      parentNamePh: "Your name",
      phonePh: "Phone number",
      childName: "Child's Name",
      childNamePh: "Name",
      childAge: "Age",
      childAgePh: "Age",
      submitApp: "Submit Application",
      appSuccess: "Your application has been submitted successfully!",
      reviewSuccess: "Your review has been submitted! It is only visible to the administration."
    },
    kgFilters: {
      district: "District",
      language: "Language",
      all: "All",
      priceUpTo: "Price (up to)",
      listView: "List",
      mapView: "Map",
      details: "Details"
    },
    mapPage: {
      title: "Interactive Kindergarten Map 🗺️",
      subtitle: "Find the best kindergartens in your preferred area",
      details: "View Details"
    },
    heroExtra: {
      resultsFound: "results found",
      first5Shown: "Showing first 5",
      nothingFound: "Nothing found"
    },
    misc: {
      loading: "Loading...",
      chatPlaceholder: "English-speaking kindergartens in Yunusabad..."
    },
    admin: {
      allKindergartens: "All Kindergartens",
      applications: "Applications",
      reviews: "Reviews",
      crmTitle: "Kindergarten CRM",
      dashboardDesc: "Control Panel",
      notifications: "Notifications",
      newApp: "New application:",
      newAppDesc: "Application received from Alisher M.",
      newReview: "New review:",
      newReviewDesc: "\"Great kindergarten...\" (5 stars)",
      backToSite: "Back to Site",
      confirmDelete: "Are you sure you want to delete?",
      groupNameExample: "Group name (e.g.: Eagle)"
    },
    auth: {
      enterEmailFirst: "To reset your password, please enter your email first.",
      socialNotReady: "login is not available yet",
      toggleLang: "Change language",
      toggleTheme: "Change theme"
    }
  }
};

for (const lang of ['uz', 'ru', 'en']) {
  const filePath = `src/locales/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Deep merge new keys
  for (const [section, keys] of Object.entries(newKeys[lang])) {
    if (!data[section]) data[section] = {};
    Object.assign(data[section], keys);
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated ' + filePath);
}

console.log('All locale files updated!');
