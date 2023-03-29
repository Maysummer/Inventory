import { combineReducers, configureStore } from "@reduxjs/toolkit";
import inventoryReducer from '../redux/inventorySlicer'
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//create persistor configuration object
const persistConfig = {
  key: "root",
  storage,
};

/*create persisted reducer
combineReducers: combine all of our reducers into a single reducer*/
const rootReducer = combineReducers({
  inventory: inventoryReducer,
});

//persistReducer function: creates a new reducer that automatically persists its state to local storage.
const persistedReducer = persistReducer(persistConfig, rootReducer);

//create redux store with persistedReducer and a persistor with persistStore function

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

export {store, persistor}