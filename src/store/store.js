import { configureStore } from "@reduxjs/toolkit";
import userCityReducer from "./global/user/userCity";
import userTypeReducer from "./global/user/userType";
import userLoginReducer from "./global/user/userLogin";
import userFavoritesReducer from "./global/user/userFavorites";
import userWindowWidth from "./global/user/userWindowWidth";

import fetchTrigger from "./global/helpers/fetchTrigger";

import filterGlobalFields from "./global/filter/filterGlobalFields";
import filterVisibility from "./global/filter/filterVisibility";

import floorCheck from "./global/addForm/floorCheck";
import addForm from "./global/addForm/addForm";

// REDISIGN

import notifications from "./user/notifications";
import cities from "./app/cities";
import sections from "./app/sections";
import collections from "./app/collections";

// /REDISIGN

// HELPERS
import deeplink from "./app/deeplink";
// / HELPERS

export const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    userLogin: userLoginReducer,
    userFavorites: userFavoritesReducer,
    userWindowWidth: userWindowWidth,
    userCity: userCityReducer,
    fetchTrigger: fetchTrigger,
    filterGlobalFields: filterGlobalFields,
    filterVisibility: filterVisibility,
    floorCheck: floorCheck,
    addForm: addForm,
    notifications: notifications,
    cities: cities,
    sections: sections,
    deeplink: deeplink,
    collections: collections,
  },
});
