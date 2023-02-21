import { Request, Response } from "express";
import { Model, Sequelize } from "sequelize";
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
  try {
    const ticket: any = await Ticket.create({
      user_id: id,
      sujet: sujet,
      details: details,
    });

    const conversation: any = await TicketConversation.create({
      ticket_id: ticket.id,
    });

    // const message = await TicketMessage.create({
    //   user_id: id,
    //   ticket_conversation_id: conversation.id,
    //   admin: req.user.admin,
    //   content: details,
    // });

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
    res.json({
      message: "ticket bien envoyé !",
      data: { ticket: ticket, conversation: conversation },
    });
  } catch (error) {
    console.log(error);
    console.log(ticket);
    res.status(500).json({ message: "ticket non ajouté en DB", error: error });
  }
};
const getMyTickets = async (req: any, res: Response) => {
  const { id } = req.user;
  try {
    const tickets = await Ticket.findAll({ where: { user_id: id } });
    res.json({ message: "Tickets trouvé", data: tickets });
  } catch (error) {
    res.status(400).json({ error: error });
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

const postMessage = async (req: any, res: Response) => {
  const { id } = req.params;
  const { reply } = req.body;
  const userEmail = req.user.email;

  if (!reply) {
    return res.status(400).json("la réponse ne doit pas être vite");
  }
  try {
    const conversation: any = await TicketConversation.findOne({
      where: { ticket_id: id },
    });

    const user: any = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json("No user");
    }

    const replyMessage = await TicketMessage.create({
      user_id: req.user.id,
      ticket_conversation_id: conversation.id,
      admin: req.user.admin,
      content: reply,
    });

    const messageToSupport = {
      from: "info@sareasoft.com",
      to: "info@sareasoft.com",
      subject: `Nouveau message de ${user.username}`,
      html: `<div>
            <div>${user.username.toUpperCase()} vient d'envoyer un message</div>
            <div>Son adresse mail est ${user.email}</div>
            <div>Voici son message :</div>
            <div>${reply}</div>
          </div>`,
    };

    await transporter.sendMail(messageToSupport);

    const messageUser = {
      from: "info@sareasoft.com",
      to: `${userEmail}`,
      subject: `Récap ticket`,
      html: `<div>
          <div>${user.username.toUpperCase()},<br/>
          Vous venez d'envoyer le message suivant au support de Sareasoft : </div>
          <div>${reply}</div>
        </div>`,
    };

    await transporter.sendMail(messageUser);

    console.log("📫📫📫📫📫📫📫📫📫📫📫");

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
  postMessage,
  getConversation,
  getMessagesFromTicket,
  getMyTickets,
};
