import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { useDeletBulletin } from "../Hooks/useDeleteBulletin";

function ConfirmModal(props: any) {
  const { mutate } = useDeletBulletin();
  const openModal = () =>
    openConfirmModal({
      title: "",
      children: (
        <Text size="sm">
          Voulez vous vraiment supprimer ce bulletin de paie ?
        </Text>
      ),
      labels: { confirm: "Confirmer", cancel: "Annuler" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => mutate(props.id_bulletin),
    });

  return (
    <Button onClick={openModal} color="red">
      Supprimer
    </Button>
  );
}

export { ConfirmModal };
