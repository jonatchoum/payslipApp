import { Button, Checkbox, Input } from "@mantine/core";
import React from "react";
import useCreateUser from "../Hooks/useCreateUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const FormData = z
  .object({
    username: z.string().min(3, { message: "Nom d'utilisateur invalide !" }),
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
    prenom: z.string().min(3, { message: "Prénom invalide !" }),
    nom: z.string().min(3, { message: "Nom invalide !" }),
    role: z.string().min(3, { message: "Rôle invalide !" }),
    email: z.string().email({ message: "Email invalide !" }),
    societe: z.string().min(3, { message: "Société invalide !" }),
    admin: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mot de passes doivent être identiques",
    path: ["confirmPassword"],
  });

// type FormDate = z.infer<typeof FormData>;

const CreateUser = () => {
  // Password123@
  const { mutate } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormData) });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  return (
    <div className="grid gap-1 mb-10">
      <h1>Créer un nouvel utilisateur</h1>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Nom d&apos;utilisateur</label>
          <Input
            type="text"
            placeholder="Nom d'utilisateur"
            {...register("username")}
          />
          {/* {errors && <p>{errors.}</p>} */}
          {errors?.username?.message && (
            <p className="text-red-500">
              {errors?.username?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <Input
            type="password"
            placeholder="Mot de passe"
            {...register("password")}
          />
          {errors?.password?.message && (
            <p className="text-red-500">
              {errors?.password?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Confirmer le mot de passe</label>
          <Input
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword?.message && (
            <p className="text-red-500">
              {errors?.confirmPassword?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="prenom">Prénom</label>
          <Input type="text" placeholder="Prénom" {...register("prenom")} />
          {errors?.prenom?.message && (
            <p className="text-red-500">{errors?.prenom?.message.toString()}</p>
          )}
        </div>
        <div>
          <label htmlFor="nom">Nom</label>
          <Input type="text" placeholder="Nom" {...register("nom")} />
          {errors?.nom?.message && (
            <p className="text-red-500">{errors?.nom?.message.toString()}</p>
          )}
        </div>
        <div>
          <label htmlFor="role">Rôle</label>
          <Input type="text" placeholder="Rôle" {...register("role")} />
          {errors?.role?.message && (
            <p className="text-red-500">{errors?.role?.message.toString()}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input type="text" placeholder="Email" {...register("email")} />
          {errors?.email?.message && (
            <p className="text-red-500">{errors?.email?.message.toString()}</p>
          )}
        </div>
        <div>
          <label htmlFor="societe">Société</label>
          <Input type="text" placeholder="Société" {...register("societe")} />
          {errors?.societe?.message && (
            <p className="text-red-500">
              {errors?.societe?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="admin">Admin</label>
          <Checkbox size="md" {...register("Admin")}></Checkbox>
          {errors?.admin?.message && (
            <p className="text-red-500">{errors?.admin?.message.toString()}</p>
          )}
        </div>
        <Button type="submit">créer</Button>
      </form>
      <Link to={"/dashboard"}>
        <Button color={"red"} className="w-full">
          annuler
        </Button>
      </Link>
    </div>
  );
};

export default CreateUser;
