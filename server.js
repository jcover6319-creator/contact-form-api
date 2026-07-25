const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});


// Contact form API
app.post("/api/contact", async (req, res) => {

  const { name, email, message } = req.body;

  console.log("📩 New Contact Message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);


  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required ❌"
    });
  }


  try {

    require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


    const mailOptions = {
  from: '"🔥1800🔥" <jcover6319@gmail.com>',
  replyTo: email,
  to: "jcover6319@atomicmail.io",
  subject: "📧New Contact Form Message📧",

  text: `
Name: ${name}

Email: ${email}

Message:
${message}
`
};


    await transporter.sendMail(mailOptions);


    console.log("✅ Email sent successfully");


    res.json({
      message: "Message sent successfully ✅"
    });


  } catch (error) {

    console.error("❌ EMAIL ERROR:");
    console.error(error);


    res.status(500).json({
      message: "Failed to send message ❌",
      error: error.message
    });

  }

});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});