import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import { toast } from "react-toastify";
import Bulletin from "./Bulletin";

const User = () => {
  const { id } = useParams();
  const user = queryUser(id);
  const [mois, setMois] = useState("");
  const [file, setFile] = useState<string | Blob>("");
  if (user.isLoading) {
    return <>Loading</>;
  }
  if (user.isError) {
    return <>Error</>;
  }

  const handleUpload = async (
    e: React.FormEvent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // user: UseQueryResult<any, unknown>,
    // mois: string,
    // file: string
  ) => {
    e.preventDefault();
    const data = new FormData();
    //c'est ici que le nom de fichier doit correspondre avec multer sur nodejs express
    data.append("mois", mois);
    //multer accepte seulement des string ou des fichiers donc on converti le user object en string
    const stringUser = JSON.stringify(user.data[0]);
    data.append("user", stringUser);
    data.append("bulletin", file);
    try {
      const response = await axios.post("upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        toast.success("fichier envoyé");
      }
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          error.response?.data?.error?.message || "une erreur est survenue jon"
        );
      }
      toast.error("oups le fichier n'a pas pu être envoyé");
    }
  };

  return (
    <div>
      <div className="grid place-items-center">
        <h1>ajouter une fiche de paie</h1>
        <br />
        <br />
        <br />
        <div>{user.data[0].username}</div>
        <form
          onSubmit={handleUpload}
          className="grid p-10 gap-5 my-10 place-items-center"
          encType="multipart/form-data"
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
      <Bulletin id={id}></Bulletin>
    </div>
  );
};

export default User;
