import { Loader } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import queryServices from "../Hooks/queryServices";
import queryUsers from "../Hooks/queryUsers";
import { Service, User } from "../Types/myTypes";

const Users = () => {
  const users = queryUsers();
  const services = queryServices();

  if (users.isLoading || services.isLoading) {
    return <Loader />;
  }
  if (users.isError || services.isError) {
    return <>Error</>;
  }

  // console.log("🚀 ~ file: Users.tsx:26 ~ Users ~ users.data", users.data);
  // console.log("🚀 ~ file: Users.tsx:26 ~ Users ~ services.data", services.data);

  return (
    <>
      <>USERS PAGE</>
      <>
        {services.data.map((service: Service, index: number) => (
          <div key={index}>
            <br />
            <table className="table-auto min-w-full border-blue-500 border-separate border-spacing-4 border text-left">
              <caption>{service.service}</caption>
              <thead>
                <tr>
                  <th>id</th>
                  <th>username</th>
                  <th>service</th>
                </tr>
              </thead>
              <tbody>
                {users.data
                  .filter((user: User) => user.service == service.service)
                  .map((user: User, id: number) => (
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
          </div>
        ))}
      </>
    </>
  );
};

export default Users;
