import { Loader, Table } from "@mantine/core";
import React from "react";
import { useGetAllTickets } from "../Hooks/useGetAllTickets";
import { useGetUsers } from "../Hooks/useGetUsers";

const Ticket = () => {
  const { data, isLoading, isError } = useGetAllTickets();
  const users = useGetUsers();
  if (isLoading || users.isLoading) return <Loader />;
  if (isError || users.isError) return <>Error !!!</>;

  const usersData = users.data.data.data;
  const tickets = data.data.data;

  type Ticket = { id: number; sujet: string; open: boolean; user_id: number };
  type User = { id: number };

  const openTickets = tickets.filter((ticket: Ticket) => ticket.open);
  const closedTickets = tickets.filter((ticket: Ticket) => !ticket.open);

  const currentUser = (ticket: Ticket) => {
    const user = usersData.find((user: User) => user.id === ticket.user_id);
    return <>{user.username}</>;
  };

  // console.log(usersData.find((user: User) => user.id === 33));

  const openTicketsListe = openTickets.map((ticket: Ticket) => {
    return (
      <tr key={ticket.id} className="">
        <td>{ticket.id}</td>
        <td>{ticket.sujet}</td>
        <td>{currentUser(ticket)}</td>
      </tr>
    );
  });

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
