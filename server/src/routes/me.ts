import { Request, Router } from "express";

const router = Router();

router.get("/me", (req: Request, res) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    return res.status(401).json("NON CONNECTE");
  }
  res.json({ message: "vous êtes connecté", data: req.user });
});

export { router };
