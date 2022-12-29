import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const handleUpload = async (
  e: React.FormEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: UseQueryResult<any, unknown>,
  mois: string,
  file: string
) => {
  e.preventDefault();
  const data = new FormData();
  //c'est ici que le nom de fichier doit correspondre avec multer sur nodejs express
  data.append("mois", mois);
  //multer accepte seulement des string ou des fichiers donc on converti le user object en string
  const stringUser = JSON.stringify(user.data[0]);
  data.append("user", stringUser);
  data.append("bulletin", file);
  try {
    const response = await axios.post("upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      toast.success("fichier envoyé");
    }
    // console.log("🚀 ~ file: User.tsx:23 ~ handleSubmit ~ response", response);
  } catch (error) {
    toast.error("oups le fichier n'a pas pu être envoyé");
  }
};

export default handleUpload;
