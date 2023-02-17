import { Loader } from "@mantine/core";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import { useGetTicketById } from "../Hooks/useTicket";

const TicketById = () => {
  const { id } = useParams();

  if (!id) return <>No id</>;

  type Ticket = {
    id: string;
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
      <UserInfo id={currentTicket.user_id} />
      <p>Sujet : {currentTicket.sujet}</p>
      <p>Details : {currentTicket.details}</p>
    </div>
  );
};

const UserInfo = (props: { id: string }) => {
  const user = queryUser(props.id);

  if (user.isLoading) return <Loader />;
  if (user.isError) return <>Error</>;

  const currentUser = user.data;
  console.log(currentUser);
  return (
    <>
      <p>
        De : {currentUser?.prenom} {currentUser?.nom}
      </p>
      <p>Email : {currentUser?.email}</p>
    </>
  );
};

export default TicketById;
