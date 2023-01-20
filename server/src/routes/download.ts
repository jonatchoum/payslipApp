import { NextFunction, Response, Router } from "express";

const router = Router();

const isAuthorized = (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { user_id } = req.params;
  // console.log("🟩🟩🟩🟩🟩🟩🟩🟩");
  // console.log({ id, user_id });
  const userAuthorized = parseInt(id) === parseInt(user_id);
  console.log(req.user);
  if (!userAuthorized && !req.user.admin) {
    const message =
      "Vous n'êtes pas autorisés à télécharger les documents d'une autre personne";
    console.log(message);
    return res.status(401).json({ message: message });
  }
  next();
};

router.get("/download/:user_id/:filename", isAuthorized, (req, res) => {
  const { user_id, filename } = req.params;
  console.log("🚀 ~ file: download.ts:8 ~ router.get ~ user_id", user_id);
  console.log("🚀 ~ file: download.ts:7 ~ router.get ~ filename", filename);

  console.log("download en cours");
  res.download(`../bulletinsDeSalaire/${user_id}/${filename}`);
});

export { router };
