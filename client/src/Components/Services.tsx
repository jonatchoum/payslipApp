import { Loader } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import querySocietes from "../Hooks/querySocietes";
import { Societe } from "../Types/myTypes";

const Services = () => {
  const societes = querySocietes();

  if (societes.isLoading) {
    return <Loader />;
  }

  if (societes.isError) {
    return <>Error</>;
  }

  return (
    <ul className="flex  around max-w-xl flex-wrap">
      {societes.data.map((societe: Societe, index: number) => (
        <li key={index} className="text-left p-1">
          <Link to={`/service/${societe.societe}`}>
            <button>{societe.societe}</button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Services;
