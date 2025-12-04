import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import savedQueriesReducer from "./slices/savedQueriesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "savedQueries"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  savedQueries: savedQueriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
