import { Router } from "express";
import mysql from "mysql2/promise";
const router = Router();
import { passport } from "../Passport/passport-strategy";

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

router.post("/user", async (req, res) => {
  console.log(req.isAuthenticated());
  // INSERT INTO `Users` (`id`, `username`, `password`, `role`, `service`, `admin`) VALUES ('', NULL, NULL, NULL, NULL, NULL)
  const { username, password, role, service, admin } = req.body;
  const query = `INSERT INTO \`Users\` (\`id\`, \`username\`, \`password\`, \`role\`, \`service\`, \`admin\`) VALUES (NULL, '${username}', '${password}', '${role}', '${service}', '${admin}')`;

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "FAKE_DB",
    password: "root",
    port: 40000,
  });
  try {
    await connection.query(query);
    res.json({
      response: "utilisateur ajouté",
      data: { username: username },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    connection.end();
  }
});

export { router };
