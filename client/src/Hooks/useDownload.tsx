import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDownload = (user_id: string, filename: string) => {
  return useQuery({
    queryKey: [`user${id}`],
    queryFn: async () => {
      const response = await axios.get(`download/${user_id}/${filename}`);
      return response.data.data;
    },
  });
};

export default useDownload;
