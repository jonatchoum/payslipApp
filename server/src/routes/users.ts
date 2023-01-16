import { Router } from "express";
import mysql from "mysql2/promise";
import { User } from "../db/sequelize/Sequelize";
const router = Router();
// import { passport } from "../Passport/passport-strategy";

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
    // console.log("🚀 ~ file: users.ts:37 ~ router.get ~ user", user);
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/users/:societe", async (req, res) => {
  const { societe } = req.params;
  const query = `SELECT * FROM Users WHERE societe='${societe}'`;
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
  // console.log(req.isAuthenticated());
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
