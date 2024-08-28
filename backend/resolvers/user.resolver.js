import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("error in authUser", error);
        throw new Error(error.message || "authUser error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.error("error in single user resolver", error);
        throw new Error(error.message || "single user error");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { userName, name, gender, password } = input;
        if (!userName || !name || !gender || !password) {
          throw new Error("Please provide all the required fields");
        }
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          userName,
          name,
          gender,
          password: hashedpassword,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        throw new Error(error.message || "internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) throw new Error("All fields are required");
        const { user } = await context.authenticate("graphql-auth", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.error("error in Login resolver", error);
        throw new Error(error.message || "login error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) {
            console.error("error in logout resolver", err);
          }
        });
        res.clearCookie("connect.sid");
        return { message: "logged out successfully" };
      } catch (error) {
        console.error("error in logout resolver", error);
        throw new Error(error.message || "logout Error");
      }
    },
  },
};

export default userResolver;
