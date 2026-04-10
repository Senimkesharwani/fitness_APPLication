const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter with explicit Gmail SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Elite Fitness'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('✅ Email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Nodemailer Error Log:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    if (error.response) console.error('Response:', error.response);
    throw error; // Re-throw to be caught in controller
  }
};

module.exports = sendEmail;
