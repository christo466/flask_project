import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import peopleInfoDataReducer from "./people";
import shopeInfoDataReducer  from "./shope";
import shopePostDataReducer  from "./poststore"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleInfoDataReducer,
    shope: shopeInfoDataReducer,
    postdata:shopePostDataReducer
  },
});
