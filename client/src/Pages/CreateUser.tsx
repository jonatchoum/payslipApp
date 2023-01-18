import { Button, Checkbox, Input } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useCreateUser from "../Hooks/useCreateUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const FormData = z
  .object({
    username: z.string().min(3, { message: "username invalide !" }),
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
    prenom: z.string().min(3, { message: "prenom invalide !" }),
    nom: z.string().min(3, { message: "nom invalide !" }),
    role: z.string().min(3, { message: "role invalide !" }),
    email: z.string().email({ message: "email invalide !" }),
    societe: z.string().min(3, { message: "societe invalide !" }),
    admin: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mot de passes doivent être identiques",
    path: ["confirmPassword"],
  });

const CreateUser = () => {
  // Password123@

  const { mutate } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormData) });

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log("no error");
    mutate(data);
    console.log("mutation done");
  };

  console.log(errors);
  return (
    <div className="grid gap-1 mb-10">
      <h1>Create new User !</h1>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">username</label>
          <Input type="text" placeholder="username" {...register("username")} />
          {/* {errors && <p>{errors.}</p>} */}
          <p className="text-red-500">{errors?.username?.message}</p>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors?.password?.message && (
            <p className="text-red-500">{errors?.password?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">confirm password</label>
          <Input
            type="password"
            placeholder="confirm password"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword?.message && (
            <p className="text-red-500">{errors?.confirmPassword?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input type="text" placeholder="prenom" {...register("prenom")} />
          {errors?.prenom?.message && (
            <p className="text-red-500">{errors?.prenom?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input type="text" placeholder="nom" {...register("nom")} />
          {errors?.nom?.message && (
            <p className="text-red-500">{errors?.nom?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input type="text" placeholder="role" {...register("role")} />
          {errors?.role?.message && (
            <p className="text-red-500">{errors?.role?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input type="text" placeholder="email" {...register("email")} />
          {errors?.email?.message && (
            <p className="text-red-500">{errors?.email?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input type="text" placeholder="societe" {...register("societe")} />
          {errors?.societe?.message && (
            <p className="text-red-500">{errors?.societe?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="admin">admin</label>
          <Checkbox size="md" {...register("admin")}></Checkbox>
          {errors?.admin?.message && (
            <p className="text-red-500">{errors?.admin?.message}</p>
          )}
        </div>
        <Button type="submit">créer</Button>
      </form>

      <Button className="bg-red-500">annuler</Button>
    </div>
  );
};

export default CreateUser;
