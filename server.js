const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: [
        "'self'",
        "https://*.firebase.com",
        "https://*.firebaseio.com",
        "https://*.firebaseapp.com",
        "https://api.github.com",
        "https://api.linkedin.com",
        "https://api.twitter.com"
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: [
        "'self'",
        "https://accounts.google.com",
        "https://github.com",
        "https://platform.twitter.com",
        "https://www.facebook.com"
      ],
    },
  },
}));

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Compression middleware
app.use(compression());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Webhook endpoint
app.post('/api/webhook/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    
    // Log webhook request
    console.log(`Webhook received for ID: ${id}`, payload);
    
    // Process webhook based on type
    switch(payload.type) {
      case 'user.created':
        // Handle user creation
        break;
      case 'user.updated':
        // Handle user update
        break;
      case 'subscription.updated':
        // Handle subscription update
        break;
      default:
        console.log('Unknown webhook type:', payload.type);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ success: false, error: 'Failed to process webhook' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
