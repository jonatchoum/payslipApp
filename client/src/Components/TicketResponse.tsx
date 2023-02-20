import { Divider, Loader } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetUser } from "../Hooks/useGetUsers";
import { useGetMessages } from "../Hooks/useTicket";

type TMessage = {
  admin: boolean;
  content?: string;
  createdAt?: string;
  id?: number;
  ticket_conversation_id?: number;
  updatedAt?: string;
  user_id: number;
};

const TicketResponse = () => {
  const { id } = useParams();
  const messages = useGetMessages(id);

  if (messages.isLoading) {
    return <Loader />;
  }
  if (messages.isError) {
    return <>Error</>;
  }

  const allMessages: TMessage[] = messages.data.data.data;

  const listMessages = allMessages.map((message: TMessage) => (
    <Message
      admin={message.admin}
      content={message.content}
      key={message.id}
      user_id={message.user_id}
    />
  ));

  return (
    <div>
      {/* <h3>TicketResponse</h3> */}
      <div>{listMessages}</div>
    </div>
  );
};

export default TicketResponse;

const Message = ({ admin, content, user_id }: TMessage) => {
  const user = useGetUser(user_id?.toString());

  if (user.isLoading) return <Loader />;
  if (user.isError) return <>Error</>;
  const username = user.data?.data?.data?.username;
  return (
    <div className="">
      <p>{admin ? "admin" : username}</p>
      <p>{content}</p>
      <Divider my="sm" />
    </div>
  );
};
