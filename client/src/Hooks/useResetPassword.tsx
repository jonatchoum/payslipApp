import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useResetPassword = (id: any, token: any, password: any) => {
  return useMutation({
    mutationFn: () => {
      return axios.post("/resetPassword", { id, token, password });
    },
    onError: () => {
      toast.error("Erreur reset password");
    },
    onSuccess: () => {
      toast.success("Mot de passe réinitialiser !");
    },
  });
};

export { useResetPassword };
