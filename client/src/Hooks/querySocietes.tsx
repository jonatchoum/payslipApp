import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryServices = () => {
  return useQuery({
    queryKey: ["societes"],
    queryFn: async () => {
      const response = await axios.get("societes");
      // console.table(response.data.data);
      // console.log(response.data.data);
      return response.data.data;
    },
  });
};

export default queryServices;
