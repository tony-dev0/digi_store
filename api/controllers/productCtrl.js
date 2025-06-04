import Product from "../models/Product.js";
import cloudinary from "../index.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer configuration for storing images in "uploads" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Add file type validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
  { name: "img4", maxCount: 1 },
]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, png, webp)");
  }
}

// Create a new Product (upload image of product and save product info in DB)
export const createProduct = async (req, res, next) => {
  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    if (!req.files) {
      return res.status(400).json({ error: "Please send file" });
    }
    let imagePath1 = path.join("uploads", req.files.img1[0].filename);
    let imagePath2 = path.join("uploads", req.files.img2[0].filename);
    let imagePath3 = path.join("uploads", req.files.img3[0].filename);
    let imagePath4 = path.join("uploads", req.files.img4[0].filename);

    try {
      // Upload all images to Cloudinary
      const uploadToCloudinary = (imgPath) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(imgPath, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.secure_url);
            }
          });
        });
      };

      const photoUrls = await Promise.all([
        uploadToCloudinary(imagePath1),
        uploadToCloudinary(imagePath2),
        uploadToCloudinary(imagePath3),
        uploadToCloudinary(imagePath4),
      ]);

      const newProduct = new Product({
        name: req.body.name,
        price: Number(req.body.price),
        prevprice: Number(req.body.price) + 210,
        keywords: req.body.keywords,
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        available: req.body.units,
        photos: photoUrls,
        imageUrl: photoUrls[0],
      });
      const savedProduct = await newProduct.save();
      return res.status(200).json(savedProduct);
    } catch (err) {
      console.log("Error during file upload:", err);
      next(err);
    }
  });
};

// GET ALL PRODUCT
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
// FIND AND GET A PRODUCT BY ID
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
// UPDATE
export const updateProduct = async (req, res, next) => {
  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    if (
      !req.files.img1 ||
      !req.files.img2 ||
      !req.files.img3 ||
      !req.files.img4
    ) {
      return res.status(400).json({ error: "Please send all required files" });
    }
    let imagePath1 = path.join("uploads", req.files.img1[0].filename);
    let imagePath2 = path.join("uploads", req.files.img2[0].filename);
    let imagePath3 = path.join("uploads", req.files.img3[0].filename);
    let imagePath4 = path.join("uploads", req.files.img4[0].filename);

    try {
      // Upload all images to Cloudinary
      const uploadToCloudinary = (imgPath) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(imgPath, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.secure_url);
            }
          });
        });
      };

      const photoUrls = await Promise.all([
        uploadToCloudinary(imagePath1),
        uploadToCloudinary(imagePath2),
        uploadToCloudinary(imagePath3),
        uploadToCloudinary(imagePath4),
      ]);

      const { id } = req.params;
      let { name, type, category, keyword, price, units, description } =
        req.body;
      const keywords = keyword.split(" ");
      const available = units;
      price = Number(price);
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            _id: id,
            name: name,
            type: type,
            category: category,
            keywords: keywords,
            price: price,
            available: available,
            photos: photoUrls,
            description: description,
            imageurl: photoUrls[0],
          },
        },
        { new: true }
      );
      if (!updatedProduct) {
        console.log(
          "an error occurred item not updated likely the id not found"
        );
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  });
};

// DELETE
export const deleteproduct = async (req, res, next) => {
  try {
    const deletedproduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedproduct._id);
    // res.json("the following product have been delete")
  } catch (err) {
    next(err);
  }
};
