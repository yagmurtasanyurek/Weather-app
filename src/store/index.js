import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./api/weatherApi.js";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  // ?????????????????????????????????????
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export { weatherApi };

// export everything from here
