import React from "react";
import { useParams } from "react-router-dom";
import { DropzoneButton } from "./Dropzone";
import User from "./User";

const MantineUserUpload = () => {
  const { id } = useParams();
  return <User></User>;
};

export default MantineUserUpload;
