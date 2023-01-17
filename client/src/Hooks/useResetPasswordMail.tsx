import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useResetPasswordMail = (email: string) => {
  return useMutation({
    mutationFn: () => {
      return axios.post("/resetMail", { email });
    },
    onError: () => {
      toast.error("Erreur email");
    },
    onSuccess: () => {
      toast.success("Envoie d'un mail");
    },
  });
};

export { useResetPasswordMail };
