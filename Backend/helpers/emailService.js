const nodemailer = require('nodemailer');

// Ensure credentials exist to avoid confusing PLAIN auth errors
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Missing email credentials: please set EMAIL_USER and EMAIL_PASS in Backend/.env');
} 

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify()
  .then(() => console.log('Email transporter is ready'))
  .catch(err => console.error('Email transporter error:', err && err.message ? err.message : err));

const sendResetEmail = async (toEmail, otp, name = '') => {
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.4;">
    <h2 style="color:#0b6efd;">Password Reset OTP</h2>
    <p>Hi ${name || 'there'},</p>
    <p>We received a request to reset the password for your account. Use the following One-Time Passcode (OTP) to reset your password. This OTP will expire in one hour.</p>
    <div style="text-align:center;margin:30px 0;">
      <div style="display:inline-block;padding:14px 18px;border-radius:8px;background:#f4f6fb;border:1px solid #e3e8ff;font-size:20px;letter-spacing:6px;font-weight:600;color:#0b6efd;">${otp}</div>
    </div>
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
    <hr />
    <p style="font-size:12px;color:#666;">This code will expire in 1 hour.</p>
  </div>
  `;

  const mailOptions = {
    from: `Sport Booking <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your Password Reset OTP',
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { transporter, sendResetEmail };
