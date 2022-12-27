import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: unknown) => {
    e.preventDefault();
    const response = await axios.post("/hash", { username, password });
    console.log(response);
  };

  console.log({ username, password });
  return (
    <div>
      <form
        action=""
        className="grid gap-5 border p-5 rounded-xl"
        onSubmit={login}
      >
        <input
          type="text"
          className="rounded-xl p-2"
          name=""
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="rounded-xl p-2"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border border-blue-300" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
