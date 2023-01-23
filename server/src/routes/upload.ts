import { Router } from "express";
import { upload } from "../multer/multer-config";
import { Bulletin } from "../db/sequelize/Sequelize";
import { sendMailOnUpload } from "../helper/sendMailOnUpload";
// import multer from "multer";
const router = Router();

//TODO MIDDLEWARE TO CHECK req.body

router.post("/upload", upload, async (req, res) => {
  const user = JSON.parse(req.body.user);
  console.log(user);
  const user_id = user.id;
  const filename = req.file?.filename;
  const mois = req.body?.mois;
  console.log({ user_id, filename, mois });
  try {
    const bulletin = await Bulletin.create({
      user_id: user_id,
      filename: filename,
      date: `${mois}-05`,
    });
    sendMailOnUpload(user_id, mois);
    return res.json({ message: "bulletin ajouté en DB", data: bulletin });
  } catch (error) {
    res.status(500).json({
      message: "le bulletin n'a pas pu être ajouté en DB",
      error: error,
    });
  }
});

export { router };
