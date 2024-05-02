import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    array: [],
  },
};

export const sections = createSlice({
  name: "sections",
  initialState,
  reducers: {
    storeSections: (state, action) => {
      state.value.array = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeSections } = sections.actions;

export default sections.reducer;
