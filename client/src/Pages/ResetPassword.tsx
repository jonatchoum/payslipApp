import { Button, Input } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useAllowResetPassword } from "../Hooks/useAllowResetPassword";

const ResetPassword = () => {
  const { id, token } = useParams();
  console.log(token);
  const mutation = useAllowResetPassword(id, token);

  return (
    <div className="grid place-items-center">
      <h1>ResetPassword</h1>
      <form className="grid gap-5">
        <Input placeholder="new password" />
        <Input placeholder="confirm new password" />
        <Button type="submit">confirmer</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
