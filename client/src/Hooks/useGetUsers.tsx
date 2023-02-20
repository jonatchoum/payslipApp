import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = () => axios.get("/users");

const useGetUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
};

const getUser = (id: string) => axios.get(`/user/${id}`);

const useGetUser = (id: string) => {
  return useQuery({ queryKey: ["users", `${id}`], queryFn: () => getUser(id) });
};

export { useGetUsers, useGetUser };
