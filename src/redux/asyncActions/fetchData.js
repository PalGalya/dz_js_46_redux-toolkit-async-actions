import { createAsyncThunk } from "@reduxjs/toolkit";

// Проста асинхронна дія для завантаження користувачів
export const fetchUsers = createAsyncThunk(
  "example/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);
