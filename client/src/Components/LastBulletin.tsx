import { Loader } from "@mantine/core";
import React from "react";
import queryBulletin from "../Hooks/queryBulletin";
import { TBulletin } from "../Types/myTypes";
import { currentMonthYear } from "./MonthHelper";
import { BsDownload } from "react-icons/bs";

const LastBulletin = (props: any) => {
  const bulletins = queryBulletin(props.userId);

  if (bulletins.isLoading) {
    return <Loader></Loader>;
  }

  if (bulletins.error) {
    return <>Error ! </>;
  }

  const lastBulletin: TBulletin = bulletins.data[0];

  return (
    <>
      <h2>Votre dernier bulletin de salaire</h2>
      <a
        href={`http://localhost:3000/api/download/${lastBulletin.user_id}/${lastBulletin.filename}`}
        download={true}
        className="w-full"
      >
        <div className="grid place-items-center border-dashed border-4 border-red-500 w-full p-5 rounded-xl my-10">
          {/* <h1>Last bulletin</h1> */}

          <h3>{currentMonthYear(lastBulletin.date)}</h3>
          <BsDownload className="w-16 h-fit fill-orange-500" />

          <div>Télécharger</div>
        </div>
      </a>
    </>
  );
};

export default LastBulletin;
