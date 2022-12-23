import { Router } from "express";
import mysql from "mysql2/promise";
const router = Router();

router.get("/users", async (req, res) => {
  const query = "SELECT * FROM Users WHERE 1";
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "FAKE_DB",
      password: "root",
      port: 40000,
    });
    const [rows] = await connection.query(query);
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    // connection.end();
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM Users WHERE id=${id}`;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "FAKE_DB",
    password: "root",
    port: 40000,
  });
  try {
    const [user] = await connection.query(query);
    // console.log("🚀 ~ file: users.ts:37 ~ router.get ~ user", user);
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    connection.end();
  }
});

router.get("/users/:service", async (req, res) => {
  const { service } = req.params;
  const query = `SELECT * FROM Users WHERE service='${service}'`;
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
