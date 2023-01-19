import { Router } from "express";

const router = Router();

router.get("/me", (req: any, res) => {
  if (!req.isAuthenticated()) {
    console.log("🔴 Utilisateur non authentifié !");
    return res.status(401).json("NON CONNECTE");
  }
  console.log("✅utilisateur authentifié");
  res.json({ message: "vous êtes connecté", data: req.user });
});

export { router };
