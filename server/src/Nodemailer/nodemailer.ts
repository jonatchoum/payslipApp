import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false, // upgrade later with STARTTLS
});

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
  from: "donibanesalaire@outlook.fr",
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
