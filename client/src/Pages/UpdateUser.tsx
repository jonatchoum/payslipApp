import { Button, Checkbox, Input, Loader } from "@mantine/core";
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
      <form className="grid gap-2 " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">username</label>
          <Input
            type="text"
            placeholder={user.data.username}
            {...register("username")}
          />
          {errors?.username?.message && (
            <p className="text-red-500 text-xs">
              {errors.username?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input
            type="text"
            placeholder={user.data.prenom}
            {...register("prenom")}
          />
          {errors?.prenom?.message && (
            <p className="text-red-500 text-xs">
              {errors.prenom?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input type="text" placeholder={user.data.nom} {...register("nom")} />
          {errors?.nom?.message && (
            <p className="text-red-500 text-xs">
              {errors.nom?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input
            type="text"
            placeholder={user.data.role}
            {...register("role")}
          />
          {errors?.role?.message && (
            <p className="text-red-500 text-xs">
              {errors.role?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input
            type="text"
            placeholder={user.data.email}
            {...register("email")}
          />
          {errors?.email?.message && (
            <p className="text-red-500 text-xs">
              {errors.email?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input
            type="text"
            placeholder={user.data.societe}
            {...register("societe")}
          />
          {errors?.societe?.message && (
            <p className="text-red-500 text-xs">
              {errors.societe?.message.toString()}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="admin">admin</label>
          <Checkbox
            size="md"
            defaultChecked={user.data.admin}
            {...register("admin")}
          ></Checkbox>
          {errors?.admin?.message && (
            <p className="text-red-500 text-xs">
              {errors.admin?.message.toString()}
            </p>
          )}
        </div>
        <Button type="submit">modifier</Button>
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
