import { Accordion, Loader, Table } from "@mantine/core";
import React from "react";
import queryBulletin from "../Hooks/queryBulletin";
import { TBulletin } from "../Types/myTypes";
import { BulletinDownload } from "./BulletinDownload";
import { ConfirmModal } from "./ConfirmModal";
import { currentMonth } from "./MonthHelper";

type IdProps = {
  id: number | undefined;
};

const Bulletins = (props: IdProps) => {
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
                  <thead></thead>
                  <tbody>
                    {bulletins.data
                      .filter(
                        (fichier: TBulletin) =>
                          fichier.date.split("-")[0] === year
                      )
                      .map((fichier: TBulletin, index: number) => (
                        <tr key={index} className="">
                          <td className="w-fit">
                            {currentMonth(fichier.date)}
                          </td>
                          <td>
                            <BulletinDownload
                              filename={fichier.filename}
                              user_id={fichier.user_id}
                            />
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

export default Bulletins;
