import mongoose from "mongoose";

const OrderProductSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  photo: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

export default mongoose.model("OrderProduct", OrderProductSchema);
