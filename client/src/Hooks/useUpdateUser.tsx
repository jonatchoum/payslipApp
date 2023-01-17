import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useUpdateUser = (user: any) => {
  return useMutation({
    mutationFn: () => {
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
