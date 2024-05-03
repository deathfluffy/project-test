import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://663272eec51e14d695647c67.mockapi.io/catalog/adverts";

export const fetchAdverts = createAsyncThunk(
  "catalog/fetchAdverts",
  async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching adverts:", error);
      throw error;
    }
  }
);
export const fetchDetailsFromServer = createAsyncThunk(
  "catalog/fetchDetailsFromServer",
  async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data.details;
      return data;
    } catch (error) {
      console.error("Error fetching details:", error);
      throw error;
    }
  }
);
