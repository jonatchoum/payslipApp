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
    <>
      <nav className="flex place-content-center p-2 bg-gray-900 text-teal-50 mb-5">
        <div className="max-w-xl w-full flex place-content-between">
          <div>logo</div>
          <div>titre</div>
          <LogoutButton></LogoutButton>
        </div>
      </nav>
      <div className="grid place-items-center container mx-auto px-4">
        <div className="max-w-md  grid place-items-center">
          <h1>Bulletins de salaire</h1>
          <>
            Bienvenue {user.data.prenom} {user.data.nom}
          </>
          <div></div>
          <LastBulletin userId={user.data.id}></LastBulletin>
          <Bulletin id={user.data.id}></Bulletin>
        </div>
      </div>
    </>
  );
};

export default Salarie;
