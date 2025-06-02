import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import productRoute from "./routes/products.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import overviewRoute from "./routes/overview.js";
import notificationRoute from "./routes/notifications.js";
import mailRoute from "./routes/mail.js";
import orderRoute from "./routes/order.js";
import cors from "cors";

const app = express();
dotenv.config();

// cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
// });

// export const updateProduct = async (req, res, next) => {
//   const { name, price, units } = req.body;
//   try {
//     console.log(req.body);
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: { name: name, price: price, unit: units } },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     next(err);
//   }
//};

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.any());
//app.use(express.urlencoded({ extended: false}));
//app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/overview", overviewRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/mail", mailRoute);
app.use("/api/orders", orderRoute);
const uri = process.env.MONGO;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongoDB");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB Disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.listen(8000, () => {
  connect();
  console.log("listening");
});

export default cloudinary;
