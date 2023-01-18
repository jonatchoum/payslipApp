import { Button, Checkbox, Input, Loader } from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import useUpdateUser from "../Hooks/useUpdateUser";

const UpdateUser = () => {
  const { id } = useParams();

  const user = queryUser(id);
  const mutation = useUpdateUser();

  if (user.isLoading) {
    return <Loader />;
  }
  if (user.isError) {
    return <>Error</>;
  }

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

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
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input
            type="text"
            placeholder={user.data.prenom}
            {...register("prenom")}
          />
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input type="text" placeholder={user.data.nom} {...register("nom")} />
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input
            type="text"
            placeholder={user.data.role}
            {...register("role")}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input
            type="text"
            placeholder={user.data.email}
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input
            type="text"
            placeholder={user.data.societe}
            {...register("societe")}
          />
        </div>
        <div>
          <label htmlFor="admin">admin</label>
          <Checkbox
            size="md"
            defaultChecked={user.data.admin}
            {...register("admin")}
          ></Checkbox>
        </div>
        <Button type="submit">modifier</Button>
      </form>
      <Button className="bg-red-500">annuler</Button>
    </div>
  );
};

export default UpdateUser;
