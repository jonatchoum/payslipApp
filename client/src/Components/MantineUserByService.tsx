import { Button, Loader, Paper, Table } from "@mantine/core";
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import queryUsersFrom from "../Hooks/queryUsersFrom";
import { User } from "../Types/myTypes";
import { FiEdit2 } from "react-icons/fi";
import { RiFilePaper2Fill } from "react-icons/ri";
const MantineUserByService = () => {
  const { societe } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState("");
  const users = queryUsersFrom(societe);

  if (users.isLoading) {
    return <Loader className="grid place-items-center min-w-full min-h-full" />;
  }
  if (users.isError) {
    return <>Error</>;
  }

  const rows = users.data.map((user: User) => (
    <tr
      key={user.username}
      className={row === user.username ? "bg-slate-200" : ""}
    >
      <td>{user.prenom}</td>
      <td>{user.nom}</td>
      <td>
        <Link to={`${user.id}`}>
          <RiFilePaper2Fill
            className="fill-cyan-500 "
            onClick={() => {
              setRow(user.username);
            }}
          />
        </Link>
      </td>
      <td>
        <Link to={`/UpdateUser/${user.id}`}>
          <FiEdit2 className="stroke-orange-500" />
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="flex  gap-5 w-full">
      <Paper withBorder shadow="md" p={30} radius="md" className="h-fit">
        <Table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th></th>
              <th></th>
              {/* <th>bulletin</th>
              <th>edit</th> */}
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
