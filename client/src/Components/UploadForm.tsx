import React from "react";

const UploadForm = () => {
  return (
    <form
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
        <button type="submit" className=" disabled:bg-red-500 hover:" disabled>
          ------
        </button>
      )}
    </form>
  );
};

export default UploadForm;
