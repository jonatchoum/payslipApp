import { Router } from "express";
import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";

const router = Router();

// const saltRounds = 10;
// const someOtherPlaintextPassword = "not_bacon";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const myPlaintextPassword = password;

  const user = await User.findOne({
    where: { username: username },
  });

  if (!user) {
    return res.status(404).json({ message: "no user found" });
  }

  //   const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
  //   $2b$10$EDimUrKEkAB/jZXeE.EAkeWGbQtGgcGkNKZ/lylfVa6k6ATcLEiFy

  //   $2b$10$PjyY62r3tXXjggXLWxzTUehqJkl561/CEwOPZ8aFpx9XKp1ZD30se   hash for password
  const hash = user.dataValues.password;
  console.log(hash);

  console.log({ user });
  const match = bcrypt.compareSync(myPlaintextPassword, hash);
  console.log("🚀 ~ file: loginHash.ts:28 ~ router.post ~ match", match);
  if (!match) {
    return res.status(404).json({ message: "no user found" });
  }

  res.json({ message: "user found", data: user });
});

export { router };
