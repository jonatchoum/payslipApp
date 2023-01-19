import { Accordion, Button, Loader, Table } from "@mantine/core";
import React from "react";
import queryBulletin from "../Hooks/queryBulletin";
import { useDeletBulletin } from "../Hooks/useDeleteBulletin";
import { TBulletin } from "../Types/myTypes";
import { ConfirmModal } from "./ConfirmModal";

type IdProps = {
  id: string | undefined;
};

const Bulletin = (props: IdProps) => {
  const bulletins = queryBulletin(props.id);

  if (bulletins.isLoading) {
    return <Loader />;
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
    <div className="text-left w-full pl-4">
      <h2 className="text-xl">FICHIERS</h2>

      {/* <Accordion variant="separated" defaultValue={years[0]}> */}
      <Accordion variant="separated" defaultValue={""}>
        {years.map((year) => {
          return (
            <Accordion.Item key={year} value={year}>
              <Accordion.Control>{year}</Accordion.Control>
              <Accordion.Panel>
                <Table>
                  <thead>
                    {/* <tr>
                        <th>filename</th>
                      </tr> */}
                  </thead>
                  <tbody>
                    {bulletins.data
                      .filter(
                        (fichier: TBulletin) =>
                          fichier.date.split("-")[0] === year
                      )
                      .map((fichier: TBulletin, index: number) => (
                        <tr key={index}>
                          <td>{fichier.filename}</td>
                          <td>
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
                          </td>
                          <td>
                            <ConfirmModal
                              id_bulletin={fichier.id}
                            ></ConfirmModal>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Bulletin;
