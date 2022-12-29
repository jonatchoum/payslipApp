import { NextFunction, Request, Response } from "express";

const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json("Vous n'êtes pas authentifiés");
};

export { checkAuthenticated };
