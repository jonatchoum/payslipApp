import { Loader } from "@mantine/core";
import React from "react";
import { useGetAllTickets } from "../Hooks/useGetAllTickets";

const Ticket = () => {
  const { data, isLoading, isError } = useGetAllTickets();

  if (isLoading) return <Loader />;
  if (isError) return <>Error !!!</>;

  const tickets = data.data.data;
  console.table(tickets);

  const ticketsListe = tickets.map((ticket: { id: number; sujet: string }) => {
    return <ul key={ticket.id}>{ticket.sujet}</ul>;
  });

  return <div>{ticketsListe}</div>;
};

export default Ticket;
