import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import countReducer from "./count";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["countStore"],
};
const reducers = combineReducers({
  countStore: countReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
export const persist = persistStore(store);
