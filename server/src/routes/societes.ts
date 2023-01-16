import { Router } from "express";
import { sequelize, User } from "../db/sequelize/Sequelize";

const router = Router();

router.get("/societes", async (req, res) => {
  const societes = await sequelize.query(
    "SELECT DISTINCT societe FROM `Users` WHERE 1",
    { model: User }
  );
  console.log(societes);
  res.json({ data: societes });
});

export { router };
