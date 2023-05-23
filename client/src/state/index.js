import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  userPosts: [],
  connections: [],
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
    setUserPosts: (state, action) => {
      if (state.user) {
        state.user.userPosts = action.payload.userPosts;
      } else {
        console.log("User posts non existent");
      }
    },
    setConnections: (state, action) => {
      state.connections = action.payload.connections;
    },
    setPost: (state, action) => {
      const updatedPosts = state.pets.map((post) => {
        if (post._id == action.payload._id) return action.payload.post;
      });
    },
  },
});

export const { setLogin, setLogout, setConnections, setUserPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
