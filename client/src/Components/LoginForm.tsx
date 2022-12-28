import React, { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useLogin(username, password);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <form
        action=""
        className="grid gap-5 border p-5 rounded-xl"
        onSubmit={handleSubmit}
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
