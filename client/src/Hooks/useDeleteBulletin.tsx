import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useDeletBulletin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/deleteBulletin/${id}`);
    },
    onError: () => {
      toast.error("bulletin non supprimé");
    },
    onSuccess: () => {
      toast.success("bulletin supprimé");
      queryClient.invalidateQueries({ queryKey: ["bulletins"] });
    },
  });
};

export { useDeletBulletin };
