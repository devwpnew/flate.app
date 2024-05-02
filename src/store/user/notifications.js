import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    notSeenNotificationsCount: 0,
    notifications: [],
  },
};

export const notifications = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    storeNotifications: (state, action) => {
      state.value.notifications = action.payload;
    },
    storeNotSeenNotificationsCount: (state, action) => {
      state.value.notSeenNotificationsCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeNotSeenNotificationsCount, storeNotifications } = notifications.actions;

export default notifications.reducer;
