import { Button, Loader } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Bulletin from "../Components/BulletinSalarie";
import LastBulletin from "../Components/LastBulletin";
import LogoutButton from "../Components/LogoutButton";
import queryMe from "../Hooks/queryMe";

const Salarie = () => {
  const user = queryMe();

  if (user.isLoading) return <Loader />;

  if (user.isError) return <>Error</>;

  return (
    <>
      <div className="grid place-items-center container mx-auto px-4">
        <div className="max-w-md  grid place-items-center">
          <h2>
            Bienvenue {user.data.prenom} {user.data.nom}
          </h2>
          <div></div>
          <LastBulletin userId={user.data.id}></LastBulletin>
          <Bulletin id={user.data.id}></Bulletin>
        </div>
      </div>
    </>
  );
};

export default Salarie;
