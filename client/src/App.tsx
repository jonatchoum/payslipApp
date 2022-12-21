import "./App.css";
import React from "react";
import axios from "axios";
import Users from "./Components/Users";
import LoginForm from "./Components/LoginForm";
import { Route, Routes } from "react-router-dom";
import User from "./Components/User";
import Navbar from "./Components/Navbar";

axios.defaults.baseURL = "http://localhost:3000/api/";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginForm></LoginForm>}></Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route path="/user/:id" element={<User></User>}></Route>
      </Routes>
    </div>
  );
}

// function Users() {
//   const users = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const { data } = await axios.get("users");
//       console.log("🚀 ~ file: App.tsx:30 ~ queryFn: ~ data", data);
//       return data;
//     },
//   });

//   const { isLoading, isError, data, error } = users;

//   if (isLoading) {
//     return <>Loading</>;
//   }
//   if (isError) {
//     return <>Error : {error}</>;
//   }

//   type User = {
//     id: number;
//     username: string;
//     password: string;
//     role: string;
//     service: string;
//     admin: boolean;
//   };

//   return (
//     <>
//       <table className="table-auto border-separate border-spacing-4 border text-left">
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>username</th>
//             <th>service</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.data.map((user: User, id: number) => (
//             <tr key={id}>
//               <td className="">{user.id}</td>
//               <td className="">{user.username}</td>
//               <td className="borde">{user.service}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

export default App;
