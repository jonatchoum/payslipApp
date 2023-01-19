import { NextFunction, Response } from "express";

const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    const message = "⛑ Vous n'êtes pas connectés";
    console.log(message);
    return res.status(401).json(message);
  }
  console.log(req.user);
  console.log("🍀 Utilisateur authentifié");
  next();
};

export { isAuthenticated };
