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
  const [file, setFile] = useState<string | Blob>("");

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
    const formData = new FormData();
    formData.append("mois", mois);
    const stringUser = JSON.stringify(user.data[0]);
    formData.append("user", stringUser);
    formData.append("bulletin", file);
    mutation.mutate(formData);
  };

  if (user.isLoading) {
    return <>Loading</>;
  }
  if (user.isError) {
    return <>Error</>;
  }

  console.log(mois);
  console.log(user.data[0]);

  // console.log("🚀 ~ file: UserRefactor.tsx:11 ~ User ~ user", user.data[0].id);

  return (
    <div className="flex gap-10">
      <p>
        id : {user.data[0].id}
        username : {user.data[0].username}
      </p>
      <Bulletin id={user.data[0].id}></Bulletin>
      <form
        className="grid  gap-5 place-items-center"
        encType="multipart/form-data"
        onSubmit={submitForm}
      >
        <label htmlFor="bulletinSalaire">Upload un bulletin de salaire</label>
        <input
          type="file"
          name="bulletinSalaire"
          id="bulletinSalaire"
          // accept=".pdf"
          className="p-32 border border-dashed hover:bg-slate-400 rounded-lg"
          onChange={(e) => {
            if (!e.target.files) return;
            setFile(e.target.files[0]);
          }}
        />
        <input
          type="month"
          name="bulletin"
          className="max-w-fit p-1 rounded-lg"
          onChange={(e) => {
            setMois(e.target.value);
          }}
          min="2020-01"
          max="2025-12"
        />
        {mois && file && user.data ? (
          <button type="submit" className="bg-green-500">
            envoyer
          </button>
        ) : (
          <button
            type="submit"
            className=" disabled:bg-red-500 hover:"
            disabled
          >
            ------
          </button>
        )}
      </form>
    </div>
  );
};

export default User;
