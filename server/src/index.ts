import express from "express";
import cors from "cors";
import session from "express-session";
import { router as root } from "./routes/api";
// import { router as service } from "./routes/services";
import { router as users } from "./routes/users";
import { router as upload } from "./routes/upload";
import { router as bulletin } from "./routes/bulletin";
import { router as download } from "./routes/download";
import { router as login } from "./Passport/passport-strategy";
import { router as logout } from "./routes/logout";
import { router as me } from "./routes/me";
import { router as createUser } from "./routes/createUser";
import { router as societes } from "./routes/societes";
import { updateUser } from "./routes/updateUser";
import { passport } from "./Passport/passport-strategy";
import { testNodemailer, transporter } from "./Nodemailer/nodemailer";

const app = express();

const PORT = 3000;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: 36000000 },
  })
);

app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

// mail test
testNodemailer();

// const message = {
//   from: "donibanesalaire@outlook.fr",
//   to: "donisalaire@yopmail.com",
//   subject: "NodeMailer",
//   text: "another",
//   // html: "<p>HTML version of the message</p>",
// };

// transporter.sendMail(message);

// app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE"] }));
// app.use(express.urlencoded({}));
app.use(express.json());
app.use("/api", upload);
app.use("/api", root);
// app.use("/api", service);
app.use("/api", users);
app.use("/api", bulletin);
app.use("/api", download);
app.use("/api", societes);

app.use("/api", login);
app.use("/api", me);
app.use("/api", createUser);
app.patch("/api/updateUser", updateUser);

app.use("/api", logout);

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
