import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useCreateUser = (newUser: object) => {
  return useMutation({
    mutationFn: () => {
      return axios.post("/createUser", newUser);
    },
    onError: () => {
      toast.error("Utilisateur non créé");
    },
    onSuccess: () => {
      toast.success("Utilisateur créé");
    },
  });
};

// const mutation = mutateFile();
export default useCreateUser;
