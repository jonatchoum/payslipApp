import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useAllowResetPassword = (id: any, token: any) => {
  return useQuery({
    queryKey: [token],
    queryFn: () => {
      return axios.get(`/allowresetpassword/${id}/${token}`);
    },
    onError: () => {
      toast.error("No authorized");
    },
    onSuccess: () => {
      toast.success("vous pouvez changer votre mdp");
    },
  });
};

export { useAllowResetPassword };
