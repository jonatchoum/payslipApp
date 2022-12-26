import "./App.css";
import React from "react";
import axios from "axios";
import Users from "./Components/Users";
import LoginForm from "./Components/LoginForm";
import { Route, Routes } from "react-router-dom";
// import User from "./Components/User";
//remplacer
import User from "./Components/User";
import Navbar from "./Components/Navbar";
import Services from "./Components/Services";
import Service from "./Components/Service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.baseURL = "http://192.168.1.47:3000/api/";

function App() {
  return (
    <div className="max-w-screen-md overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route path="/user/:id" element={<User></User>}></Route>
        <Route path="/services" element={<Services></Services>}></Route>
        <Route path="/service/:service" element={<Service></Service>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
