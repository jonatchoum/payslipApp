import multer from "multer";
import fs from "fs";
import { User } from "../Types/myTypes";

let user: User;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    user = JSON.parse(req.body.user);
    const dir = `../bulletinsDeSalaire/${user.id}`;
    //On créer le dossier "dir" qui est un dossier associé à l'id de l'utilisateur si il n'existe pas
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const { mois } = req.body;
    cb(null, mois + "_" + user.id + "_" + file.originalname);
  },
});

// Dans .single("key") "key" doit correspondre a la key du fichier du formData passé niveau frontend
// Dans l'inspecteur du navigateur  Network Form Data : key : (binary)
export const upload = multer({ storage: storage }).single("bulletin");
