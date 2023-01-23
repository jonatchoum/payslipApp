import { Button, Input } from "@mantine/core";
import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useResetPasswordMail } from "../Hooks/useResetPasswordMail";

const ResetPasswordMail = () => {
  const { id, token } = useParams();
  const [email, setEmail] = useState("");
  const mutation = useResetPasswordMail(email);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="grid place-items-center gap-3">
      <h1>ResetPassword Page</h1>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Button type="submit">reset</Button>
      </form>
      <div>{id}</div>
      <div>{token}</div>
    </div>
  );
};

export default ResetPasswordMail;
