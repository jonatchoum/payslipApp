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

  if (!lastBulletin) return <h2>Pas encore de bulletins</h2>;

  return (
    <>
      <h3>Votre dernier bulletin de salaire</h3>
      <a
        href={`http://localhost:3000/api/download/${lastBulletin.user_id}/${lastBulletin.filename}`}
        // href={`https://sareasoft.com/api/download/${lastBulletin.user_id}/${lastBulletin.filename}`}
        download={true}
        className="w-full text-black no-underline"
      >
        <div className="h-full grid place-items-center border-dashed border-4 border-gray-800 w-full p-5 rounded-xl my-10 hover:bg-slate-300">
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
