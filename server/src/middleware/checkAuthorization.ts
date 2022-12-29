import { NextFunction, Request, Response } from "express";

const checkAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🚀 ~ file: checkAuthorization.ts:16 ~ req.params", req.params);
  next();
};

export { checkAuthorization };
