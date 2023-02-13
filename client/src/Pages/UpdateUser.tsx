import { Button, Checkbox, Input, Loader, TextInput } from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import useUpdateUser from "../Hooks/useUpdateUser";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserInfoSchema = z.object({
  username: z.string().optional(),
  prenom: z.string().optional(),
  nom: z.string().optional(),
  role: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  societe: z.string().optional(),
  admin: z.boolean().optional(),
});

const UpdateUser = () => {
  const { id } = useParams();
  const user = queryUser(id);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: zodResolver(UserInfoSchema) });

  const mutation = useUpdateUser();

  const onSubmit = (data: any) => {
    mutation.mutate({ id, ...data });
  };

  if (user.isLoading) {
    return <Loader />;
  }
  if (user.isError) {
    return <>Error</>;
  }

  return (
    <div className="grid gap-1 mb-10">
      <h1>
        Modifier {user.data.prenom} {user.data.nom}
      </h1>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nom d'utilisateur"
          type="text"
          placeholder={user.data.username}
          {...register("username")}
          error={
            errors?.username?.message && errors.username.message.toString()
          }
        />
        <TextInput
          label="Prénom"
          type="text"
          placeholder={user.data.prenom}
          {...register("prenom")}
          error={errors?.prenom?.message && errors?.prenom?.message.toString()}
        />
        <TextInput
          label="Nom"
          type="text"
          placeholder={user.data.nom}
          {...register("role")}
          error={errors?.role?.message && errors?.role?.message.toString()}
        />

        <TextInput
          label="Rôle"
          type="text"
          placeholder={user.data.role}
          {...register("role")}
          error={errors?.role?.message && errors?.role?.message.toString()}
        />
        <TextInput
          label="Email"
          type="text"
          placeholder={user.data.email}
          {...register("email")}
          error={errors?.email?.message && errors?.email?.message.toString()}
        />
        <TextInput
          label="Société"
          type="text"
          placeholder={user.data.societe}
          {...register("societe")}
          error={
            errors?.societe?.message && errors?.societe?.message.toString()
          }
        />

        <label htmlFor="admin" className="text-sm font-semibold">
          Admin
        </label>
        <Checkbox
          size="md"
          {...register("admin")}
          defaultChecked={user.data.admin}
        />
        <Button type="submit">Modifier</Button>
      </form>
      <Link to={"/dashboard "}>
        <Button color={"red"} className="w-full">
          annuler
        </Button>
      </Link>
    </div>
  );
};

export default UpdateUser;
