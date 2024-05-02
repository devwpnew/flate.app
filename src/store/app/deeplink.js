import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {path:""},
};

export const deepLink = createSlice({
  name: "deepLink",
  initialState,
  reducers: {
    storeDeepLink: (state, action) => {
      state.value.path = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeDeepLink } = deepLink.actions;

export default deepLink.reducer;
