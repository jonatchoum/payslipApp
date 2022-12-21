import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axios.get("services");
      return response.data.data;
    },
  });
};

export default queryServices;
