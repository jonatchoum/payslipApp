import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryUsersFrom = (service: string | undefined) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`users/${service}`);
      return response.data.data;
    },
  });
};

export default queryUsersFrom;
