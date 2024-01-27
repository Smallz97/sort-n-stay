import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import hotelReducer from "./hotelSlice";
import categoryReducer from "./categorySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["hotel", "category"],
};

const rootReducer = combineReducers({
    hotel: hotelReducer,
    category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;

export const persistor = persistStore(store);