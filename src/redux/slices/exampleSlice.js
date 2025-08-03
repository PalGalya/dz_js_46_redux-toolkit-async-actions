import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../asyncActions/fetchData";

const initialState = {
  counter: 0,
  message: "Привіт з Redux!",
  users: [],
  isLoading: false,
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    reset: (state) => {
      state.counter = 0;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  increment,
  decrement,
  reset,
  updateMessage,
  addUser,
  removeUser,
} = exampleSlice.actions;

export default exampleSlice.reducer;
