import React from "react";
import useAuth from "../Hooks/useAuth";

const Test = () => {
  const auth = useAuth();

  console.log("🚀 ~ file: Test.tsx:6 ~ Test ~ auth", auth);

  return <div>Test</div>;
};

export default Test;
