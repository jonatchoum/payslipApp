import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import User from "./Components/User";
import Services from "./Components/Services";
import Service from "./Components/Service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./Components/Private";
import CreateUser from "./Pages/CreateUser";
import { AuthenticationTitle } from "./Pages/AuthenticationTitle";
import Notfound from "./Pages/Notfound";
import Dashboard from "./Pages/Dashboard";
import MantineUserByService from "./Components/MantineUserByService";
import MantineUserUpload from "./Components/MantineUserUpload";
import UpdateUser from "./Pages/UpdateUser";
import ResetPasswordMail from "./Pages/ResetPasswordMail";
import ResetPassword from "./Pages/ResetPassword";
import Salarie from "./Pages/Salarie";
import Demande from "./Pages/Demande";
import Admin from "./Components/Admin";
import Ticket from "./Pages/Ticket";
import TicketById from "./Pages/TicketById";
axios.defaults.baseURL = "http://localhost:3000/api/";
// axios.defaults.baseURL = "https://sareasoft.com/api/";
// const API_URL: string = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className=" min-h-screen pb-5">
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Private></Private>}>
          <Route path="profile" element={<Salarie />}></Route>
          <Route path="demande" element={<Demande></Demande>} />
          {/* <Route path="/*" element={<Notfound />}></Route> */}
        </Route>
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<Admin></Admin>}>
          <Route path="createUser" element={<CreateUser />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path=":societe" element={<MantineUserByService />}>
              <Route path=":id" element={<MantineUserUpload />} />
            </Route>
          </Route>
          <Route path="updateUser/:id" element={<UpdateUser />} />
          <Route path="tickets" element={<Ticket />} />
          <Route path="tickets/:id" element={<TicketById />} />
        </Route>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<AuthenticationTitle />} />
        <Route path="/resetPasswordMail" element={<ResetPasswordMail />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

{
  /* <Route path="/user/:id" element={<User />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/service/:service" element={<Service />}></Route> */
}
