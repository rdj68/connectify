import User from "../models/User.js";
import Pet from "../models/Pets.js";
//Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUserPets = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const pets = await Promise.all(user.pets.map((id) => Pet.findById(id)));
    const formatedPets = pets.map(
      ({ _id, petName, type, breed, picturePath }) => {
        return { _id, petName, type, breed, picturePath };
      }
    );
    res.status(200).json(formatedPets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addPet = async (req, res) => {
  try {
    const { id, petId } = req.params;

    const user = await User.findById(id);
    const pet = await Pet.findById(petId);

    user.pets.push(pet);
    await user.save();

    const pets = await Promise.all(user.pets.map((id) => Pet.findById(id)));
    const formatedPets = pets.map(
      ({ _id, petName, type, breed, picturePath }) => {
        return { _id, petName, type, breed, picturePath };
      }
    );
    res.status(200).json(formatedPets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
