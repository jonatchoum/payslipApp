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
  console.log("🚀 ~ file: Private.tsx:18 ~ Private ~ admin", admin);

  // console.log(auth.data);
  if (admin) {
    return (
      <main>
        <Navbar
          links={[
            { link: "/me", label: "profile" },
            { link: "/users", label: "users" },
            { link: "/services", label: "services" },
            { link: "/dashboard", label: "dashboard" },
            { link: "/test", label: "test" },
          ]}
        />
        <div className="grid place-items-center">
          <Outlet />
        </div>
      </main>
    );
  }
  return <Salarie></Salarie>;

  // return auth.data ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Private;
