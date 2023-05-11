import User from "../models/User.js";
import Pet from "../models/Pets.js";

export const registerPet = async (req, res) => {
  try {
    const { sellerId, petName, type, breed, sex, vaccine, age } = req.body;
    const user = await User.findById(sellerId);

    const newPet = new Pet({
      petName: petName,
      sellerId: user.id,
      type: type,
      breed: breed,
      sex: sex,
      vaccine: vaccine,
      age: age,
      location: user.location,
    });
    await newPet.save();
    const pet = await Pet.find();

    res.status(201).json(pet);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPets = async (req, res) => {
  try {
    const pet = await Pet.find();
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPets = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.find({ id });
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
