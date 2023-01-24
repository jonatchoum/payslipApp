import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { queryClient } from "../main";

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return axios.delete("logout");
    },
    onError: () => {
      toast.error("Erreur Logout");
    },
    onSuccess: () => {
      navigate("/login", { replace: true });
      //removes all queries cache on logout
      queryClient.removeQueries();
    },
  });
};

// const mutation = mutateFile();
export default useLogout;
