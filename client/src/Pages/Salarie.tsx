import { Loader } from "@mantine/core";
import React from "react";
import Bulletin from "../Components/BulletinSalarie";
import LogoutButton from "../Components/LogoutButton";
import queryMe from "../Hooks/queryMe";

const Salarie = () => {
  const user = queryMe();

  if (user.isLoading) return <Loader />;

  if (user.isError) return <>Error</>;

  return (
    <div className="grid place-items-center max-w-3xl mx-auto p-20">
      <div>
        <LogoutButton></LogoutButton>
      </div>
      <Bulletin id={user.data.id}></Bulletin>
    </div>
  );
};

export default Salarie;
