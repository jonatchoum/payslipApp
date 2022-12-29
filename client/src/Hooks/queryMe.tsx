import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await axios.get("me");
      return response.data.data;
    },
  });
};

export default queryMe;
