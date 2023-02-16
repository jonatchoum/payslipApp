import { Button, Paper, Select, Textarea } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTicket } from "../Hooks/useTicket";

const Demande = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [sujet, setSujet] = useState("");

  const mutation = useTicket();

  const onSubmit = (data: any) => {
    console.log({ ...data, sujet });
    mutation.mutate({ ...data, sujet });
  };

  return (
    <Paper withBorder shadow="md" className="grid p-5 max-w-fit mx-auto">
      <h1 className="">Nouveau ticket</h1>
      <p className="">
        Veuillez remplir le formulaire ci-dessous pour ouvrir un nouveau ticket.
      </p>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Rubrique d'aide"
          placeholder="Choisir"
          searchable
          nothingFound="No options"
          required
          data={[
            "Changement d'email",
            "Problème de téléchargement de bulletin de salaire",
            "Problème avec votre mot de passe",
            "Autre",
          ]}
          onChange={(e) => {
            if (e != null) {
              setSujet(e);
            }
          }}
        />
        <Textarea
          placeholder="Détails des raisons de l'ouverture du ticket"
          label="Veuillez décrire votre problème"
          autosize
          minRows={2}
          {...register("details")}
          required
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
    </Paper>
  );
};

export default Demande;
