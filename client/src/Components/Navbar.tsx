import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-5 place-content-center mb-10 p-5 text-xl">
      <Link to={"/users"}>users</Link>
      <Link to={"/login"}>login</Link>
      <Link to={"/services"}>services</Link>
      <Link to={"/me"}>me</Link>
    </nav>
  );
};

export default Navbar;
