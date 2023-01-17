import { Request, Response } from "express";
import { User } from "../db/sequelize/Sequelize";

export const updateUser = async (req: Request, res: Response) => {
  const { id, username, prenom, nom, role, email, societe, admin } = req.body;
  if (!id) {
    console.log("no id");
    return res.status(400).json("should provide id");
  }

  try {
    if (username) {
      await User.update({ username: username }, { where: { id: id } });
    }
    if (prenom) {
      await User.update({ prenom: prenom }, { where: { id: id } });
    }
    if (nom) {
      await User.update({ nom: nom }, { where: { id: id } });
    }
    if (role) {
      await User.update({ role: role }, { where: { id: id } });
    }
    if (email) {
      await User.update({ email: email }, { where: { id: id } });
    }
    if (societe) {
      await User.update({ societe: societe }, { where: { id: id } });
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
