import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type UserInfo = {
  id?: number;
  username?: string;
  hash_password?: string;
  prenom?: string;
  nom?: string;
  role?: string;
  email?: string;
  societe?: string;
  password?: string;
  admin?: boolean;
};

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: UserInfo) => {
      return axios.patch("/updateuser", user);
    },
    onError: () => {
      toast.error("Erreur Update");
    },
    onSuccess: () => {
      toast.success("Update Success");
    },
  });
};

export default useUpdateUser;
