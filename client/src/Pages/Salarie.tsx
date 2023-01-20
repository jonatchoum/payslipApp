import { Loader } from "@mantine/core";
import React from "react";
import Bulletin from "../Components/BulletinSalarie";
import LastBulletin from "../Components/LastBulletin";
import LogoutButton from "../Components/LogoutButton";
import queryMe from "../Hooks/queryMe";

const Salarie = () => {
  const user = queryMe();

  if (user.isLoading) return <Loader />;

  if (user.isError) return <>Error</>;

  return (
    <div className="grid place-items-center max-w-3xl mx-auto p-20">
      <h1>Bulletin de salaire</h1>
      <>
        Bienvenue {user.data.prenom} {user.data.nom}
      </>
      <div>
        <LogoutButton></LogoutButton>
      </div>
      <LastBulletin userId={user.data.id}></LastBulletin>
      <Bulletin id={user.data.id}></Bulletin>
    </div>
  );
};

export default Salarie;
