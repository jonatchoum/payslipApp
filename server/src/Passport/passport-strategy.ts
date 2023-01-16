import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";
import { Router } from "express";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: undefined, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ where: { username: username } });
      console.log(user);
      if (!user) {
        console.log("no user found");
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const hash = user.dataValues.hash_password;
      const match = await bcrypt.compare(password, hash);
      console.log("🚀 ~ file: passport-strategy.ts:30 ~ verify ~ match", match);
      if (!match) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return cb(null, user);
    } catch (error) {
      console.log(error);
      return cb(error);
    }
  })
);

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log(req.user);
  console.log(req.isAuthenticated());
  res.json({ message: "login successfull", data: req.user });
});

export { router, passport };
