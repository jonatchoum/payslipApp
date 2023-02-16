import { useMutation } from "@tanstack/react-query";
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

export { useTicket };
