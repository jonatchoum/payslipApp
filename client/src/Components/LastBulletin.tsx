import { Loader } from "@mantine/core";
import React from "react";
import queryBulletin from "../Hooks/queryBulletin";
import { currentMonth } from "./MonthHelper";

const LastBulletin = (props: any) => {
  const bulletins = queryBulletin(props.userId);

  if (bulletins.isLoading) {
    return <Loader></Loader>;
  }

  if (bulletins.error) {
    return <>Error ! </>;
  }

  const lastBulletin = bulletins.data[0];

  return (
    <div className="border-dashed border-8 border-red-500 w-full">
      {/* <h1>Last bulletin</h1> */}
      <h2>Votre dernier bulletin de salaire</h2>
    </div>
  );
};

export default LastBulletin;
