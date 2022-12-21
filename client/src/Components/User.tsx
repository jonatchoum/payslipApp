import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import queryUser from "../Hooks/queryUser";
import { toast } from "react-toastify";

const User = () => {
  const { id } = useParams();
  const user = queryUser(id);
  const [mois, setMois] = useState("");
  const [file, setFile] = useState<string | Blob>("");
  console.log("🚀 ~ file: User.tsx:11 ~ User ~ file", file);
  if (user.isLoading) {
    return <>Loading</>;
  }
  if (user.isError) {
    return <>Error</>;
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    //c'est ici que le nom de fichier doit correspondre avec multer sur nodejs express
    data.append("bulletin", file);
    data.append("mois", mois);
    data.append("user", user.data);
    try {
      const response = await axios.post("upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        toast.success("fichier envoyé");
      }
      console.log("🚀 ~ file: User.tsx:23 ~ handleSubmit ~ response", response);
    } catch (error) {
      toast.error("oups le fichier n'a pas pu être envoyé");
    }
  };

  return (
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
  );
};

export default User;
