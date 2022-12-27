import { Router } from "express";

const router = Router();

router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("NON CONNECTE");
  }
  res.json({ message: "vous êtes connecté", data: req.user });
});

export { router };
