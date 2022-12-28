import React from "react";
// import { redirect } from "react-router-dom";
// import mutateLogout from "../Hooks/useLogout";
import useLogout from "../Hooks/useLogout";
("../Hooks/useLogout");

const LogoutButton = () => {
  const mutation = useLogout();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <button className="bg-red-500 p-2" onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
