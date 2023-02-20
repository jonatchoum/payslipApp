import { Loader, Table } from "@mantine/core";
import React from "react";
import UnTicketSalarie from "../Components/UnTicketSalarie";
import { useGetMyTickets } from "../Hooks/useTicket";
import Ticket from "./Ticket";

const MyTickets = () => {
  const { data, isLoading, isError } = useGetMyTickets();

  if (isLoading) return <Loader />;
  if (isError) return <>Error</>;

  const myTickets = data?.data?.data;
  console.log(myTickets);
  const ticketsListe = myTickets.map((ticket: Ticket) => {
    return (
      <UnTicketSalarie
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
    <div className="grid max-w-xl mx-auto">
      <Table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Sujet</th>
            <th>De</th>
            <th>Le</th>
          </tr>
        </thead>
        <tbody>{ticketsListe}</tbody>
      </Table>
    </div>
  );
};

export default MyTickets;
