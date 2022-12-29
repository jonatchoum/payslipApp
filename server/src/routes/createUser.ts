import { Router } from "express";
import { User } from "../db/sequelize/Sequelize";

import bcrypt from "bcrypt";
import { User as TUser } from "../Types/myTypes";

const router = Router();
const saltRounds = 10;

router.post("/createUser", async (req, res) => {
  const userInfo: TUser = req.body;
  console.log(req.body);
  // console.log(JSON.parse(req.body));
  // if () {
  //   return res.status(400).json("Champs manquants !");
  // }
  // console.log({ username, password, service, role, admin });
  // if (!(username && password)) {
  //   return res.status(403).json("you must provide a username AND a password");
  // }
  const user = await User.findOne({ where: { username: userInfo.username } });
  if (user) {
    return res.status(403).json("user already exist");
  }
  const password_hash = await bcrypt.hash(userInfo.password, saltRounds);
  const createdUser = await User.create({
    username: userInfo.username,
    password: password_hash,
    role: userInfo.role,
    service: userInfo.service,
    admin: userInfo.admin,
  });

  res.json({
    message: "Utilisateur a été créer avec succés",
    data: createdUser,
  });
});

export { router };
