import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Initial state of the cart
const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
}

// Create a Redux slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === newItem._id
      )
      if (existingItemIndex >= 0) {
        // Update existing item in the cart
        state.items[existingItemIndex].quantity += 1
      } else {
        // Add new item to the cart
        state.items.push(newItem)
      }
      // Update the total amount and quantity
      state.totalAmount += newItem.price * newItem.quantity
      state.totalQuantity += newItem.quantity
    },

    // Remove item from cart
    removeItemFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === itemId
      )

      if (existingItemIndex >= 0) {
        const itemToRemove = state.items[existingItemIndex]
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity
        state.totalQuantity -= itemToRemove.quantity

        // Remove the item
        state.items.splice(existingItemIndex, 1)
      }
    },

    // Clear the cart
    clearCart(state) {
      state.items = []
      state.totalAmount = 0
      state.totalQuantity = 0
    },

    // Update the quantity of a specific item
    updateItemQuantity(state, action: PayloadAction<CartItem>) {
      const { _id, quantity } = action.payload
      const existingItem = state.items.find((item) => item._id === _id)
      if (existingItem !== undefined) {
        const quantityDifference = quantity - existingItem.quantity
        existingItem.quantity = quantity

        // Update the total amount and quantity
        state.totalAmount += existingItem.price * quantityDifference
        state.totalQuantity += quantityDifference
      } else {
        const newItem = action.payload
        const existingItemIndex = state.items.findIndex(
          (item) => item._id === newItem._id
        )
        if (existingItemIndex >= 0) {
          // Update existing item in the cart
          state.items[existingItemIndex].quantity += 1
        } else {
          // Add new item to the cart
          state.items.push(newItem)
        }
        // Update the total amount and quantity
        state.totalAmount += newItem.price * newItem.quantity
        state.totalQuantity += newItem.quantity
      }
    },
    increaseItemQuantity(state, action: PayloadAction<string>) {
      const itemId = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === itemId
      )

      if (existingItemIndex >= 0) {
        const item = state.items[existingItemIndex]
        item.quantity += 1
        state.totalAmount += item.price
        state.totalQuantity += 1
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const itemId = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === itemId
      )

      if (existingItemIndex >= 0) {
        const item = state.items[existingItemIndex]
        item.quantity -= 1
        state.totalAmount -= item.price
        state.totalQuantity -= 1
        if (item.quantity < 1) {
          state.items.splice(existingItemIndex, 1)
        }
      }
    },
  },
})

// Export actions
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  updateItemQuantity,
} = cartSlice.actions

// Export the reducer
export default cartSlice.reducer
