require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for OTPs (In production, use Redis or Database)
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: "Elektron pochta manzili kiritilmadi" });
  }

  // Generate a 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { code, expires: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiration

  const mailOptions = {
    from: {
      name: "Bog'chaTop",
      address: process.env.EMAIL_USER
    },
    to: email,
    replyTo: `"Bog'chaTop Qo'llab-quvvatlash" <${process.env.EMAIL_USER}>`,
    subject: `[Bog'chaTop] Kirish uchun tasdiqlash kodi: ${code}`,
    text: `Bog'chaTop platformasiga kirish uchun tasdiqlash kodingiz: ${code}\n\nUshbu kod 5 daqiqa davomida amal qiladi. Hech kimga bermang.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Bog'cha<span style="color: #f59e0b;">Top</span></h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Tizimga kirish uchun tasdiqlash kodi</p>
        </div>
        
        <div style="padding: 32px 24px; text-align: center;">
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            Salom! <strong>Bog'chaTop</strong> platformasiga kirish uchun quyidagi bir martalik tasdiqlash kodidan foydalaning:
          </p>
          
          <div style="background-color: #f8fafc; border: 2px dashed #6366f1; border-radius: 12px; padding: 18px 24px; margin: 0 auto 24px auto; display: inline-block;">
            <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; font-family: monospace;">${code}</span>
          </div>
          
          <p style="color: #64748b; font-size: 13px; margin: 0 0 24px 0; line-height: 1.5;">
            ⏱ Ushbu kod <strong>5 daqiqa</strong> davomida amal qiladi.<br />
            Xavfsizlik maqsadida bu kodni hech kimga bermang.
          </p>
          
          <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; color: #94a3b8; font-size: 12px;">
            Agar bu so'rovni siz yubormagan bo'lsangiz, ushbu xatni shunchaki e'tiborsiz qoldiring.
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Kod ${email} manziliga yuborildi: ${code}`);
    res.json({ success: true, message: "Kod pochtangizga yuborildi!" });
  } catch (error) {
    console.error('Xat yuborishda xatolik:', error);
    res.status(500).json({ success: false, error: "Xat yuborishda xatolik yuz berdi. Pochtani yoki sozlamalarni tekshiring." });
  }
});

app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, error: "Ma'lumotlar to'liq emas" });
  }

  const storedData = otpStore[email];

  if (!storedData) {
    return res.status(400).json({ success: false, error: "Kod yuborilmagan yoki muddati o'tgan" });
  }

  if (Date.now() > storedData.expires) {
    delete otpStore[email];
    return res.status(400).json({ success: false, error: "Kodning muddati tugagan. Qaytadan so'rang." });
  }

  if (storedData.code === code) {
    delete otpStore[email]; // Clear code after successful verification
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Kod noto'g'ri. Qaytadan tekshiring." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
