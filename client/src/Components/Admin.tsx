import { Loader } from "@mantine/core";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Navbar } from "./Navbar";

const Admin = () => {
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
            { link: "/admin/tickets", label: "Tickets" },
            { link: "/admin/createUser", label: "Ajouter un utilisateur" },
            { link: "/admin/dashboard", label: "Dashboard" },
          ]}
        />
        <div className="grid place-items-center">
          <Outlet />
        </div>
      </main>
    );
  }
  return <Navigate to={"/profile"} />;
};

export default Admin;
