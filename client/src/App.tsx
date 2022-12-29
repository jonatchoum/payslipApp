// import "./App.css";
import React from "react";
import axios from "axios";
import Users from "./Components/Users";
import LoginForm from "./Components/LoginForm";
import { Route, Routes } from "react-router-dom";
// import User from "./Components/User";
//remplacer
import User from "./Components/User";
// import Navbar from "./Components/Navbar";
import Services from "./Components/Services";
import Service from "./Components/Service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./Components/Private";
import Me from "./Components/Me";
// import Test from "./Components/Test";
import CreateUser from "./Components/CreateUser";
import { AuthenticationTitle } from "./Pages/AuthenticationTitle";
import Notfound from "./Pages/Notfound";
import Dashboard from "./Pages/Dashboard";
import MantineUserByService from "./Components/MantineUserByService";
axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="min-h-screen  ">
      <Routes>
        <Route element={<Private></Private>}>
          <Route path="/" element={<Me />}></Route>
          <Route path="/me" element={<Me />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/service/:service" element={<Service />}></Route>
          <Route path="/createuser" element={<CreateUser />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              path=":service"
              element={<MantineUserByService></MantineUserByService>}
            ></Route>
            <Route path="profile" element={<Me></Me>}></Route>
          </Route>
          <Route path="/*" element={<Notfound />}></Route>
        </Route>
        <Route path="/login" element={<AuthenticationTitle />}></Route>
        <Route path="/test" element={<MantineUserByService />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
