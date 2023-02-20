import { Loader, Table } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import DateFormated from "../Components/DateFormated";
import UnTicket from "../Components/UnTicket";
import { useGetAllTickets } from "../Hooks/useGetAllTickets";
import { useGetUser, useGetUsers } from "../Hooks/useGetUsers";
type Ticket = {
  id: number;
  sujet: string;
  open: boolean;
  user_id: number;
  createdAt: string;
};

const Ticket = () => {
  const { data, isLoading, isError } = useGetAllTickets();
  const users = useGetUsers();

  if (isLoading || users.isLoading) return <Loader />;
  if (isError || users.isError) return <>Error !!!</>;

  const tickets = data.data.data;

  const openTickets = tickets.filter((ticket: Ticket) => ticket.open);
  const closedTickets = tickets.filter((ticket: Ticket) => !ticket.open);

  const openTicketsListe = openTickets.map((ticket: Ticket) => {
    return (
      <UnTicket
        id={ticket.id}
        sujet={ticket.sujet}
        open={ticket.open}
        user_id={ticket.user_id}
        createdAt={ticket.createdAt}
        key={ticket.id}
      />
    );
  });

  const closedTicketsListe = closedTickets.map((ticket: Ticket) => {
    return (
      <UnTicket
        id={ticket.id}
        sujet={ticket.sujet}
        open={ticket.open}
        user_id={ticket.user_id}
        createdAt={ticket.createdAt}
        key={ticket.id}
      />
    );
  });

  return (
    <div>
      <h3>Tickets ouverts</h3>
      <Table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Sujet</th>
            <th>De</th>
            <th>Le</th>
          </tr>
        </thead>
        <tbody>{openTicketsListe}</tbody>
      </Table>

      <h3>Tickets fermés</h3>
      <Table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Sujet</th>
            <th>De</th>
            <th>Le</th>
          </tr>
        </thead>
        <tbody>{closedTicketsListe}</tbody>
      </Table>
    </div>
  );
};

export default Ticket;
