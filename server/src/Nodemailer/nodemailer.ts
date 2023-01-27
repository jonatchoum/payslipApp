import nodemailer from "nodemailer";

// let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT as string),
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
