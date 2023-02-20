import { Button, Textarea } from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { usePostMessage } from "../Hooks/useTicket";

const PostMessage = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();

  const mutation = usePostMessage();

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(id);
    mutation.mutate({ id, data });
    // mutation.mutate();
  };
  return (
    <div>
      <h2 className="underline">Répondre</h2>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Textarea autosize minRows={2} {...register("reply")}></Textarea>
        <Button type="submit">Envoyer</Button>
      </form>
    </div>
  );
};

export default PostMessage;
