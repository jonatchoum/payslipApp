import React, { useState } from "react";
import useCreateUser from "../Hooks/useCreateUser";

const CreateUser = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    role: "",
    service: "",
    admin: "",
  });
  console.log(form);

  const mutation = useCreateUser(form);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!(form.password === form.verifyPassword)) {
      alert("les 2 mdp ne correspondent pas");
    }
    mutation.mutate();
  };
  return (
    <div>
      <form action="" className="grid border p-5 gap-2" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          name=""
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name=""
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <label htmlFor="">Verify Password</label>
        <input
          type="password"
          name=""
          onChange={(e) => setForm({ ...form, verifyPassword: e.target.value })}
          required
        />
        <label htmlFor="">role</label>
        <input
          type="text"
          name=""
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        />
        <label htmlFor="">service</label>
        <input
          type="text"
          name=""
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          required
        />
        <label htmlFor="">admin</label>
        <input
          type=""
          name=""
          onChange={(e) => setForm({ ...form, admin: e.target.value })}
          required
        />
        <button>créer</button>
      </form>
    </div>
  );
};

export default CreateUser;
