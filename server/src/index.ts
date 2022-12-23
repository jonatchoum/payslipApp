import express from "express";
import cors from "cors";
import { router as root } from "./routes/api";
import { router as service } from "./routes/services";
import { router as users } from "./routes/users";
import { router as upload } from "./routes/upload";
const app = express();

const PORT = 3000;
app.use(cors({ origin: ["http://localhost:5173"], methods: ["GET", "POST"] }));
// app.use(express.urlencoded({}));
// app.use(express.json());
app.use("/api", upload);
app.use("/api", root);
app.use("/api", service);
app.use("/api", users);

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
