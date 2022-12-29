import { Router } from "express";

const router = Router();

router.get("/download/:user_id/:filename", (req, res) => {
  const { user_id, filename } = req.params;
  console.log("🚀 ~ file: download.ts:8 ~ router.get ~ user_id", user_id);
  console.log("🚀 ~ file: download.ts:7 ~ router.get ~ filename", filename);

  console.log("download en cours");
  res.download(
    `../bulletinsDeSalaire/${user_id}/${filename}` /*(err) => {
    res.status(400).json({
      message: "Un problème est survenu pour le téléchargement du fichier",
      error: err,
    });
  });*/
  );
});

export { router };
