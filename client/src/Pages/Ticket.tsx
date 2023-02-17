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
        <td>{<DateFormated date={ticket.createdAt}></DateFormated>}</td>
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
        <td>{<DateFormated date={ticket.createdAt}></DateFormated>}</td>
      </tr>
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

const DateFormated = ({ date }: { date: string }) => {
  const stringDate = new Date(date);

  const dateFormated = `${stringDate.getDate()}/${
    stringDate.getMonth() + 1
  }/${stringDate.getFullYear()} ${stringDate.getHours()}h${stringDate.getMinutes()} `;

  return <div>{dateFormated}</div>;
};

export default Ticket;
