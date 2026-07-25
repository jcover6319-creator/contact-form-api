require("dotenv").config();

const express = require("express");
const cors = require("cors");
const brevo = require("@getbrevo/brevo");

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

    const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendSmtpEmail = new brevo.SendSmtpEmail();

sendSmtpEmail.sender = {
  email: process.env.FROM_EMAIL,
  name: "🔥1800🔥"
};

sendSmtpEmail.to = [
  {
    email: process.env.TO_EMAIL
  }
];

sendSmtpEmail.subject = "📧New Contact Form Message📧";

sendSmtpEmail.htmlContent = `
<h2>New Contact Message</h2>

<p><strong>Name:</strong> ${name}</p>

<p><strong>Email:</strong> ${email}</p>

<p><strong>Message:</strong></p>

<p>${message}</p>
`;

await apiInstance.sendTransacEmail(sendSmtpEmail);

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