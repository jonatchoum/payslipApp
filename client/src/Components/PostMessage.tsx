import { Button, Textarea } from "@mantine/core";
import React from "react";

const PostMessage = () => {
  return (
    <div>
      <h2 className="underline">Répondre</h2>
      <form action="" className="grid gap-2">
        <Textarea autosize minRows={2}></Textarea>
        <Button>Envoyer</Button>
      </form>
    </div>
  );
};

export default PostMessage;
