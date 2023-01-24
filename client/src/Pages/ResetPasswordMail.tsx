import { Button, Input } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useResetPasswordMail } from "../Hooks/useResetPasswordMail";

const ResetPasswordMail = () => {
  const [email, setEmail] = useState("");
  const mutation = useResetPasswordMail(email);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="grid place-items-center gap-3">
      <h1>Réinitialiser votre mot de passe</h1>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Button type="submit">confirmer</Button>
        <Link to={"/login"}>
          <Button color={"red"} className="w-full">
            annuler
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default ResetPasswordMail;
