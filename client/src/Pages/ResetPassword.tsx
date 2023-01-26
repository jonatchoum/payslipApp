import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Loader, PasswordInput } from "@mantine/core";
import React from "react";
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
  const query = useAllowResetPassword(id, token);

  const mutation = useResetPassword();

  const onSubmit = (data: any) => {
    mutation.mutate({ ...data, id, token });
  };
  if (query.isLoading) return <Loader />;

  if (query.isError) return <Navigate to="/"></Navigate>;

  return (
    <div className="container p-2 grid place-items-center max-w-lg mx-auto">
      <h1>Réinitialiser votre mot de passe</h1>
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          label="Nouveau mot de passe"
          required
          mt="md"
          placeholder="Mot de passe"
          description="Le mot de passe doit contenir une lettre minuscule, une lettre majuscule, un caratère spécial, un chiffre et doit contenir au moins 8 caractères"
          {...register("password")}
          className="w-full"
          error={errors?.password?.message?.toString()}
        />
        <PasswordInput
          label="Confirmer votre nouveau mot de passe"
          required
          mt="md"
          placeholder="Confirmer mot de passe"
          {...register("confirmPassword")}
          error={errors?.confirmPassword?.message?.toString()}
        />
        <Button type="submit">confirmer</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
