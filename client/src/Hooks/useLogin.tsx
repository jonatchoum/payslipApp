import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { queryClient } from "../main";

// const navigate = useNavigate();

const useLogin = (username: string, password: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return axios.post("/login", { username, password });
    },
    onError: () => {
      toast.error("Erreur Login");
    },
    onSuccess: () => {
      toast.success("Login Success");
      navigate("/me");
      // queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export { useLogin };
