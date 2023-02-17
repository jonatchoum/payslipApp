import { Request, Response } from "express";
import {
  Ticket,
  TicketConversation,
  TicketMessage,
  User,
} from "../db/sequelize/Sequelize";
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

  await TicketConversation.create({ ticket_id: ticket.id });

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
  const { id } = req.params;
  const ticket: any = await Ticket.findByPk(id);
  if (!ticket) return res.status(404).json({ message: "ticket not found!" });
  ticket.update({ open: !ticket.open });
  res.json({ message: "Le ticket a changé de status", data: ticket });
};

const ticketResponse = async (req: any, res: Response) => {
  const { id } = req.params;
  const { reply } = req.body;
  try {
    const conversation: any = await TicketConversation.findOne({
      where: { ticket_id: id },
    });

    const replyMessage = await TicketMessage.create({
      user_id: req.user.id,
      ticket_conversation_id: conversation.id,
      admin: req.user.admin,
      content: reply,
    });

    res.json({
      message: "vous avez bien répondu à la conversation",
      data: { conversation: conversation, replyMessage: replyMessage },
    });
  } catch (error) {
    res.status(404).json({ message: "cant respond" });
  }
};

const getConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const conversation = await TicketConversation.findOne({
    where: { ticket_id: id },
  });
  if (!conversation)
    return res.status(404).json({ message: "no conversation found" });
  res.json({ message: "conversation found", data: conversation });
};

const getMessagesFromConversationId = async (conversation_id: any) => {
  return await TicketMessage.findAll({
    where: { ticket_conversation_id: conversation_id },
  });
};

const getConversationIdFromTicketId = async (ticket_id: any) => {
  const conversation: any = await TicketConversation.findOne({
    where: { ticket_id: ticket_id },
  });
  return conversation.id;
};

const getMessagesFromTicket = async (req: Request, res: Response) => {
  //intended route /api/tickets/:id/messages
  const { id } = req.params;
  try {
    const conversation_id = await getConversationIdFromTicketId(id);
    const messages = await getMessagesFromConversationId(conversation_id);
    res.json({ message: "voici les messages de la conv", data: messages });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export {
  ticket,
  getAllTickets,
  updateTicketStatus,
  getTicket,
  ticketResponse,
  getConversation,
  getMessagesFromTicket,
};
