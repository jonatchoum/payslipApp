import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-5 place-content-center mb-10">
      <Link to={"/users"}>users</Link>
      <Link to={"/login"}>login</Link>
      <Link to={"/services"}>services</Link>
    </nav>
  );
};

export default Navbar;
