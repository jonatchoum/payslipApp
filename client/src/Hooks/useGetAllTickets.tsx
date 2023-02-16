import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTickets = () => {
  return axios.get("/getAllTickets");
};

const useGetAllTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });
};

export { useGetAllTickets };
