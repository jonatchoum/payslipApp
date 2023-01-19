import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Loader } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAllowResetPassword } from "../Hooks/useAllowResetPassword";
import { useResetPassword } from "../Hooks/useResetPassword";

const FormData = z
  .object({
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "Au moins une lettre capitale")
      .regex(new RegExp(".*[a-z].*"), "Au moins une lettre minuscule")
      .regex(new RegExp(".*\\d.*"), "Au moins un nombre")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Au moins un caractère spécial"
      )
      .min(8, "Au moins 8 caractères longs"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mot de passes doivent être identiques",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const { id, token } = useParams();
  // const [password, setPassword] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormData) });
  console.log(token);
  const query = useAllowResetPassword(id, token);

  const mutation = useResetPassword();
  // const handleSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   mutation.mutate();
  // };
  const onSubmit = (data: any) => {
    mutation.mutate({ ...data, id, token });
  };
  if (query.isLoading) return <Loader />;

  if (query.isError) return <Navigate to="/"></Navigate>;

  return (
    <div className="grid place-items-center">
      <h1>ResetPassword</h1>
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors?.password?.message && (
          <p className="text-red-500">{errors?.password?.message.toString()}</p>
        )}
        <Input
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword?.message && (
          <p className="text-red-500">
            {errors?.confirmPassword?.message.toString()}
          </p>
        )}
        <Button type="submit">confirmer</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
