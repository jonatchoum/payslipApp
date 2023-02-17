import { Loader } from "@mantine/core";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import { useGetTicketById } from "../Hooks/useTicket";

const TicketById = () => {
  const { id } = useParams();

  if (!id) return <>No id</>;

  type Ticket = {
    id: number;
    sujet: string;
    open: boolean;
    user_id: string;
    createdAt: string;
    details: string;
  };

  const ticket = useGetTicketById(id);

  if (ticket.isLoading) return <Loader />;
  if (ticket.isError) return <>Error</>;
  const currentTicket: Ticket = ticket.data.data.data;

  console.log(ticket.data?.data?.data);

  return (
    <div>
      <h2>Ticket n°{id}</h2>
      <p>Status : {currentTicket.open ? "ouvert" : "fermé"}</p>
      <UserInfo />
      <p>Sujet : {currentTicket.sujet}</p>
      <p>Details : {currentTicket.details}</p>
    </div>
  );
};

const UserInfo = () => {
  const user = queryUser("1");

  if (user.isLoading) return <Loader />;
  if (user.isError) return <>Error</>;

  const currentUser = user.data;
  console.log(currentUser);
  return (
    <>
      <p>De : {currentUser?.nom}</p>
      <p>Email : {currentUser?.email}</p>
    </>
  );
};

export default TicketById;
