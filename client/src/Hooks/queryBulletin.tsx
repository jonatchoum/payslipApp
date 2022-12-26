import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryBulletin = (id: string | undefined) => {
  return useQuery({
    queryKey: ["bulletin"],
    queryFn: async () => {
      const response = await axios.get(`user/${id}/bulletin`);
      return response.data.data;
    },
  });
};

export default queryBulletin;
