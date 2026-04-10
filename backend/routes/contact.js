const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

// @desc    Send contact form message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }

  try {
    // Send email to admin
    await sendEmail({
      email: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      message: `You have a new contact form message from ${name} (${email}, ${phone || 'N/A'}):\n\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ success: false, message: 'Server Error: Could not send email' });
  }
});

module.exports = router;
