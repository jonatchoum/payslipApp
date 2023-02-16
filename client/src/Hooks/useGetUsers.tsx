import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = () => axios.get("/users");

const useGetUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
};

export { useGetUsers };
