import { Request, Response } from "express";
import { Bulletin } from "../db/sequelize/Sequelize";

const deleteBulletin = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    const message = "pas d'id, le bulletin n'a pas pu être supprimé";
    return res.status(400).json({ message: message });
  }

  const bulletin = await Bulletin.findByPk(id);
  if (!bulletin) {
    const message = "le bulletin n'existe pas en db";
    return res.status(400).json({ message: message });
  }

  try {
    await bulletin.destroy();
    return res.json({ messsage: "Bulletin supprimé", data: bulletin });
  } catch (error) {
    res.status(500).json("le bulletin n'a pas pu être supprimé");
  }
};

export { deleteBulletin };
