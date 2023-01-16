import { Loader, SegmentedControl } from "@mantine/core";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import querySocietes from "../Hooks/querySocietes";

const Dashboard = () => {
  const navigate = useNavigate();
  const societes = querySocietes();

  if (societes.isLoading) {
    return <Loader />;
  }

  if (societes.isError) {
    return <>Error</>;
  }

  type societe = { societe: string };

  const listesocietes = societes.data.map(
    (societe: societe) => societe.societe
  );

  return (
    <div className="flex p-5 w-full max-w-3xl border-4 container gap-5 overflow-hidden">
      <SegmentedControl
        className="min-w-fit h-fit "
        data={listesocietes}
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
