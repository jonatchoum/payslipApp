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
  ]
    .sort()
    .reverse();

  return (
    <div className="text-left">
      <h2 className="text-xl">FICHIERS</h2>
      <div>
        {years.map((year, index) => {
          return (
            <details key={index}>
              <summary>{year}</summary>
              <>
                {bulletins.data
                  .filter(
                    (fichier: TBulletin) => fichier.date.split("-")[0] === year
                  )
                  .map((fichier: TBulletin) => (
                    <div
                      key={fichier.id}
                      className="flex gap-2 place-items-center p-1"
                    >
                      <div>{fichier.filename}</div>
                      <a
                        href={`http://localhost:3000/api/download/${props.id}/${fichier.filename}`}
                        download={true}
                      >
                        <img
                          src="/arrow-down-doc-fill-svgrepo-com.svg"
                          alt=""
                          className="w-8 fill-cyan-500"
                        />
                      </a>
                    </div>
                  ))}
              </>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default Bulletin;
