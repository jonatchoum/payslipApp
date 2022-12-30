import { Button, Input, Loader, Paper } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryUser from "../Hooks/queryUser";
import { queryClient } from "../main";
import Bulletin from "./Bulletin";

const User = () => {
  const { id } = useParams();
  const user = queryUser(id);

  const [mois, setMois] = useState("");
  const [file, setFile] = useState<File>();

  const postFile = (formData: FormData) => {
    return axios.post("/upload", formData);
  };

  const mutation = useMutation({
    mutationFn: postFile,
    onError: () => {
      toast.error("oups le fichier n'a pas pu être envoyé");
    },
    onSuccess: () => {
      toast.success("fichier envoyé");
      queryClient.invalidateQueries({ queryKey: [`bulletin${id}`] });
    },
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("mois", mois);
      const stringUser = JSON.stringify(user.data[0]);
      formData.append("user", stringUser);
      formData.append("bulletin", file);
      mutation.mutate(formData);
    }
  };

  if (user.isLoading) {
    return <Loader />;
  }
  if (user.isError) {
    return <>Error</>;
  }

  console.log(mois);
  console.log(user.data[0]);
  console.log(file);

  return (
    <Paper withBorder shadow="md" p={20} radius="md" className="w-full">
      <div className="flex  flex-col gap-10  place-content-center">
        <div className="grid">
          <div>id : {user.data[0].id}</div>
          <div>username : {user.data[0].username}</div>
        </div>
        <form
          className="grid  gap-5 place-items-center"
          encType="multipart/form-data"
          onSubmit={submitForm}
        >
          <label htmlFor="bulletinSalaire">Upload un bulletin de salaire</label>
          {mutation.isLoading ? (
            <Dropzone
              loading
              name="bulletinSalaire"
              onDrop={(file) => {
                console.log(file);
                setFile(file[0]);
              }}
              multiple={false}
            >
              {file ? <>{file.name}</> : <>Choisir fichier</>}
            </Dropzone>
          ) : (
            <Dropzone
              name="bulletinSalaire"
              onDrop={(file) => {
                console.log(file);
                setFile(file[0]);
              }}
              multiple={false}
              accept={[MIME_TYPES.pdf]}
            >
              {file ? <>{file.name}</> : <>Choisir fichier</>}
            </Dropzone>
          )}

          <Input
            type={"month"}
            name="bulletin"
            className="max-w-fit p-1 rounded-lg"
            onChange={(e) => {
              setMois(e.target.value);
            }}
            min="2020-01"
            max="2025-12"
          />

          {mois && file && user.data ? (
            <Button type="submit">Envoyer</Button>
          ) : (
            <Button color={"red"}>------</Button>
          )}
        </form>
        <Bulletin id={user.data[0].id}></Bulletin>
      </div>
    </Paper>
  );
};

export default User;
