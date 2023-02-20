import { Loader, Table } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
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

const UnTicket = (ticket: Ticket) => {
  const user = useGetUser(ticket.user_id.toString());
  const navigate = useNavigate();
  if (user.isLoading) return <Loader></Loader>;
  if (user.isError) return <>Error</>;

  const username = user.data?.data?.data?.username;
  return (
    <tr
      key={ticket.id}
      className="hover:bg-slate-200"
      onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
    >
      <td>{ticket.id}</td>
      <td>{ticket.sujet}</td>
      <td>{username}</td>
      <td>{<DateFormated date={ticket.createdAt}></DateFormated>}</td>
    </tr>
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
