import { Loader } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import querySocietes from "../Hooks/querySocietes";
import queryUsers from "../Hooks/queryUsers";
import { Societe, User } from "../Types/myTypes";

const Users = () => {
  const users = queryUsers();
  const societes = querySocietes();

  if (users.isLoading || societes.isLoading) {
    return <Loader />;
  }
  if (users.isError || societes.isError) {
    return <>Error</>;
  }

  // console.log("🚀 ~ file: Users.tsx:26 ~ Users ~ users.data", users.data);
  // console.log("🚀 ~ file: Users.tsx:26 ~ Users ~ societes.data", societes.data);

  return (
    <>
      <>USERS PAGE</>
      <>
        {societes.data.map((societe: Societe, index: number) => (
          <div key={index}>
            <br />
            <table className="table-auto min-w-full border-blue-500 border-separate border-spacing-4 border text-left">
              <caption>{societe.societe}</caption>
              <thead>
                <tr>
                  <th>id</th>
                  <th>username</th>
                  <th>societe</th>
                </tr>
              </thead>
              <tbody>
                {users.data
                  .filter((user: User) => user.societe == societe.societe)
                  .map((user: User, id: number) => (
                    <tr key={id}>
                      <td className="">{user.id}</td>
                      <td className="">{user.username}</td>
                      <td className="">{user.societe}</td>
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
