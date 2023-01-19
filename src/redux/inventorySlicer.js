import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        products: [], loading: false
    },
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload
            console.log(state.products)
        },
        // return { hostnames: state.hostnames.filter(hostname =>
        delProduct: (state, action) => {
            const index = action.payload
            console.log('INDEX', index)
            console.log({products: state.products})
            // const index = state.products.findIndex((product) => product.id === action.payload.id);
            state.products[index].deleted = true;
        },
        addProduct: (state, action) => {
            const newProduct = {
                display_name: action.payload.display_name,
                walk_in_selling_price: action.payload.walk_in_selling_price,
                cost_price: action.payload.cost_price,
                mutti_selling_price: action.payload.mutti_selling_price,
                insurance_unit_price: action.payload.insurance_unit_price,
                unit_of_measure: action.payload.unit_of_measure?.human_name,
                price: [{cost_price: action.payload.cost_price, timeStamp: new Date()}],
                deleted: false
            };
            state.products.push(newProduct)
        }
    }
})

export const { setProduct, delProduct, addProduct } = inventorySlice.actions
export default inventorySlice.reducer