import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    bio: {
      type: String,
      required: true,
    },
    fieldOfIntrest: {
      type: Array,
    },
    isCompany: {
      type: Boolean,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    connections: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    messages: {
      type: Array,
      default: [],
    },
    location: String,
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("UserConnectify", UserSchema);
export default User;
