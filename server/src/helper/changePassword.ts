import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  const saltRounds = 10;
  const { id, password } = req.body;
  const user = User.findByPk(id);
  if (!user) {
    console.log("No user found to change password");
    return res.status(404).json("No user found to change password");
  }

  const hash = await bcrypt.hash(password, saltRounds);
  await User.update({ hash_password: hash }, { where: { id: id } });
  res.json({ message: "Change password successfully", data: user });
};

export { changePassword };
