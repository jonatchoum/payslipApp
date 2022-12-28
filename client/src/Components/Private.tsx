import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Private = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <>Loading private</>;
  }
  if (auth.isError) {
    // return <>Error</>;
    return <Navigate to={"/login"} />;
  }

  return auth.data ? <Outlet /> : <>probleme</>;
  // return auth.data ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Private;
