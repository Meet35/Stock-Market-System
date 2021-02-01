import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      desc: "The user's email address.",
      trim: true,
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      desc: "user password",
      trim: true,
      type: String,
      required: true,
      select: false,
    },
    name: {
      desc: "The user's name.",
      trim: true,
      type: String,
      required: true,
    },
    date: {
      desc: "date for backend",
      type: Date,
      default: Date.now,
    },
    id :{
      type : String
    },
});

export default mongoose.model("User", schema);
