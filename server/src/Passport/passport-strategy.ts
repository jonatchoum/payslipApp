import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../db/sequelize/Sequelize";
import bcrypt from "bcrypt";
import { Router } from "express";
// import { User as TUser } from "../Types/myTypes";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ where: { username: username } });
      //   console.log("🚀 ~ file: passport-strategy.ts:26 ~ user", user);
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      const hash = user.dataValues.password;
      const match = await bcrypt.compare(password, hash);
      console.log("🚀 ~ file: passport-strategy.ts:32 ~ match", match);
      if (!match) {
        return cb(null, false, { message: "Incorrect username or password." });
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
  //   console.log(req.user);
  console.log(req.user);
  res.json({ message: "login successfull", data: req.user });
});

export { router };
