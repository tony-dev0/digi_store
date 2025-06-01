import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  keywords: {
    type: [String],
  },
  price: {
    type: Number,
  },
  prevprice: {
    type: Number,
  },
  available: {
    type: String,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
  },
  imageurl: {
    type: String,
  },
});

export default mongoose.model("Product", ProductSchema);
