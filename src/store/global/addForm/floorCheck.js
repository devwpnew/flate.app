import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const floorCheck = createSlice({
  name: "FloorCheck",
  initialState,
  reducers: {
    getFloorCheck: (state) => {
      state.value;
    },
    setFloorCheck: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getFloorCheck, setFloorCheck } = floorCheck.actions;

export default floorCheck.reducer;
