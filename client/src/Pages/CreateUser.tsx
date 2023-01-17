import { Button, Checkbox, Input } from "@mantine/core";
import React, { useState } from "react";
import useCreateUser from "../Hooks/useCreateUser";

const CreateUser = () => {
  const [newUser, setNewUser] = useState<object>({ admin: false });

  const mutation = useCreateUser(newUser);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  console.log(newUser);

  return (
    <div className="grid gap-5">
      <h1>Create new User !</h1>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <Input
            required={true}
            name="username"
            type="text"
            placeholder="username"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                username: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Input
            required={true}
            name="password"
            type="text"
            placeholder="password"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input
            required={true}
            name="prenom"
            type="text"
            placeholder="prenom"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                prenom: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input
            required={true}
            name="nom"
            type="text"
            placeholder="nom"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                nom: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input
            required={true}
            name="role"
            type="text"
            placeholder="role"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                role: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input
            required={true}
            name="email"
            type="text"
            placeholder="email"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                email: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input
            required={true}
            name="societe"
            type="text"
            placeholder="societe"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                societe: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="admin">admin</label>
          <Checkbox
            name="admin"
            size="md"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                admin: e.target.checked,
              })
            }
          ></Checkbox>
        </div>
        <Button type="submit">créer </Button>
      </form>

      <Button className="bg-red-500">annuler</Button>
    </div>
  );
};

export default CreateUser;
