import { createSlice } from "@reduxjs/toolkit";
import { markAsDeleted } from "../component/Home";
import EditProductInArray from "../lib/EditProduct";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
      console.log(state.products);
    },
    delProduct: (state, action) => {
      const newProd = markAsDeleted(action.payload, state.products);
      state.products = newProd;
    },
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now(),
        display_name: action.payload.display_name,
        walk_in_selling_price: action.payload.walk_in_selling_price,
        cost_price: action.payload.cost_price,
        mutti_selling_price: action.payload.mutti_selling_price,
        insurance_unit_price: action.payload.insurance_unit_price,
        unit_of_measure: action.payload.unit_of_measure,
        price: [
          { cost_price: action.payload.cost_price, timeStamp: new Date() },
        ],
        deleted: false,
      };
      state.products.push(newProduct);
    },
    editProduct: (state, action) => {
      //   const newProd = [...state.products];
      //   const index = state.products.findIndex(
      //     (prod) => prod.id === action.payload.id
      //   );
      //   newProd[index] = action.payload;
      //   state.products = newProd;
        const newEdit = EditProductInArray(action.payload, state.products);
        state.products = newEdit;
    },
  },
});

export const { setProduct, delProduct, addProduct, editProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
