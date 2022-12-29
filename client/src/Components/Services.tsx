import { Loader } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import queryServices from "../Hooks/queryServices";
import { Service } from "../Types/myTypes";

const Services = () => {
  const services = queryServices();

  if (services.isLoading) {
    return <Loader />;
  }

  if (services.isError) {
    return <>Error</>;
  }

  return (
    <ul className="flex  around max-w-xl flex-wrap">
      {services.data.map((service: Service, index: number) => (
        <li key={index} className="text-left p-1">
          <Link to={`/service/${service.service}`}>
            <button>{service.service}</button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Services;
