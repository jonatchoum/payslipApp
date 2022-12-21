import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "pgn",
};

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join(" ");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + extension);
  },
});
