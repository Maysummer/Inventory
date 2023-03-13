import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from '../redux/inventorySlicer'

export default configureStore({
    reducer: {
        inventory: inventoryReducer
    }
})