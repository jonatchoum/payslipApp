import React from "react";
import { Link, useParams } from "react-router-dom";
import queryUsersFrom from "../Hooks/queryUsersFrom";
import { User } from "../Types/myTypes";

const Service = () => {
  const { service } = useParams();
  const users = queryUsersFrom(service);

  if (users.isLoading) {
    return <>Loading</>;
  }
  if (users.isError) {
    return <>Error</>;
  }
  return (
    <div>
      <table className="table-auto min-w-full border-blue-500 border-separate border-spacing-4 border text-left">
        <caption>{service}</caption>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>service</th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user: User, id: number) => (
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
  );
};

export default Service;
