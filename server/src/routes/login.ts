import { Router } from "express";
import { User } from "../db/sequelize/Sequelize";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username: username, password: password },
  });

  // console.log({ user });

  if (!user) {
    return res.status(404).json({ message: "no user found" });
  }
  console.log(
    "🚀 ~ file: login.ts:15 ~ router.post ~ user?.dataValues.password",
    user?.dataValues.password
  );
  res.json({ message: "user found", data: user });
});

export { router };
