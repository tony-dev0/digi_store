import { createSlice } from '@reduxjs/toolkit'

const initialState: productSliceType = {
  products: [],
  loader: true,
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    storeProducts: (state, action) => {
      state.products = action.payload
      state.loader = false
    },
  },
})
export const { storeProducts } = productSlice.actions

export default productSlice.reducer
