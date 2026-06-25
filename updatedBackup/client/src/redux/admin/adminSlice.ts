import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: adminState = {
  users: [],
  products: [],
  recieved_notifications: [],
  sent_notifications: [],
  orders: [],
  productLoading: true,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // user reducers
    storeUsers: (state, action) => {
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload)
    },
    updateUser: (state, action: PayloadAction<userStateType>) => {
      state.users = state.users.map((row) =>
        row._id === action.payload._id ? action.payload : row
      )
    },
    // product reducers
    storeProducts: (state, action) => {
      state.products = action.payload
      state.productLoading = false
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      )
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((row) =>
        row._id === action.payload._id ? action.payload : row
      )
    },
    setproductLoader: (state, action) => {
      state.productLoading = action.payload
    },
    // order reducers
    storeOrders: (state, action) => {
      state.orders = action.payload
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      )
    },
    closeOrder: (state, action) => {
      state.orders.map((order) =>
        order._id === action.payload ? order.status == 'closed' : ''
      )
    },
    // notification reducers
    storeRecievedNotification: (state, action) => {
      state.recieved_notifications = action.payload
    },
    deleteRecievedNotification: (state, action: PayloadAction<string>) => {
      state.recieved_notifications = state.recieved_notifications.filter(
        (notification) => notification._id !== action.payload
      )
    },
    storeSentNotification: (state, action) => {
      state.sent_notifications = action.payload
    },
    addSentNotification: (state, action) => {
      state.sent_notifications.push(action.payload)
    },
    deleteSentNotification: (state, action: PayloadAction<string>) => {
      state.sent_notifications = state.sent_notifications.filter(
        (notification) => notification._id !== action.payload
      )
    },
    removeRecipient: (state, action: PayloadAction<recipient>) => {
      const email = action.payload.email
      const id = action.payload.id
      const notificationIndex = state.sent_notifications.findIndex(
        (item) => item._id === id
      )
      if (notificationIndex >= 0) {
        state.sent_notifications[notificationIndex].recipients =
          state.sent_notifications[notificationIndex].recipients.filter(
            (recipient) => recipient !== email
          )
      }
    },
  },
})

export const {
  storeUsers,
  addUser,
  deleteUser,
  updateUser,
  storeProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  setproductLoader,
  storeOrders,
  deleteOrder,
  closeOrder,
  storeRecievedNotification,
  deleteRecievedNotification,
  storeSentNotification,
  addSentNotification,
  deleteSentNotification,
  removeRecipient,
} = adminSlice.actions

export default adminSlice.reducer
