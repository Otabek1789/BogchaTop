const fs = require('fs');

const extras = {
  uz: {
    stateKg: "Davlat bog'chalari",
    privateKg: "Xususiy bog'chalar",
    englishKg: "Ingliz tiliga ixtisoslashgan",
    sportKg: "Sportga ixtisoslashgan",
    kgTypeAnalytics: "Bog'chalar Turlari Bo'yicha Analitika",
    incomeDynamics: "Tushum dinamikasi",
    newAppYashnobod: "Yangi Ariza: Yashnobod",
    newAppYashnobodDesc: "Yashnoboddagi bog'cha filialiga 3 ta yangi ota-ona ariza qoldirdi. Hozir tekshiring.",
    income: "Tushum",
    financeDynamics: "Moliya dinamikasi (Kirim va Chiqim)",
    incomeLabel: "Kirim",
    expenseLabel: "Chiqim",
    sendReceipt: "Kvitansiya yuborish"
  },
  ru: {
    stateKg: "Государственные сады",
    privateKg: "Частные сады",
    englishKg: "Специализация: Английский",
    sportKg: "Специализация: Спорт",
    kgTypeAnalytics: "Аналитика по видам садов",
    incomeDynamics: "Динамика доходов",
    newAppYashnobod: "Новая заявка: Яшнабад",
    newAppYashnobodDesc: "3 новых родителя подали заявку в Яшнабадский филиал. Проверьте сейчас.",
    income: "Доход",
    financeDynamics: "Финансовая динамика (Доход и Расход)",
    incomeLabel: "Доход",
    expenseLabel: "Расход",
    sendReceipt: "Отправить квитанцию"
  },
  en: {
    stateKg: "State Kindergartens",
    privateKg: "Private Kindergartens",
    englishKg: "English Specialized",
    sportKg: "Sports Specialized",
    kgTypeAnalytics: "Kindergarten Type Analytics",
    incomeDynamics: "Income Dynamics",
    newAppYashnobod: "New App: Yashnobod",
    newAppYashnobodDesc: "3 new parents applied to the Yashnobod branch. Check now.",
    income: "Income",
    financeDynamics: "Finance Dynamics (Income and Expense)",
    incomeLabel: "Income",
    expenseLabel: "Expense",
    sendReceipt: "Send Receipt"
  }
};

for (const lang of ['uz', 'ru', 'en']) {
  const p = `src/locales/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.adminExtra = extras[lang];
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

const replaces = [
  {
    file: 'src/pages/admin/FinanceTab.jsx',
    replacements: [
      { from: "Moliya dinamikasi (Kirim va Chiqim)", to: "{t('adminExtra.financeDynamics')}" },
      { from: 'name="Kirim"', to: 'name={t("adminExtra.incomeLabel")}' },
      { from: 'name="Chiqim"', to: 'name={t("adminExtra.expenseLabel")}' }
    ]
  },
  {
    file: 'src/pages/admin/DashboardTab.jsx',
    replacements: [
      { from: "'admin.stateKg'", to: "'adminExtra.stateKg'" },
      { from: "'admin.privateKg'", to: "'adminExtra.privateKg'" },
      { from: "'admin.englishKg'", to: "'adminExtra.englishKg'" },
      { from: "'admin.sportKg'", to: "'adminExtra.sportKg'" },
      { from: "'admin.kgTypeAnalytics'", to: "'adminExtra.kgTypeAnalytics'" },
      { from: "'admin.incomeDynamics'", to: "'adminExtra.incomeDynamics'" },
      { from: "'admin.newAppYashnobod'", to: "'adminExtra.newAppYashnobod'" },
      { from: "'admin.newAppYashnobodDesc'", to: "'adminExtra.newAppYashnobodDesc'" },
      { from: "'admin.income'", to: "'adminExtra.income'" }
    ]
  }
];

for (const r of replaces) {
  let c = fs.readFileSync(r.file, 'utf8');
  for (const rep of r.replacements) {
    c = c.replace(rep.from, rep.to);
  }
  fs.writeFileSync(r.file, c, 'utf8');
}

console.log("Done");
