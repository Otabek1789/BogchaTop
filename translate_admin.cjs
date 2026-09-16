const fs = require('fs');
const path = require('path');

const replacers = [
  {
    file: 'src/pages/admin/DashboardTab.jsx',
    replacements: [
      { from: "'Davlat bog\\'chalari'", to: "t('admin.stateKg')" },
      { from: "'Xususiy bog\\'chalar'", to: "t('admin.privateKg')" },
      { from: "'Ingliz tiliga ixtisoslashgan'", to: "t('admin.englishKg')" },
      { from: "'Sportga ixtisoslashgan'", to: "t('admin.sportKg')" },
      { from: "Bog'chalar Turlari Bo'yicha Analitika", to: "{t('admin.kgTypeAnalytics')}" },
      { from: "(Tushum dinamikasi)", to: "({t('admin.incomeDynamics')})" },
      { from: "Yangi Ariza: Yashnobod", to: "{t('admin.newAppYashnobod')}" },
      { from: "Yashnoboddagi bog'cha filialiga 3 ta yangi ota-ona ariza qoldirdi. Hozir tekshiring.", to: "{t('admin.newAppYashnobodDesc')}" },
      { from: "'Tushum'", to: "t('admin.income')" }
    ]
  },
  {
    file: 'src/pages/admin/ChildrenTab.jsx',
    replacements: [
      { from: "'Lochin guruhi'", to: "t('crm.eagleGroup')" },
      { from: "'Kichiktoy guruhi'", to: "t('crm.kidGroup')" },
      { from: "'Quyoshcha'", to: "t('crm.sunGroup')" },
      { from: "\"Haqiqatan ham o'chirmoqchimisiz?\"", to: "t('crm.confirmDelete')" },
      { from: "+ \" (Tahrirlash)\"", to: "+ \" (\" + t('crm.edit') + \")\"" },
      { from: "\"Ism Familiya\"", to: "t('crm.fullName')" },
      { from: "\"Guruh nomi (masalan: Lochin)\"", to: "t('crm.groupNameExample')" },
      { from: "\"Yoshi\"", to: "t('crm.age')" },
      { from: "\"Ota-ona F.I.O\"", to: "t('crm.parent')" },
      { from: "\"Telefon raqam\"", to: "t('crm.phone')" }
    ]
  },
  {
    file: 'src/pages/admin/AttendanceTab.jsx',
    replacements: [
      { from: "Bugun:", to: "{t('crm.today')}" },
      { from: "'Lochin guruhi'", to: "t('crm.eagleGroup')" },
      { from: "'Kichiktoy guruhi'", to: "t('crm.kidGroup')" }
    ]
  }
];

for (const r of replacers) {
  const filePath = path.join(__dirname, r.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const repl of r.replacements) {
      content = content.replace(repl.from, repl.to);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + r.file);
  }
}
