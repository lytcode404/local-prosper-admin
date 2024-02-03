import { db } from "@/db/firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Async Thunk for fetching users data
export const fetchUserstData = createAsyncThunk(
  "users/fetchUserstData",
  async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return usersData;
    } catch (error) {
      throw error;
    }
  }
);

// users Slice
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserstData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserstData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserstData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
