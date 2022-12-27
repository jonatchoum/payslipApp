import { Router } from "express";

const router = Router();

router.delete("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "une erreur est survenur", data: err });
    }
  });
  console.log(`-------> User Logged out`);
  res.json("logout success");
});

export { router };
