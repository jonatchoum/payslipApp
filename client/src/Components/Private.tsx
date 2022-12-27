import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const auth = true;

  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Private;
