import React from "react";

const LoginForm = () => {
  return (
    <div>
      <form action="" className="grid gap-5 border p-5 rounded-xl">
        <input
          type="text"
          className="rounded-xl p-2"
          name=""
          id="username"
          placeholder="Username"
        />
        <input
          type="password"
          className="rounded-xl p-2"
          id="password"
          placeholder="Password"
        />
        <button className="border border-blue-300" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
