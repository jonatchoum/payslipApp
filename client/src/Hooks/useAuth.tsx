import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await axios.get("me");
      return response.data.data;
    },
    retry: false,
  });
};

export default useAuth;
