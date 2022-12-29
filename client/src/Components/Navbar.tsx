import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="flex gap-5 place-content-center mb-10 p-5 text-xl place-items-center">
      <Link to={"/users"}>users</Link>
      {/* <Link to={"/login"}>login</Link> */}
      <Link to={"/services"}>services</Link>
      <Link to={"/me"}>me</Link>
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
