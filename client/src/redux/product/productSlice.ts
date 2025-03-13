import { createSlice } from '@reduxjs/toolkit';
import { STATES } from 'mongoose';


const initialState = {
    products: [],
    loader:true
  };
  const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: { 
        storeProducts:(state, action)=>{
        state.products = action.payload;
        state.loader = false
        },
    } 
});
export const {
  storeProducts,
  // setproductLoader
} = productSlice.actions;

export default productSlice.reducer;
