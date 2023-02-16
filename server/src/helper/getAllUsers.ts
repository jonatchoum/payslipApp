import { Request, Response } from "express";
import { User } from "../db/sequelize/Sequelize";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ message: "Voici la liste des utilisateurs", data: users });
};

export { getAllUsers };
