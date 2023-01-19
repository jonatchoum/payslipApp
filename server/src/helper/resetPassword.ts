import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";
// import { where } from "sequelize";

const allowResetPassword = async (req: Request, res: Response) => {
  const { id, token } = req.params;
  if (!id && !token) {
    return res.status(401).json({ message: "user and token !" });
  }
  const user: any = await User.findByPk(id);
  if (!user) {
    return res.status(401).json({ message: "No user found" });
  }
  const { hash_password } = user;
  const decodedJWT = jwt.decode(token);

  if (decodedJWT !== hash_password) {
    console.log(hash_password, { decodedJWT });
    const message = "Pas authorisé à réinitialiser le mot de passe";
    console.log(message);
    return res.status(401).json(message);
  }
  res.json("Allowed to reset password");
};

const resetPassword = async (req: Request, res: Response) => {
  const saltRounds = 10;
  const { id, token, password } = req.body;
  if (!(id && password && token)) {
    console.log("no id / password /token provided");
    return res.status(401).json("no id / password / token provided");
  }
  // console.table([id, token, password]);
  console.log("🚀 ~ file: resetPassword.ts:35 ~ resetPassword ~ id", id);
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
      message: "Not allowed to reset password",
      data: { decodedJWT, hash_password },
    });
  }

  const hash = await bcrypt.hash(password, saltRounds);
  await User.update({ hash_password: hash }, { where: { id: id } });
  res.json({ message: "Change password successfully", data: user });
};

export { allowResetPassword, resetPassword };
