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

const updateTicketStatus = (id: string) =>
  axios.patch(`/tickets/${id}/updateStatus`);

const useChangeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTicketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
  });
};

export { useTicket, useGetTicketById, useChangeStatus };
