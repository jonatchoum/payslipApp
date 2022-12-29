import { Loader, Table } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import queryUsersFrom from "../Hooks/queryUsersFrom";
import { User } from "../Types/myTypes";

const MantineUserByService = () => {
  const { service } = useParams();

  const users = queryUsersFrom(service);

  if (users.isLoading) {
    return <Loader className="grid place-items-center min-w-full min-h-full" />;
  }
  if (users.isError) {
    return <>Error</>;
  }
  if (users.isFetching) {
    console.log("fetching");
  }

  //   console.table(users.data);
  const rows = users.data.map((user: User) => (
    <tr key={user.username}>
      <td>{user.id}</td>
      <td>{user.username}</td>
      {/* <td>{user.password}</td> */}
      <td>{user.service}</td>
    </tr>
  ));

  return (
    <Table className="overflow-hidden">
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          {/* <th>hash password</th> */}
          <th>service</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default MantineUserByService;
