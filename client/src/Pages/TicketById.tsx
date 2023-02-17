import { Button, Card, Loader } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketResponse from "../Components/TicketResponse";
import queryUser from "../Hooks/queryUser";
import { useChangeStatus, useGetTicketById } from "../Hooks/useTicket";

const TicketById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  console.log(ticket.data?.data?.data);

  const handleClick = () => {
    // alert("clicker");
    mutation.mutate(currentTicket.id);
  };

  return (
    <div className="grid gap-2">
      <Card shadow="sm" p="lg" radius="md" withBorder className="max-w-lg">
        <div className="flex place-items-center place-content-between">
          <h2>Ticket n°{id}</h2>
          <Button className="" onClick={handleClick}>
            {currentTicket.open ? "fermer" : "ouvrir"}
          </Button>
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
      </Card>
      <Button
        onClick={() => navigate("/admin/tickets")}
        className="place-self-center"
      >
        Retour Tickets
      </Button>
      <TicketResponse />
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
