import { Loader, Table } from "@mantine/core";
import React from "react";
import { useGetAllTickets } from "../Hooks/useGetAllTickets";

const Ticket = () => {
  const { data, isLoading, isError } = useGetAllTickets();

  if (isLoading) return <Loader />;
  if (isError) return <>Error !!!</>;

  const tickets = data.data.data;
  console.table(tickets);

  type Ticket = { id: number; sujet: string; open: boolean };

  const openTickets = tickets.filter((ticket: Ticket) => ticket.open);
  const closedTickets = tickets.filter((ticket: Ticket) => !ticket.open);

  //   console.log({ openTickets });
  //   console.log({ closedTickets });

  const openTicketsListe = openTickets.map(
    (ticket: { id: number; sujet: string }) => {
      return (
        <tr key={ticket.id} className="">
          <td>{ticket.id}</td>
          <td>{ticket.sujet}</td>
          <td>username</td>
        </tr>
      );
    }
  );

  const closedTicketsListe = closedTickets.map(
    (ticket: { id: number; sujet: string }) => {
      return (
        <tr
          key={ticket.id}
          className="hover:bg-slate-200"
          onClick={() => alert("clicke")}
        >
          <td>{ticket.id}</td>
          <td>{ticket.sujet}</td>
          <td>username</td>
        </tr>
      );
    }
  );

  return (
    <div>
      <h3>tickets ouverts</h3>
      <Table className="">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Sujet</th>
            <th>De</th>
          </tr>
        </thead>
        <tbody>{openTicketsListe}</tbody>
      </Table>

      <h3>tickets fermés</h3>
      <Table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Sujet</th>
            <th>De</th>
          </tr>
        </thead>
        <tbody>{closedTicketsListe}</tbody>
      </Table>
    </div>
  );
};

export default Ticket;
