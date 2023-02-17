import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";
import useCreateUser from "../Hooks/useCreateUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const FormData = z.object({
  username: z.string().min(3, { message: "Nom d'utilisateur invalide !" }),
  prenom: z.string().min(3, { message: "Prénom invalide !" }),
  nom: z.string().min(3, { message: "Nom invalide !" }),
  role: z.string().min(3, { message: "Rôle invalide !" }),
  email: z.string().email({ message: "Email invalide !" }),
  // societe: z.string().min(3, { message: "Société invalide !" }),
  admin: z.boolean(),
});

const CreateUser = () => {
  const { mutate } = useCreateUser();
  const [societe, setSociete] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormData) });

  const onSubmit = async (data: any) => {
    mutate({ ...data, societe });
    // console.log({ ...data, societe });
  };

  return (
    <div className="grid gap-1 mb-10">
      <h1>Créer un nouvel utilisateur</h1>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nom d'utilisateur"
          type="text"
          placeholder="Nom d'utilisateur"
          {...register("username")}
          error={
            errors?.username?.message && errors.username.message.toString()
          }
          required
        />
        <TextInput
          label="Prénom"
          type="text"
          placeholder="Prénom"
          {...register("prenom")}
          error={errors?.prenom?.message && errors?.prenom?.message.toString()}
          required
        />
        <TextInput
          label="Nom"
          type="text"
          placeholder="Nom"
          {...register("nom")}
          error={errors?.nom?.message && errors?.nom?.message.toString()}
          required
        />
        <TextInput
          label="Rôle"
          type="text"
          placeholder="Rôle"
          {...register("role")}
          error={errors?.role?.message && errors?.role?.message.toString()}
          required
        />
        <TextInput
          label="Email"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors?.email?.message && errors?.email?.message.toString()}
          required
        />
        <Select
          label="Société"
          data={[
            "AGENCE DU PARC",
            "DONIBANE TRANSACTION",
            "AGENCE DONIBANE",
            "CABINET COSTE IMMOBILIER",
            "ADMAINTENANCE",
            "AGENCE SENSEY",
            "DONIBANE PROMOTION",
          ]}
          onChange={(e) => {
            if (e != null) {
              setSociete(e);
            }
            console.log(societe);
          }}
          required
        />
        <label htmlFor="admin" className="text-sm font-semibold">
          Admin
        </label>
        <Checkbox size="md" {...register("admin")} defaultChecked={false} />
        <Button type="submit">Créer</Button>
      </form>
      <Link to={".."}>
        <Button color={"red"} className="w-full">
          Annuler
        </Button>
      </Link>
    </div>
  );
};

export default CreateUser;
