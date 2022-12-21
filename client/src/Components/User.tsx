import React from "react";
import { useParams } from "react-router-dom";
import queryUsers from "../Hooks/queryUsers";

const User = () => {
  const { id } = useParams();
  const { isLoading, isError } = queryUsers();
  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>Error</>;
  }

  return (
    <div>
      <div>User {id}</div>
      <div>ajouter une fiche de paie</div>
      <div></div>
    </div>
  );
};

export default User;
