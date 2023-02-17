import { Loader } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetTicketById } from "../Hooks/useTicket";

const TicketById = () => {
  const { id } = useParams();

  console.log(id);

  const ticket = useGetTicketById(id!);

  if (ticket.isLoading) return <Loader />;
  if (ticket.isError) return <>Error</>;

  console.log(ticket.data?.data?.data);

  return <div>TicketById {id}</div>;
};

export default TicketById;
