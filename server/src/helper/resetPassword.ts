import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";
import { where } from "sequelize";

const allowResetPassword = async (req: Request, res: Response) => {
  const { id, token } = req.body;
  if (!id && !token) {
    return res.status(401).json({ message: "user and token !" });
  }
  const user: any = await User.findByPk(id);
  if (!user) {
    return res.status(401).json({ message: "No user found" });
  }
  const { hash_password } = user;
  const decodedJWT = jwt.decode(token);
  console.table([hash_password, token, decodedJWT]);
  if (decodedJWT !== hash_password) {
    console.log(hash_password, { decodedJWT });
    console.log("NON");
    return res.status(401).json("NON");
  }
  res.json("Allowed to reset password");
};

const resetPassword = async (req: Request, res: Response) => {
  const saltRounds = 10;
  const { id, password, token } = req.body;
  if (!(id && password && token)) {
    console.log("no id / password /token provided");
    return res.status(401).json("no id / password / token provided");
  }
  const user: any = await User.findByPk(id);
  if (!user) {
    console.log("No user found to change password");
    return res.status(404).json("No user found to change password");
  }
  console.log({ user });
  const decodedJWT = jwt.decode(token);
  const { hash_password } = user;
  if (!hash_password) {
    return res.status(401).json("no hash_password found");
  }
  if (decodedJWT !== hash_password) {
    return res.status(401).json({
      message: "No auth to reset password",
      data: { decodedJWT, hash_password },
    });
  }

  const hash = await bcrypt.hash(password, saltRounds);
  await User.update({ hash_password: hash }, { where: { id: id } });
  res.json({ message: "Change password successfully", data: user });
};

export { allowResetPassword, resetPassword };
