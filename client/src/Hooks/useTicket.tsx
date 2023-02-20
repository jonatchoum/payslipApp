import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const postTicket = (data: { sujet: string; details: string }) => {
  return axios.post("/ticket", data);
};

const useTicket = () => {
  return useMutation({
    mutationFn: postTicket,
    onSuccess: () => {
      toast.success("Ticket envoyé");
    },
    onError: () => {
      toast.error("Ticket non envoyé");
    },
  });
};

const getTicketById = (id: string) => {
  return axios.get(`/tickets/${id}`);
};

const useGetTicketById = (id: string) => {
  return useQuery({
    queryKey: ["ticket", `${id}`],
    queryFn: () => getTicketById(id),
  });
};

const updateTicketStatus = (id: string) => {
  return axios.patch(`/tickets/${id}/updateStatus`);
};

const useChangeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTicketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
  });
};

const getMessages = (id: string | undefined) => {
  return axios.get(`/tickets/${id}/messages`);
};

const useGetMessages = (id: string | undefined) => {
  return useQuery({
    queryKey: ["messages", `${id}`],
    queryFn: () => getMessages(id),
  });
};

const postMessage = ({
  id,
  data,
}: {
  id: string | undefined;
  data: { reply: string };
}) => {
  return axios.post(`/tickets/${id}/messages`, data);
};

const usePostMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      toast.success("Message envoyé");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: () => toast.error("Le message n'a pa pu être envoyé"),
  });
};

const getMyTickets = () => {
  return axios.get("/tickets/me");
};

const useGetMyTickets = () => {
  return useQuery({ queryKey: ["mestickets"], queryFn: getMyTickets });
};

export {
  useTicket,
  useGetTicketById,
  useChangeStatus,
  usePostMessage,
  useGetMessages,
  useGetMyTickets,
};
