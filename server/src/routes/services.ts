import { Router } from "express";
import mysql from "mysql2/promise";
const router = Router();
const query = "SELECT DISTINCT service FROM `Users` WHERE 1";

router.get("/services", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "FAKE_DB",
    password: "root",
  });
  try {
    const [rows] = await connection.query(query);
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    connection.end();
  }
});

export { router };
