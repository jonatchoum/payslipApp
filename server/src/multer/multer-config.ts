import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!(req.body?.mois && req.body?.user)) {
      console.log(
        "🚀 ~ file: multer-config.ts:7 ~ 🟥🟥🟥🟥il manque un champs mois ou user"
      );
    }
    console.log("🚀 ~ file: multer-config.ts:9 ~ req.body", req.body);
    const { mois, user } = req.body;
    console.log(user.username);
    console.log("🚀 ~ file: multer-config.ts:12 ~ mois", mois);

    cb(null, "../bulletinsDeSalaire");
  },

  filename: (req, file, cb) => {
    // console.log("🚀 ~ file: multer-config.ts:14 ~ file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//upload.single("key") "key" doit correspondre a la key du fichier du formData passé
//Form Data : key : (binary)
export const upload = multer({ storage: storage }).single("bulletin");
