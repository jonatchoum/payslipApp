import { NextFunction, Response } from "express";

const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (!req.user.admin) {
    const message = "🚧vous n'etes pas admin";
    console.log(message);
    return res.status(401).json({ message: message });
  }
  console.log("🍉admin vous pouvez continuer");
  return next();
};

export { isAdmin };
