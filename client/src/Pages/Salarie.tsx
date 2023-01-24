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
      <nav className="flex place-content-center p-2 bg-gray-200  mb-5">
        <div className="max-w-xs w-full flex place-content-between">
          <img src="logo_small.png" alt="logo" className="max-h-8" />
          {/* <div>titre</div> */}
          <LogoutButton></LogoutButton>
        </div>
      </nav>
      <div className="grid place-items-center container mx-auto px-4">
        <div className="max-w-md  grid place-items-center">
          {/* <h1>Bulletins de salaire</h1> */}
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
