import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const axiosLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post("hash", { username, password });
    if (response.status === 200) {
      toast.success("logged in");
    }
    console.log(response);
  } catch (error) {
    console.log(error || "erreur");

    toast.error("erreur");
  }
};

const useLogin = (username, password) => {
  return useMutation({ mutationFn: axiosLogin });
};

// const mutation = mutateFile();
export default useLogin;
