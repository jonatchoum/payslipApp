import React from "react";
import { Link } from "react-router-dom";
import queryServices from "../Hooks/queryServices";
import queryUsers from "../Hooks/queryUsers";

const Users = () => {
  const users = queryUsers();
  const services = queryServices();

  if (users.isLoading || services.isLoading) {
    return <>Loading</>;
  }
  if (users.isError || services.isError) {
    return <>Error</>;
  }

  type User = {
    id: number;
    username: string;
    password: string;
    role: string;
    service: string;
    admin: boolean;
  };
  console.log("🚀 ~ file: Users.tsx:26 ~ Users ~ services.data", services.data);

  return (
    <>
      <>{}</>
      {/* <table className="table-auto border-separate border-spacing-4 border text-left">
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>service</th>
          </tr>
        </thead>
        <tbody>
          {users.data.data.map((user: User, id: number) => (
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
      </table> */}
    </>
  );
};

export default Users;
