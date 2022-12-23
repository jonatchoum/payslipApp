import { Router } from "express";
import { upload } from "../multer/multer-config";
import mysql from "mysql2/promise";
// import multer from "multer";

const router = Router();

//TODO MIDDLEWARE TO CHECK req.body

router.post("/upload", upload, async (req, res) => {
  const user = JSON.parse(req.body.user);
  const user_id = user.id;
  const filename = req.file?.filename;
  const mois = req.body?.mois;
  const query = `INSERT INTO \`bulletin\` (\`id\`, \`user_id\`, \`filename\`, \`date\`) VALUES (NULL, '${user_id}', '${filename}', '${mois}-01')`;
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

  // console.log("🟢" + req.file?.filename);
  // return res
  //   .status(200)
  //   .json({ info: "success", file: req.file, data: req.body });
});

export { router };
