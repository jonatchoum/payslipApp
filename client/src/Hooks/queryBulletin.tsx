import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryBulletin = (id: number | undefined) => {
  return useQuery({
    queryKey: ["bulletins", id],
    queryFn: async () => {
      const response = await axios.get(`user/${id}/bulletin`);
      return response.data.data;
    },
  });
};

export default queryBulletin;
