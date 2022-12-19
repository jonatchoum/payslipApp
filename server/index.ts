import express from "express";
import mysql from "mysql2";

const app = express();

const PORT = 3000;
app.get("/api", (req, res) => {
  res.json({ response: "API LOADED !" });
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "FAKE_DB",
  password: "root",
});

connection.query("SELECT * FROM `Users` WHERE 1", (err, results) => {
  console.log(results);
});

connection.end();

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
