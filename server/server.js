const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
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
      name: "NEXUS GAMING",
      address: process.env.EMAIL_USER
    },
    to: email,
    replyTo: `"Nexus Gaming Support" <${process.env.EMAIL_USER}>`,
    subject: `[NEXUS GAMING] Tizimga kirish kodi: ${code}`,
    text: `NEXUS GAMING platformasiga kirish uchun tasdiqlash kodingiz: ${code}\n\nUshbu kod 5 daqiqa davomida amal qiladi. Uni hech kimga bermang.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; background-color: #0b0f19; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0, 240, 255, 0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
        <div style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 30px 24px; text-align: center;">
          <h1 style="color: #000000; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 2px;">NEXUS<span style="color: #ffffff;">GAMING</span></h1>
          <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Xavfsiz Tizimga Kirish</p>
        </div>
        
        <div style="padding: 32px 24px; text-align: center; color: #e2e8f0;">
          <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            Salom! <strong>NEXUS GAMING</strong> hisobingizga kirishni yakunlash uchun bir martalik 6 xonali tasdiqlash kodidan foydalaning:
          </p>
          
          <div style="background-color: #111827; border: 2px solid #00f0ff; border-radius: 12px; padding: 18px 24px; margin: 0 auto 24px auto; display: inline-block; box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);">
            <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #00f0ff; font-family: monospace;">${code}</span>
          </div>
          
          <p style="color: #64748b; font-size: 13px; margin: 0 0 24px 0; line-height: 1.5;">
            ⏱ Ushbu kod <strong>5 daqiqa</strong> davomida amal qiladi.<br />
            Xavfsizlik maqsadida bu kodni hech kim bilan bo'lishmang.
          </p>
          
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; color: #64748b; font-size: 12px;">
            Agar bu so'rovni siz bajarmagan bo'lsangiz, ushbu xabarni e'tiborsiz qoldiring.
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
