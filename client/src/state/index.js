import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  userPets: [],
  pets: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserPets: (state, action) => {
      if (state.user) {
        state.user.userPets = action.payload.userPets;
      } else {
        console.log("User friends non existent");
      }
    },
    setPets: (state, action) => {
      state.pets = action.payload.pets;
    },
    setPet: (state, action) => {
      const updatedPets = state.pets.map((pet) => {
        if (pet._id == action.payload._id) return action.payload.pet;
      });
    },
  },
});

export const { setLogin, setLogout, setUserPets, setPets, setPet } =
  authSlice.actions;
export default authSlice.reducer;
