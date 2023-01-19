import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post("/resetPassword", data);
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
