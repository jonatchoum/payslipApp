import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("users");
      console.log(
        "🚀 ~ file: queryUsers.tsx:9 ~ queryFn: ~ response",
        response
      );
      return response.data;
    },
  });
  //   return useQuery({
  //     queryKey: ["clef"],
  //     queryFn: async () => {
  //       return await axios.get("users");
  //     },
  //   });
};

export default queryUsers;
