import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
