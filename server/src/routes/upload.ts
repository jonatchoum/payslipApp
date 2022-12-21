import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../bulletinsDeSalaire");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("bulletin"), (req, res) => {
  // console.log(req.body);
  // return res.send("image uploaded");
  return res.status(200).json({ info: "try", data: req.body });
});

export { router };
