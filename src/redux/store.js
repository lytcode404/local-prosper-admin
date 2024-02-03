import { usersSlice } from "./UsersData";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store;
