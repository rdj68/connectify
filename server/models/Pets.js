import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    sellerId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    sex: {
      type: String,
      required: true,
      min: 2,
      max: 10,
    },
    vaccine: {
      type: Array,
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    age: Number,
    sold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
export default Pet;
