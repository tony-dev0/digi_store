import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 1,
    default: "null",
  },
  lastname: {
    type: String,
    minlength: 1,
    default: "null",
  },
  username: {
    type: String,
    minlength: 1,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  phone: {
    type: String,
    default: "null",
  },
  phone_alt: {
    type: String,
    default: "null",
  },
  city: {
    type: String,
    default: "null",
  },
  region: {
    type: String,
    default: "null",
  },
  delivery_address: {
    type: String,
    default: "null",
  },
  other_info: {
    type: String,
    default: "null",
  },
  saved_items: {
    type: String,
    default: "null",
  },
  createdAt: {
    type: String,
    required: "true",
  },
});

export default mongoose.model("User", UserSchema);
