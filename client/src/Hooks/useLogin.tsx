import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogin = (username: string, password: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return axios.post("/login", { username, password });
    },
    onError: () => {
      toast.error("Erreur de connexion");
    },
    onSuccess: (data) => {
      if (data.data?.data?.admin) {
        return navigate("/dashboard");
      }
      return navigate("/profile");
    },
  });
};

export { useLogin };
