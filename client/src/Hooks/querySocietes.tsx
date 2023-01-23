import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryServices = () => {
  return useQuery({
    queryKey: ["societes"],
    queryFn: async () => {
      const response = await axios.get("societes");
      return response.data.data;
    },
  });
};

export default queryServices;
