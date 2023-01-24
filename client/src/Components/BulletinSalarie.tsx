import { Accordion, Loader, Table } from "@mantine/core";
import React from "react";
import queryBulletin from "../Hooks/queryBulletin";
import { TBulletin } from "../Types/myTypes";
import { currentMonth } from "./MonthHelper";
import { BulletinDownload } from "./BulletinDownload";

export type IdProps = {
  id: number;
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
      <h2 className="text-xl">Tous les bulletins de salaire</h2>

      <div>
        <Accordion variant="separated" defaultValue={""}>
          {years.map((year) => {
            return (
              <Accordion.Item key={year} value={year}>
                <Accordion.Control>{year}</Accordion.Control>
                <Accordion.Panel>
                  <Table>
                    <thead></thead>
                    <tbody>
                      {bulletins.data
                        .filter(
                          (fichier: TBulletin) =>
                            fichier.date.split("-")[0] === year
                        )
                        .map((fichier: TBulletin, index: number) => (
                          <tr key={index} className="hover:bg-slate-200">
                            <td>{currentMonth(fichier.date)}</td>
                            <td>
                              <BulletinDownload
                                user_id={fichier.user_id}
                                filename={fichier.filename}
                              />
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
    </div>
  );
};

export default Bulletin;
