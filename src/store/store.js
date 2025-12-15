import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import savedQueriesReducer from "./slices/savedQueriesSlice";
import searchReducer from "./slices/searchSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "savedQueries", "search"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  savedQueries: savedQueriesReducer,
  search: searchReducer,
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
