import { Router } from "express";
import { User } from "../db/sequelize/Sequelize";

import bcrypt from "bcrypt";
// import { TUser } from "../Types/myTypes";

const router = Router();
const saltRounds = 10;

router.post("/createUser", async (req, res) => {
  const userInfo = req.body;
  const { username, nom, prenom, role, password, email, societe, admin } =
    req.body;
  if (
    !(username && nom && prenom && role && password && email && societe) ||
    admin === undefined
  ) {
    console.log();
    console.log("manque une info");
    console.log({
      username,
      nom,
      prenom,
      role,
      password,
      email,
      societe,
      admin,
    });
    return res.status(400).json({
      message: "manque une info",
      data: { username, nom, prenom, role, password, email, societe, admin },
    });
  }

  // console.log(req.body);

  const user = await User.findOne({ where: { username: userInfo.username } });
  if (user) {
    return res.status(403).json("user already exist");
  }
  const password_hash = await bcrypt.hash(userInfo.password, saltRounds);
  const createdUser = await User.create({
    username: userInfo.username,
    hash_password: password_hash,
    prenom: userInfo.prenom,
    nom: userInfo.nom,
    role: userInfo.role,
    email: userInfo.email,
    societe: userInfo.societe,
    admin: userInfo.admin,
  });

  res.json({
    message: "Utilisateur a été créer avec succès",
    data: createdUser,
  });
});

export { router };
