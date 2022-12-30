import { Loader, SegmentedControl } from "@mantine/core";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import queryServices from "../Hooks/queryServices";

const Dashboard = () => {
  const navigate = useNavigate();
  const services = queryServices();

  if (services.isLoading) {
    return <Loader />;
  }

  if (services.isError) {
    return <>Error</>;
  }

  type Service = { service: string };

  const listeServices = services.data.map(
    (service: Service) => service.service
  );

  return (
    <div className="flex p-5 w-full max-w-3xl border-4 container gap-5 overflow-hidden">
      <SegmentedControl
        className="min-w-fit h-fit "
        data={listeServices}
        defaultValue=""
        orientation="vertical"
        onChange={(value) => {
          navigate(`${value}`);
        }}
      ></SegmentedControl>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
