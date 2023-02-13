import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT as string),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: parseInt(process.env.MAIL_PORT as string),
//   secure: false, // upgrade later with STARTTLS
// });

const testNodemailer = () => {
  transporter.verify(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("📧 Server is ready to take our messages");
    }
  });
};

// testNodemailer();

const message = {
  from: "info@sareasoft.com",
  to: "donisalaire@yopmail.com",
  subject: "NodeMailer",
  text: "Encore",
};

const sendMail = async () => {
  try {
    await transporter.sendMail(message);
    console.log("message envoyé");
  } catch (error) {
    console.error(error);
  }
};

// sendMail();

export { transporter, testNodemailer, sendMail };
