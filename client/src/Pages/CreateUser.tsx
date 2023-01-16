import { Button, Input } from "@mantine/core";
import React from "react";

const CreateUser = () => {
  return (
    <div className="grid gap-5">
      <h1>Create new User !</h1>
      <form className="grid gap-5">
        <div>
          <label htmlFor="username">username</label>
          <Input name="username" type="text" placeholder="username" />
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input name="prenom" type="text" placeholder="prenom" />
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input name="nom" type="text" placeholder="nom" />
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input name="role" type="text" placeholder="role" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input name="email" type="text" placeholder="email" />
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input name="societe" type="text" placeholder="societe" />
        </div>
        <div>
          <label htmlFor="admin">admin</label>
          <Input name="admin" type="text" placeholder={"true or false"} />
        </div>
        <Button type="submit">créer </Button>
      </form>

      <Button className="bg-red-500">annuler</Button>
    </div>
  );
};

export default CreateUser;
