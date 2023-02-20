import { Button, Card, Loader } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import PostMessage from "../Components/PostMessage";
import TicketResponse from "../Components/TicketResponse";
import queryUser from "../Hooks/queryUser";
import { useChangeStatus, useGetTicketById } from "../Hooks/useTicket";

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
  const mutation = useChangeStatus();

  if (ticket.isLoading) return <Loader />;
  if (ticket.isError) return <>Error</>;
  const currentTicket: Ticket = ticket.data.data.data;

  const handleClick = () => {
    // alert("clicker");
    mutation.mutate(currentTicket.id);
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="max-w-2xl w-full mx-auto"
    >
      <div>
        <div className="flex place-items-center place-content-between">
          <h2>Ticket n°{id}</h2>
        </div>
        <p>
          <span className="font-bold">Status</span> :{" "}
          {currentTicket.open ? "ouvert" : "fermé"}
        </p>
        <UserInfo id={currentTicket.user_id} />
        <p>
          <span className="font-bold">Sujet</span> : {currentTicket.sujet}
        </p>
        <p>
          <span className="font-bold">Détails</span> :<br />{" "}
          {currentTicket.details}
        </p>
      </div>
      <TicketResponse />
      <PostMessage />
    </Card>
  );
};

const UserInfo = (props: { id: string }) => {
  const user = queryUser(props.id);

  if (user.isLoading) return <Loader />;
  if (user.isError) return <>Error</>;

  const currentUser = user.data;
  return (
    <>
      <p>
        <span className="font-bold">De</span> : {currentUser?.prenom}{" "}
        {currentUser?.nom}
      </p>
      <p>
        <span className="font-bold">Email</span> : {currentUser?.email}
      </p>
    </>
  );
};

export default TicketById;
