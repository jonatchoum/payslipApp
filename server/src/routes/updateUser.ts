import { Request, Response } from "express";
import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response) => {
  const saltRounds = 10;
  const { id, username, password, role, service, admin } = req.body;
  if (!id) {
    console.log("no id");
    return res.status(400).json("should provide id");
  }

  try {
    if (username) {
      await User.update({ username: username }, { where: { id: id } });
    }
    if (password) {
      const hash = await bcrypt.hash(password, saltRounds);
      console.log(hash);
      await User.update({ password: hash }, { where: { id: id } });
    }
    if (role) {
      await User.update({ role: role }, { where: { id: id } });
    }
    if (service) {
      await User.update({ service: service }, { where: { id: id } });
    }
    if (admin) {
      await User.update({ admin: admin }, { where: { id: id } });
    }

    const user = await User.findByPk(id);
    return res.json({ message: "User updated !", data: user });
  } catch (error) {
    res.status(403).json({ message: "utilisateur non updaté", error: error });
  }
};
