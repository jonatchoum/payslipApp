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

  const years = [
    ...new Set<string>(
      bulletins.data.map((fichier: TBulletin) => fichier.date.split("-")[0])
    ),
  ];

  // console.log(bulletins.data);
  console.log(
    "🚀 ~ file: Bulletin.tsx:20 ~ Bulletin ~ bulletins.data",
    bulletins.data
  );
  return (
    <div className="App">
      <h1>FICHIERS</h1>
      <div>
        {years.map((year, index) => {
          return (
            <div key={index}>
              <div>{year}</div>
              <>
                {bulletins.data
                  .filter(
                    (fichier: TBulletin) => fichier.date.split("-")[0] === year
                  )
                  .map((fichier: TBulletin) => (
                    <div key={fichier.id}>{fichier.filename}</div>
                  ))}
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bulletin;
