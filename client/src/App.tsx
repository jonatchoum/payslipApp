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
import Private from "./Components/Private";
import Me from "./Components/Me";
axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="max-w-screen-md overflow-hidden">
      <Navbar />
      <Routes>
        <Route element={<Private></Private>}>
          <Route path="/me" element={<Me />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/service/:service" element={<Service />}></Route>
        </Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
