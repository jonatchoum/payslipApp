import React from "react";
import queryMe from "../Hooks/queryMe";

const Me = () => {
  const me = queryMe();

  if (me.isLoading) {
    return <>Loading</>;
  }

  if (me.isError) {
    return <>Error</>;
  }

  console.log("🚀 ~ file: me.tsx:16 ~ Me ~ me.data", me.data);
  return <div>{me.data.username}</div>;
};

export default Me;
