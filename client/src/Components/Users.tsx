import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("users");
      console.log("🚀 ~ file: App.tsx:30 ~ queryFn: ~ data", data);
      return data;
    },
  });

  const { isLoading, isError, data, error } = users;

  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>Error : {error}</>;
  }

  type User = {
    id: number;
    username: string;
    password: string;
    role: string;
    service: string;
    admin: boolean;
  };

  return (
    <>
      <table className="table-auto border-separate border-spacing-4 border text-left">
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>service</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((user: User, id: number) => (
            <tr key={id}>
              <td className="">{user.id}</td>
              <td className="">{user.username}</td>
              <td className="">{user.service}</td>
              <td>
                <Link to={`/user/${user.id}`}>
                  <button className="">edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  return <div>Users</div>;
};

export default Users;
