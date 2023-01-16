import { Button, Input, Loader } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";

const UpdateUser = () => {
  const { id } = useParams();

  const user = queryUser(id);

  if (user.isLoading) {
    return <Loader />;
  }
  if (user.isError) {
    return <>Error</>;
  }

  return (
    <div className="grid gap-5">
      <h1>
        Modifier {user.data.prenom} {user.data.nom}
      </h1>
      <form className="grid gap-5">
        <div>
          <label htmlFor="username">username</label>
          <Input name="username" type="text" placeholder={user.data.username} />
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input name="prenom" type="text" placeholder={user.data.prenom} />
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input name="nom" type="text" placeholder={user.data.nom} />
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input name="role" type="text" placeholder={user.data.role} />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input name="email" type="text" placeholder={user.data.email} />
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input name="societe" type="text" placeholder={user.data.societe} />
        </div>
        <div>
          <label htmlFor="admin">admin</label>
          <Input
            name="admin"
            type="text"
            placeholder={user.data.admin ? "true" : "false"}
          />
        </div>
        <Button type="submit">modifier</Button>
      </form>
      <Button className="bg-red-500">annuler</Button>
    </div>
  );
};

export default UpdateUser;
