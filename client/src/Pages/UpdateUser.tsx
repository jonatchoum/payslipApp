import { Button, Checkbox, Input, Loader } from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import useUpdateUser from "../Hooks/useUpdateUser";

const UpdateUser = () => {
  const { id } = useParams();
  const [userInfoToChange, setUserInfoToChange] = useState<object>({
    id: id,
    admin: "false",
  });

  const user = queryUser(id);
  const mutation = useUpdateUser(userInfoToChange);

  if (user.isLoading) {
    return <Loader />;
  }
  if (user.isError) {
    return <>Error</>;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  console.log(userInfoToChange);
  return (
    <div className="grid gap-5">
      <h1>
        Modifier {user.data.prenom} {user.data.nom}
      </h1>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <Input
            name="username"
            type="text"
            placeholder={user.data.username}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
                username: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="prenom">prenom</label>
          <Input
            name="prenom"
            type="text"
            placeholder={user.data.prenom}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
                prenom: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="nom">nom</label>
          <Input
            name="nom"
            type="text"
            placeholder={user.data.nom}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
                nom: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="role">role</label>
          <Input
            name="role"
            type="text"
            placeholder={user.data.role}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
                role: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input
            name="email"
            type="text"
            placeholder={user.data.email}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
                email: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="societe">societe</label>
          <Input
            name="societe"
            type="text"
            placeholder={user.data.societe}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
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
            defaultChecked={user.data.admin}
            onChange={(e) =>
              setUserInfoToChange({
                ...userInfoToChange,
                admin: e.target.checked,
              })
            }
          ></Checkbox>
        </div>
        <Button type="submit">modifier</Button>
      </form>
      <Button className="bg-red-500">annuler</Button>
    </div>
  );
};

export default UpdateUser;
