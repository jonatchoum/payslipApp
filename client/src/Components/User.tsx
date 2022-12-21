import React from "react";
import { useParams } from "react-router-dom";
import queryUsers from "../Hooks/queryUsers";

const User = () => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = queryUsers();
  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>Error</>;
  }
  if (data) {
    console.log("🚀 ~ file: User.tsx:15 ~ User ~ data", data);
    return (
      <div>
        <div>User {id}</div>
        <div>ajouter une fiche de paie</div>
        <div>{}</div>
      </div>
    );
  }
};

export default User;
