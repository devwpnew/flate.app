import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    array: [],
  },
};

export const collections = createSlice({
  name: "collections",
  initialState,
  reducers: {
    storeCollections: (state, action) => {
      state.value.array = action.payload;
    },
    sortCollections: (state, action) => {
      const sorted = action.payload.map(({ id, sort }) => {
        const collection = state.value.array.find(
          (collection) => collection.id === id
        );
        return { ...collection, sort: sort };
      });

      state.value.array = sorted;
    },
    removeCollection: (state, action) => {
      const filtered = state.value.array.filter(
        (collection) => collection.id != action.payload
      );

      state.value.array = filtered;
    },
    storeCollection: (state, action) => {
      const arResult = [...state.value.array];
      arResult.unshift(action.payload);
      state.value.array = arResult;
    },
    renameCollection: (state, action) => {
      state.value.array = state.value.array.map((collection) => {
        if (collection.id === action.payload.id) {
          return { ...collection, name: action.payload.name };
        } else {
          return { ...collection };
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sortCollections,
  storeCollection,
  storeCollections,
  removeCollection,
  renameCollection,
} = collections.actions;

export default collections.reducer;
