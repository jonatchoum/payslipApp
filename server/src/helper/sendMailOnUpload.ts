// const message = `Un nouveau bulletin de salaire est disponible`;
import { User } from "../db/sequelize/Sequelize";
import { transporter } from "../Nodemailer/nodemailer";
import { currentMonthYear } from "./date";

const sendMailOnUpload = async (user_id: number, date: string) => {
  const user: any = await User.findOne({ where: { id: user_id } });

  if (user) {
    console.log(user.email);
  }

  const message = {
    from: "donibanesalaire@outlook.fr",
    to: user.email,
    subject: "Nouveau bulletin de salaire disponible",
    html: `<div>
          Bonjour ${user.prenom} ${user.nom}
          <div>Votre bulletin de salaire de ${currentMonthYear(
            date
          )} est désormais disponible au téléchargement</div>
          <div>Le fichier est accessible depuis <a href="http://localhost:5173/">ce lien</a></div> 
        </div>`,
  };

  try {
    await transporter.sendMail(message);
    console.log("message envoyé");
  } catch (error) {
    console.error(error);
  }
};

export { sendMailOnUpload };
