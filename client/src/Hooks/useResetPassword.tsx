import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) => {
      return axios.post("/resetPassword", data);
    },
    onError: () => {
      toast.error("Erreur reset password");
    },
    onSuccess: () => {
      toast.success("Mot de passe réinitialiser !");
      navigate("/");
    },
  });
};

export { useResetPassword };
