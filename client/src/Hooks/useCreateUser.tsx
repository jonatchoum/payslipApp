import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useCreateUser = (form: {
  username: string;
  password: string;
  verifyPassword: string;
  role: string;
  service: string;
  admin: string;
}) => {
  return useMutation({
    mutationFn: () => {
      return axios.post("/createUser", form);
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
