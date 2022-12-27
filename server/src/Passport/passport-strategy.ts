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
      if (!user) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const hash = user.dataValues.password;
      const match = await bcrypt.compare(password, hash);
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

router.post("/hash", passport.authenticate("local"), (req, res) => {
  console.log(req.isAuthenticated());
  res.json({ message: "login successfull", data: req.user });
});

export { router, passport };
