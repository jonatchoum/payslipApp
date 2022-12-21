import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../bulletinsDeSalaire");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("bulletin"), (req, res) => {
  if (!req.body) {
    console.log("🟥 Mauvaise requête il manque un élément");
    return res.status(400).json("Mauvaise requête");
  }

  console.log({ info: "try", file: req.file, data: req.body });
  return res.status(200).json({ info: "try", file: req.file, data: req.body });
});

export { router };
