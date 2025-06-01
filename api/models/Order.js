import mongoose from "mongoose";
import OrderProduct from "./OrderProductField.js";

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  total_order: {
    type: Number,
  },
  total_price: {
    type: Number,
  },
  products: {
    type: [OrderProduct.schema],
  },
  status: {
    type: String,
  },
});

export default mongoose.model("Order", OrderSchema, "orders");
