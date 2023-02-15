import { Button, TextInput } from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Demande = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  return (
    <div className="grid p-5">
      <h1 className="text-center">Nouveau ticket</h1>
      <form className="grid gap-2 place-content-center">
        <TextInput
          placeholder="Adresse email"
          type="text"
          label="Adresse email"
          {...register("mail")}
        />
        <TextInput
          placeholder="Nom"
          type="text"
          label="Nom"
          {...register("nom")}
        />
        <TextInput
          placeholder="Numéro de téléphone"
          type="text"
          label="Numéro de téléphone"
          {...register("phone")}
        />
        {/* <TextInput placeholder="" type="text" label="" {...register("")} />
        <TextInput placeholder="" type="text" label="" {...register("")} />
        <TextInput placeholder="" type="text" label="" {...register("")} />
        <TextInput placeholder="" type="text" label="" {...register("")} />
        <TextInput placeholder="" type="text" label="" {...register("")} /> */}
        <Button type="submit" className="">
          envoyer
        </Button>
        <Button color={"red"} onClick={() => navigate("/profile")}>
          annuler
        </Button>
      </form>
    </div>
  );
};

export default Demande;
