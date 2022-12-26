import React from "react";
import queryBulletin from "../Hooks/queryBulletin";
import { TBulletin } from "../Types/myTypes";

type IdProps = {
  id: string | undefined;
};

const Bulletin = (props: IdProps) => {
  const bulletins = queryBulletin(props.id);

  if (bulletins.isLoading) {
    return <>Loading</>;
  }
  if (bulletins.isError) {
    return <>Error</>;
  }

  // console.log(bulletins.data);
  return (
    <div>
      <h2 className="underline text-lg mb-5">listes des bulletins</h2>
      <ul>
        {bulletins.data.map((bulletin: TBulletin, index: number) => (
          <li key={index}>{bulletin.filename}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bulletin;
