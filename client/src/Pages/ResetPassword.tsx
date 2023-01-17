import React from "react";
import { Outlet, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  return (
    <div className="grid place-items-center">
      <h1>ResetPassword Page</h1>
      <div>{id}</div>
      <div>{token}</div>
    </div>
  );
};

export default ResetPassword;
