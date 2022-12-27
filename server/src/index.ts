import express from "express";
import cors from "cors";
import session from "express-session";
import { router as root } from "./routes/api";
import { router as service } from "./routes/services";
import { router as users } from "./routes/users";
import { router as upload } from "./routes/upload";
import { router as bulletin } from "./routes/bulletin";
import { router as download } from "./routes/download";
import { router as login } from "./routes/loginHash";
import { router as hashPass } from "./Passport/passport-strategy";
import { router as logout } from "./routes/logout";
import { passport } from "./Passport/passport-strategy";

const app = express();

const PORT = 3000;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

// app.use(cors({ origin: ["http://localhost:5173"], methods: ["GET", "POST"] }));
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE"] }));
// app.use(express.urlencoded({}));
app.use("/api", upload);
app.use(express.json());
app.use("/api", root);
app.use("/api", service);
app.use("/api", users);
app.use("/api", bulletin);
app.use("/api", download);
app.use("/api", login);
app.use("/api", hashPass);

app.use("/api", logout);
// app.delete("/api/logout", (req, res) => {
//   req.logOut((err) => {
//     console.log(err);
//     return res
//       .status(500)
//       .json({ message: "une erreur est survenur", data: err });
//   });
//   console.log(`-------> User Logged out`);
//   res.json("logout success");
// });

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
