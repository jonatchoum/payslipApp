import { Router } from "express";
import { User } from "../db/sequelize/Sequelize";
const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    // connection.end();
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/users/:societe", async (req, res) => {
  const { societe } = req.params;
  try {
    const users = await User.findAll({ where: { societe: societe } });
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export { router };
