import { Router } from "express";
import { upload } from "../multer/multer-config";
// import multer from "multer";

const router = Router();

//TODO MIDDLEWARE TO CHECK req.body

router.post("/upload", upload, (req, res) => {
  // console.log("🚀 ~ file: upload.ts:9 ~ req.body", req.body);
  return res
    .status(200)
    .json({ info: "success", file: req.file, data: req.body });
});

export { router };
