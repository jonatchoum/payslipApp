import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const postFile = async (formData: FormData) => {
  try {
    const response = await axios.post("upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      toast.success("fichier envoyé");
    }
    console.log(response);
  } catch (error) {
    console.log(error || "une erreur est survenue jon");

    toast.error("oups le fichier n'a pas pu être envoyé");
  }
};

const mutateFile = () => {
  return useMutation({ mutationFn: postFile });
};

// const mutation = mutateFile();
export default mutateFile;
