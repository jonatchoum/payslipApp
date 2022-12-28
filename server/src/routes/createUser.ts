import { Router } from "express";
import { User } from "../db/sequelize/Sequelize";

import bcrypt from "bcrypt";

const router = Router();
const saltRounds = 10;

router.post("/createUser", async (req, res) => {
  const { username, password, service, role, admin } = req.body;
  if (!(username && password)) {
    return res.status(403).json("you must provide a username AND a password");
  }
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    return res.status(403).json("user already exist");
  }
  const password_hash = await bcrypt.hash(password, saltRounds);
  const createdUser = await User.create({
    username: username,
    password: password_hash,
    role: role,
    service: service,
    admin: admin,
  });

  res.json({
    message: "Utilisateur a été créer avec succés",
    data: createdUser,
  });
});

export { router };
