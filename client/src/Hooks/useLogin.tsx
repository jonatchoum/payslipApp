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
      toast.success("Vous êtes à présent connecté");
      if (data.data?.data?.admin) {
        // alert("you are admin");
        return navigate("/dashboard");
      }
      return navigate("/profile");
      // alert("you are not admin");
      // console.log(data.data.data.admin);
    },
  });
};

export { useLogin };
