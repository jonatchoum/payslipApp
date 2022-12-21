import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("users");
      return response.data.data;
    },
  });
};

export default queryUsers;
