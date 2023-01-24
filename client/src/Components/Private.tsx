import { Loader } from "@mantine/core";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Salarie from "../Pages/Salarie";
import { Navbar } from "./Navbar";

const Private = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Loader />;
  }
  if (auth.isError) {
    // return <>Error</>;
    return <Navigate to={"/login"} replace={true} />;
  }

  const { admin } = auth.data;

  if (admin) {
    return (
      <main className="min-h-full">
        <Navbar
          links={[
            { link: "/dashboard", label: "dashboard" },
            { link: "/createUser", label: "Ajouter un utilisateur" },
          ]}
        />
        <div className="grid place-items-center">
          <Outlet />
        </div>
      </main>
    );
  }
  return <Salarie />;

  // return auth.data ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Private;
