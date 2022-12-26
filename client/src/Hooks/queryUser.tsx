import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryUser = (id: string | undefined) => {
  return useQuery({
    queryKey: [`user${id}`],
    queryFn: async () => {
      const response = await axios.get(`user/${id}`);
      return response.data.data;
    },
  });
};

export default queryUser;
