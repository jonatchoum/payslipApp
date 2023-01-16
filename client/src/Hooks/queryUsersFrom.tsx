import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryUsersFrom = (societe: string | undefined) => {
  return useQuery({
    queryKey: [`usersFrom${societe}`],
    queryFn: async () => {
      const response = await axios.get(`users/${societe}`);
      return response.data.data;
    },
  });
};

export default queryUsersFrom;
