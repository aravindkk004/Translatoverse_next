import nodemailer from "nodemailer";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { text, userEmail } = await req.json(); // Parse the JSON body from the request
        console.log(userEmail);
        console.log(text)
      // Create a transporter for sending email
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail (or other services like Outlook)
        auth: {
          user: process.env.EMAIL_USER, // Admin email (for sending emails from)
          pass: process.env.EMAIL_PASS, // Admin email password (or app-specific password)
        },
      });

      // Email message options
      const mailOptions = {
        from: process.env.EMAIL_USER, // Admin email (as the sender)
        to: process.env.ADMIN_EMAIL, // Admin's email (where the feedback will be sent)
        subject: "User Feedback on Translation", // Subject line
        text: `Feedback from user: \n\n${text}`, // Feedback content from the user
        replyTo: userEmail,// Feedback content from the user
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send success response
      return new Response(JSON.stringify({ message: "Email sent successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Send error response
      return new Response(JSON.stringify({ message: "Error sending email" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else {
    // If not a POST request, return 405 method not allowed
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
