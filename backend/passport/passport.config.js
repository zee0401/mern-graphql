import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
      console.log(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Password incorrect" });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );
};
