import React from "react";
// import { redirect } from "react-router-dom";
// import mutateLogout from "../Hooks/useLogout";
import useLogout from "../Hooks/useLogout";
import { Button } from "@mantine/core";
const LogoutButton = () => {
  const mutation = useLogout();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Button className="bg-red-500" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;