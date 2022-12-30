import { Button, Loader, Paper, Table } from "@mantine/core";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import queryUsersFrom from "../Hooks/queryUsersFrom";
import { User } from "../Types/myTypes";

const MantineUserByService = () => {
  const { service } = useParams();
  const navigate = useNavigate();

  const users = queryUsersFrom(service);

  if (users.isLoading) {
    return <Loader className="grid place-items-center min-w-full min-h-full" />;
  }
  if (users.isError) {
    return <>Error</>;
  }

  const rows = users.data.map((user: User) => (
    <tr key={user.username}>
      <td>
        <Button onClick={() => navigate(`${user.id}`)}>{user.id}</Button>
      </td>

      <td>{user.username}</td>
      {/* <td>{user.service}</td> */}
    </tr>
  ));

  return (
    <div className="flex gap-5 ">
      <Paper withBorder shadow="md" p={30} radius="md" className="h-fit">
        <Table
        // className="overflow-hidden w-36 h-fit"
        >
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              {/* <th>service</th> */}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
      <Outlet />
    </div>
  );
};

export default MantineUserByService;
