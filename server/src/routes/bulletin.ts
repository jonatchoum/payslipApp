import { Router } from "express";
import mysql from "mysql2/promise";
const router = Router();

// import { connection } from "../db/dbConn";

router.get("/user/:id/bulletin", async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM \`bulletin\` WHERE user_id=${id}`;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "FAKE_DB",
    password: "root",
    port: 40000,
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
