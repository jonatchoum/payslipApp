import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryUser = (id: string | undefined) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`user/${id}`);
      return response.data.data;
    },
  });
};

export default queryUser;
