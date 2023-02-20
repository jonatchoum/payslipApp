import { Loader } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../Hooks/useGetUsers";
import Ticket from "../Pages/Ticket";
import DateFormated from "./DateFormated";

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
export default UnTicket;
