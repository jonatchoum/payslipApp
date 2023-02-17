import { Request, Response } from "express";
import { Ticket, User } from "../db/sequelize/Sequelize";
import { transporter } from "../Nodemailer/nodemailer";

const ticket = async (req: any, res: Response) => {
  const { id } = req.user;

  const { sujet, details } = req.body;

  console.log(id, sujet, details);

  const ticket: any = await Ticket.create({
    user_id: id,
    sujet: sujet,
    details: details,
  });

  try {
    console.log(ticket);

    const user: any = await User.findByPk(id);

    console.log(
      user.username,
      "vient d'envoyer un ticket, son email est  : ",
      user.email
    );

    const messageTicket = {
      from: "info@sareasoft.com",
      to: "info@sareasoft.com",
      subject: `Nouveau ticket de ${user.username}`,
      html: `<div>
            <div>${user.username} vient d'envoyer un ticket</div>
            <div>Son adresse mail est ${user.email}</div>
            <div>Sujet : ${sujet}</div>
            <div>Détails :<br/>
             ${details}</div>
          </div>`,
    };

    await transporter.sendMail(messageTicket);
    console.log("message ticket envoyé");

    const messageUser = {
      from: "info@sareasoft.com",
      to: `${user.email}`,
      subject: `Nouveau ticket de ${user.username}`,
      html: `<div>
          <div>${user.username},<br/>
          Voici un récapitulatif de votre ticket</div>
          <div>Sujet : ${sujet}</div>
          <div>Détails :
          <br/> ${details}</div>
        </div>`,
    };

    await transporter.sendMail(messageUser);
    console.log("message user envoyé");
    res.json({ message: "ticket bien envoyé !", data: { ticket } });
  } catch (error) {
    console.log(error);
    console.log(ticket);
    res.status(500).json({ message: "ticket non ajouté en DB", error: error });
  }
};

const getAllTickets = async (req: Request, res: Response) => {
  const tickets = await Ticket.findAll();
  res.json({ message: "voici tous les tickets ", data: tickets });
};

const getTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "no ticket found" });
    }
    res.json({ message: "ticket found", data: ticket });
  } catch (error) {
    res.status(501).json({ message: "no ticket found", error: error });
  }
};

const updateTicketStatus = async (req: Request, res: Response) => {
  const { ticket_id, status } = req.body;
  try {
    const ticket = await Ticket.update(
      { open: status },
      { where: { id: ticket_id } }
    );
    res.json({ message: "ticket updated !", data: ticket });
  } catch (error) {
    res.status(501).json({ message: "couldnt update ticket", data: ticket });
  }
};

export { ticket, getAllTickets, updateTicketStatus, getTicket };