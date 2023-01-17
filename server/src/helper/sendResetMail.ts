import { Request, Response } from "express";
import { User } from "../db/sequelize/Sequelize";
import { transporter } from "../Nodemailer/nodemailer";

const sendResetMail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    console.log("should provide email");
    return res.status(400).json({ message: "should provide email" });
  }

  const user: any = await User.findOne({ where: { email: email } });

  const { hash_password, id } = user;
  console.log({ hash_password });
  if (!user) {
    console.log("not user with provided email found");
    return res.status(400).json({ message: "no email found" });
  }

  const message = {
    from: "donibanesalaire@outlook.fr",
    to: email,
    subject: "NodeMailer",
    text: `Bonjour ${user.prenom} ${user.nom} voici un lien pour réinitialiser 
    votre mot de passe http://localhost:5173/resetPassword/${id}/${hash_password}`,
    html: `<div>
    Bonjour ${user.prenom} ${user.nom}
    <div>voici un lien pour réinitialiser votre mot de passe</div>
    <button>
      <a href="http://localhost:5173/resetPassword/${id}/${hash_password}">reset</a>
    </button>
  </div>`,
  };

  try {
    await transporter.sendMail(message);
    console.log("message envoyé");
    res.json("Un email de reset de mot de passe a été envoyé");
  } catch (error) {
    console.error(error);
    res.json({ message: "un problème est survenu", error: error });
  }
};

export { sendResetMail };
