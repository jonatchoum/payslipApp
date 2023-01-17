import { Button, Input, Loader } from "@mantine/core";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAllowResetPassword } from "../Hooks/useAllowResetPassword";
import { useResetPassword } from "../Hooks/useResetPassword";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState<string>();
  console.log(token);
  const query = useAllowResetPassword(id, token);

  const mutation = useResetPassword(id, token, password);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (query.isLoading) return <Loader />;

  if (query.isError) return <Navigate to="/"></Navigate>;

  return (
    <div className="grid place-items-center">
      <h1>ResetPassword</h1>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <Input
          placeholder="new password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Input placeholder="confirm new password" />
        <Button type="submit">confirmer</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
