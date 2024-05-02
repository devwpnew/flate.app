import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { section_relation: 3 } };

export const addForm = createSlice({
  name: "addForm",
  initialState,
  reducers: {
    getAddForm: (state) => {
      state.value;
    },
    setAddForm: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAddForm, setAddForm } = addForm.actions;

export default addForm.reducer;
