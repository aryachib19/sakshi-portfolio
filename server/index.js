const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// In-memory store for messages (replace with a real DB in production)
const messages = [];

// POST /api/contact — receive contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    receivedAt: new Date().toISOString(),
  };

  messages.push(entry);

  console.log(`[Contact] New message from ${name} <${email}>: "${subject}"`);

  // In production you'd send an email here via Nodemailer/SendGrid/Resend.
  // Example stub:
  // await sendEmail({ to: 'sakshichib5@gmail.com', ...entry });

  return res.status(200).json({ success: true, message: 'Message received!' });
});

// GET /api/messages — optional admin view (protect with auth in production)
app.get('/api/messages', (req, res) => {
  res.json({ count: messages.length, messages });
});

// Serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Sakshi Chib Portfolio server running on http://localhost:${PORT}`);
});
