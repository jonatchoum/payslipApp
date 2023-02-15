import { Loader } from "@mantine/core";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Navbar } from "./Navbar";

const Private = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Loader />;
  }
  if (auth.isError) {
    return <Navigate to={"/login"} replace={true} />;
  }

  const { admin } = auth.data;

  if (admin) {
    return (
      <main className="min-h-full">
        <Navbar
          links={[
            { link: "/createUser", label: "Ajouter un utilisateur" },
            { link: "/dashboard", label: "Dashboard" },
          ]}
        />
        <div className="grid place-items-center">
          <Outlet />
        </div>
      </main>
    );
  }
  return <Outlet />;
};

export default Private;
