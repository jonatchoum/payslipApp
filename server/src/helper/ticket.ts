import { Response } from "express";
import { sequelize } from "../db/sequelize/Sequelize";
import { Ticket, User } from "../db/sequelize/Sequelize";
import { transporter } from "../Nodemailer/nodemailer";

const ticket = async (req: any, res: Response) => {
  const { id } = req.user;

  const { sujet, details } = req.body;

  console.log(id, sujet, details);

  try {
    const ticket = await Ticket.create({
      user_id: id,
      sujet: sujet,
      details: details,
    });

    console.log(ticket);

    const user: any = await User.findByPk(id);

    console.log(
      user.username,
      "vient d'envoyer un ticket, son email est  : ",
      user.email
    );

    const message = {
      from: "info@sareasoft.com",
      to: "info@sareasoft.com",
      subject: `Nouveau ticket de ${user.username}`,
      html: `<div>
            <div>${user.username} vient d'envoyer un ticket</div>
            <div>son adresse mail est ${user.email}</div>
            <div>sujet : ${sujet}</div>
            <div>details : ${details}</div>
          </div>`,
    };

    await transporter.sendMail(message);
    console.log("message envoyé");

    res.json({ message: "ticket bien envoyé !", data: { ticket } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ticket non ajouté en DB", error: error });
  }
};

export { ticket };
