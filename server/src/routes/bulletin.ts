import { Router } from "express";
import { Bulletin } from "../db/sequelize/Sequelize";
const router = Router();

router.get("/user/:id/bulletin", async (req, res) => {
  const { id } = req.params;
  try {
    const bulletins = await Bulletin.findAll({
      where: { user_id: id },
      order: [["date", "DESC"]],
    });
    res.json({ message: "bulletins obtenus avec succès ", data: bulletins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible d'accèder aux bulletins", error: error });
  }
});
export { router };
