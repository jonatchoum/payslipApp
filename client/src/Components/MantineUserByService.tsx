import { Button, Loader, Paper, Table } from "@mantine/core";
import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import queryUsersFrom from "../Hooks/queryUsersFrom";
import { User } from "../Types/myTypes";

const MantineUserByService = () => {
  const { societe } = useParams();
  const navigate = useNavigate();

  const users = queryUsersFrom(societe);

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
      <td>{user.prenom}</td>
      <td>{user.nom}</td>
      <td>
        <Link to={`/UpdateUser/${user.id}`}>modifier</Link>
      </td>
    </tr>
  ));

  return (
    <div className="flex  gap-5 w-full">
      <Paper withBorder shadow="md" p={30} radius="md" className="h-fit">
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>prenom</th>
              <th>nom</th>
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
