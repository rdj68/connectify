import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
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
    isSeller: {
      type: Boolean,
      required: true,
    },
    pets: {
      type: Array,
      default: [],
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
