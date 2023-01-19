import express from "express";
import cors from "cors";
import session from "express-session";
import { router as root } from "./routes/api";
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
import { sendResetMail } from "./helper/sendResetMail";
import { allowResetPassword, resetPassword } from "./helper/resetPassword";
import { deleteBulletin } from "./helper/deleteBulletin";
import { isAdmin } from "./middleware/isAdmin";
import { isAuthenticated } from "./middleware/isAuthenticated";

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

app.use(express.json());

//route non authentifiées
app.use("/api", root); // just to test message in browser
app.use("/api", login);

app.post("/api/resetMail", sendResetMail);
app.get("/api/allowResetPassword/:id/:token", allowResetPassword);
app.post("/api/resetPassword", resetPassword);

//routes authentifiées
app.use(isAuthenticated); // erreur si non connecté

app.use("/api", users);
app.use("/api", bulletin);
app.use("/api", download);
app.use("/api", societes);
app.use("/api", me);
app.use("/api", logout);

//admin routes

app.patch("/api/updateUser", isAdmin, updateUser);
app.use("/api", isAdmin, createUser);
app.use("/api", isAdmin, upload);
app.delete("/api/deleteBulletin/:id", isAdmin, deleteBulletin);

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}\nhttp://localhost:3000/api`)
);
