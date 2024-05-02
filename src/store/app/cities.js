import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    array: [],
  },
};

export const cities = createSlice({
  name: "cities",
  initialState,
  reducers: {
    storeCities: (state, action) => {
      state.value.array = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeCities } = cities.actions;

export default cities.reducer;
