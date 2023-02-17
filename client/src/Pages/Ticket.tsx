import { Loader, Table } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllTickets } from "../Hooks/useGetAllTickets";
import { useGetUsers } from "../Hooks/useGetUsers";

const Ticket = () => {
  const { data, isLoading, isError } = useGetAllTickets();
  const users = useGetUsers();
  const navigate = useNavigate();

  if (isLoading || users.isLoading) return <Loader />;
  if (isError || users.isError) return <>Error !!!</>;

  const usersData = users.data.data.data;
  const tickets = data.data.data;
  console.table("🚀 ~ file: Ticket.tsx:14 ~ Ticket ~ tickets", tickets);

  type Ticket = {
    id: number;
    sujet: string;
    open: boolean;
    user_id: number;
    createdAt: string;
  };
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
      <tr
        key={ticket.id}
        className="hover:bg-slate-200"
        onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
      >
        <td>{ticket.id}</td>
        <td>{ticket.sujet}</td>
        <td>{currentUser(ticket)}</td>
        <td>{ticket.createdAt}</td>
      </tr>
    );
  });

  const closedTicketsListe = closedTickets.map((ticket: Ticket) => {
    return (
      <tr
        key={ticket.id}
        className="hover:bg-slate-200"
        onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
      >
        <td>{ticket.id}</td>
        <td>{ticket.sujet}</td>
        <td>{currentUser(ticket)}</td>
        <td>{ticket.createdAt}</td>
      </tr>
    );
  });

  // let date = new Date(ticket.createdAt)
  // console.log(date.getDate(), date.getMonth()+1, date.getFullYear(), date.getHours(), date.getMinutes())

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
