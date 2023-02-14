import { Request, Response } from "express";
import { User } from "../db/sequelize/Sequelize";
import { transporter } from "../Nodemailer/nodemailer";
import jwt from "jsonwebtoken";

const sendResetMail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    console.log("should provide email");
    return res.status(400).json({ message: "should provide email" });
  }

  const user: any = await User.findOne({ where: { email: email } });

  if (!user) {
    console.log("not user with provided email found");
    return res.status(400).json({ message: "no email found" });
  }

  const { hash_password, id } = user;
  console.log({ hash_password });

  const token = jwt.sign(hash_password, email);
  console.log("🚀 ~ file: sendResetMail.ts:24 ~ sendResetMail ~ token", token);

  const message = {
    from: "info@sareasoft.com",
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    text: `Bonjour ${user.prenom} ${user.nom} voici un lien pour réinitialiser 
    votre mot de passe ${process.env.CLIENT_URL}/resetPassword/${id}/${token}`,
    html: `<div>
    Bonjour ${user.prenom} ${user.nom}
    <div>voici un lien pour réinitialiser votre mot de passe</div>
    <button>
      <a href="${process.env.CLIENT_URL}/resetPassword/${id}/${token}">reset</a>
    </button>
  </div>`,
  };

  try {
    await transporter.sendMail(message);
    console.log("message envoyé");
    res.json("Un email de reset de mot de passe a été envoyé");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "un problème est survenu", error: error });
  }
};

export { sendResetMail };
