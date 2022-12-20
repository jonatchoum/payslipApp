import express from "express";
import { router as blue } from "./routes/api";
import { router as service } from "./routes/services";
import { router as users } from "./routes/users";
const app = express();

const PORT = 3000;

app.use("/", blue);
app.use("/api", service);
app.use("/api", users);

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
