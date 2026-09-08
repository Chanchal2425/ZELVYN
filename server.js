require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// Helper Functions (Declared First)
// --------------------------------------------------

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --------------------------------------------------
// Middleware & Static Assets
// --------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from root directory
app.use(express.static(__dirname));

// --------------------------------------------------
// Page Routes
// --------------------------------------------------

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/privacy-policy", (req, res) => res.sendFile(path.join(__dirname, "privacy-policy.html")));
app.get("/terms-of-service", (req, res) => res.sendFile(path.join(__dirname, "terms-of-service.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "about.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "contact.html")));
app.get("/pricing", (req, res) => res.sendFile(path.join(__dirname, "pricing.html")));
app.get("/process", (req, res) => res.sendFile(path.join(__dirname, "process.html")));
app.get("/projects", (req, res) => res.sendFile(path.join(__dirname, "projects.html")));
app.get("/services", (req, res) => res.sendFile(path.join(__dirname, "services.html")));

// --------------------------------------------------
// Gmail Transporter
// --------------------------------------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// --------------------------------------------------
// Contact Form API
// --------------------------------------------------

app.post("/api/contact", async (req, res) => {
  try {
    const {
      fullName,
      email,
      companyName,
      service,
      budget,
      timeline,
      projectDescription,
      submittedAt,
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter your full name.",
      });
    }

    if (!email || !isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!service || !service.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select a service.",
      });
    }

    if (!budget || !budget.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select a budget.",
      });
    }

    if (!projectDescription || !projectDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please describe your project.",
      });
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanCompany = companyName ? companyName.trim() : "Not provided";
    const cleanService = service.trim();
    const cleanBudget = budget.trim();
    const cleanTimeline = timeline ? timeline.trim() : "Not provided";
    const cleanDescription = projectDescription.trim();
    const cleanSubmittedAt = submittedAt ? submittedAt : new Date().toISOString();

    const subject = `New ZELVYN AI Project Inquiry — ${cleanService}`;

    const text = `
NEW ZELVYN AI PROJECT INQUIRY
==============================

Name: ${cleanName}
Email: ${cleanEmail}
Company: ${cleanCompany}
Service: ${cleanService}
Budget: ${cleanBudget}
Timeline: ${cleanTimeline}

Project Description:
${cleanDescription}

Submitted At: ${cleanSubmittedAt}
==============================
This message was submitted through the ZELVYN AI website contact form.
`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New ZELVYN AI Project Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:700px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="padding:28px 30px;background:#111111;color:#ffffff;">
      <h1 style="margin:0;font-size:24px;">New ZELVYN AI Project Inquiry</h1>
      <p style="margin:8px 0 0;color:#bdbdbd;font-size:14px;">New submission from your website contact form</p>
    </div>
    <div style="padding:30px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;font-weight:bold;width:180px;">Name</td>
          <td style="padding:12px 0;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;font-weight:bold;">Email</td>
          <td style="padding:12px 0;"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td>
        </tr>
        <tr>
          <td style="padding:12px 0;font-weight:bold;">Company</td>
          <td style="padding:12px 0;">${escapeHtml(cleanCompany)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;font-weight:bold;">Service</td>
          <td style="padding:12px 0;">${escapeHtml(cleanService)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;font-weight:bold;">Budget</td>
          <td style="padding:12px 0;">${escapeHtml(cleanBudget)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;font-weight:bold;">Timeline</td>
          <td style="padding:12px 0;">${escapeHtml(cleanTimeline)}</td>
        </tr>
      </table>
      <div style="margin-top:25px;padding:20px;background:#f7f7f7;border-radius:8px;">
        <h3 style="margin-top:0;">Project Description</h3>
        <p style="margin-bottom:0;line-height:1.7;white-space:pre-wrap;">${escapeHtml(cleanDescription)}</p>
      </div>
      <p style="margin-top:25px;font-size:12px;color:#777;">Submitted at: ${escapeHtml(cleanSubmittedAt)}</p>
    </div>
  </div>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"ZELVYN AI Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO || process.env.GMAIL_USER,
      replyTo: cleanEmail,
      subject,
      text,
      html,
    });

    console.log(`New contact form submission from ${cleanName} <${cleanEmail}>`);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again.",
    });
  }
});

// --------------------------------------------------
// Catch-All 404 Route
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("");
    console.log("========================================");
    console.log("       ZELVYN AI SERVER RUNNING");
    console.log("========================================");
    console.log("");
    console.log(`Website: http://localhost:${PORT}/`);
    console.log(`Contact API: http://localhost:${PORT}/api/contact`);
    console.log("");
  });
}

module.exports = app;