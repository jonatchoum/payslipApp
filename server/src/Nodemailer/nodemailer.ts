import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "donibanesalaire@outlook.fr",
    pass: "r&v-7^X6a=jwG=A",
  },
});

const testNodemailer = () => {
  transporter.verify(function (error, success) {
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

sendMail();

export { transporter, testNodemailer };
