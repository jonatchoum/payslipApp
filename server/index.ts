import express from "express";
const app = express();

const PORT = 3000;
app.get("/api", (req, res) => {
  res.json({ response: "API LOADED !" });
});

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
