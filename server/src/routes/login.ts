import { Router } from "express";
// import mysql from "mysql2/promise";
import { User } from "../db/sequelize/Sequelize";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findAll({
    where: { username: username, password: password },
  });

  console.log(user);

  if (user.length == 0) {
    res.status(404).json({ message: "no user found", data: user });
  } else {
    res.json({ message: "user found", data: user });
  }
});

export { router };
