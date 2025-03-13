import Product from "../models/Product.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer configuration for storing images in "uploads" folder
const storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
     cb(null, Date.now() + path.extname(file.originalname))
 }
});
// Add file type validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 10*1024*1024 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{name:"img1", maxCount:1},{name:"img2", maxCount:1},{name:"img3", maxCount:1},{name:"img4", maxCount:1}]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png)');
  }
}

// Create a new Product (upload image of product and save product info in DB)
export const createProduct = async (req, res, next) => {
 await upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
     }
    if (!req.files) {
       return res.status(400).json({ error: 'Please send file' });
     }
     const imageName1 = req.files.img1[0].filename;
     const oldPath1 = req.files.img1[0].path;
     let newPath1 = path.join('client', 'src', 'assets', 'images', imageName1);

     const imageName2 = req.files.img2[0].filename;
     const oldPath2 = req.files.img2[0].path;
     let newPath2 = path.join('client', 'src', 'assets', 'images', imageName2);

     const imageName3 = req.files.img3[0].filename;
     const oldPath3 = req.files.img3[0].path;
     let newPath3 = path.join('client', 'src', 'assets', 'images', imageName3);

     const imageName4 = req.files.img4[0].filename;
     const oldPath4 = req.files.img4[0].path;
     let newPath4 = path.join('client', 'src', 'assets', 'images', imageName4);

    //Create the assets/images folder if it doesn't exist
    const dir = path.join('client', 'src', 'assets', 'images');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
     // Move image file to assets/images
    fs.rename(oldPath1, newPath1, (err) => {
      if (err) throw err;
    });
    fs.rename(oldPath2, newPath2, (err) => {
      if (err) throw err;
    });
    fs.rename(oldPath3, newPath3, (err) => {
      if (err) throw err;
    });
    fs.rename(oldPath4, newPath4, (err) => {
      if (err) throw err;
    });

    newPath1 = "images/" + imageName1;
    newPath2 = "images/" + imageName2;
    newPath3 = "images/" + imageName3;
    newPath4 = "images/" + imageName4;

     // save to db
     const newProduct = new Product({
      name: req.body.name,
      price: Number(req.body.price),
      keywords: req.body.keywords,
      type: req.body.type,
      category: req.body.category,
      desc: req.body.description,
      available: req.body.units,
      photos:[newPath1,newPath2,newPath3,newPath4]
    });
    
try{
   const savedProduct = newProduct.save();
    res.status(200).json({
        message: 'File uploaded successfully.',
        savedProduct
    }); 
  }
 catch (err) {
    console.err('Error during file upload:', err);
    next(err);
}
 });
}
// GET ALL PRODUCT
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        // const products = await Product.find({}); if that dont work try this
        res.status(200).json(products);
      } catch (err) {
        next(err);
      }
}
// FIND AND GET A PRODUCT BY ID
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch (err) {
        next(err);
      }}
// UPDATE
export const updateProduct = async (req, res, next) => {
  await upload(req, res, async(err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
       }
       if (!req.files.img1 || !req.files.img2 || !req.files.img3 || !req.files.img4) {
        return res.status(400).json({ error: 'Please send all required files' });
      }
       const imageName1 = req.files.img1[0].filename;
       const oldPath1 = req.files.img1[0].path;
       let newPath1 = path.join('client', 'src', 'assets', 'images', imageName1);
  
       const imageName2 = req.files.img2[0].filename;
       const oldPath2 = req.files.img2[0].path;
       let newPath2 = path.join('client', 'src', 'assets', 'images', imageName2);
  
       const imageName3 = req.files.img3[0].filename;
       const oldPath3 = req.files.img3[0].path;
       let newPath3 = path.join('client', 'src', 'assets', 'images', imageName3);
  
       const imageName4 = req.files.img4[0].filename;
       const oldPath4 = req.files.img4[0].path;
       let newPath4 = path.join('client', 'src', 'assets', 'images', imageName4);
  
      //Create the assets/images folder if it doesn't exist
      const dir = path.join('client', 'src', 'assets', 'images');
  
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
      }
       // Move image file to assets/images
      fs.rename(oldPath1, newPath1, (err) => {
        if (err) throw err;
      });
      fs.rename(oldPath2, newPath2, (err) => {
        if (err) throw err;
      });
      fs.rename(oldPath3, newPath3, (err) => {
        if (err) throw err;
      });
      fs.rename(oldPath4, newPath4, (err) => {
        if (err) throw err;
      });
  
      newPath1 = "images/" + imageName1;
      newPath2 = "images/" + imageName2;
      newPath3 = "images/" + imageName3;
      newPath4 = "images/" + imageName4;

      const photos = [newPath1, newPath2, newPath3, newPath4];
      let { name, type, category, keyword, price, units, description} = req.body;
       const keywords = keyword.split(" ");
       const available = units;
       price = Number(price);
    try {
      console.log(req.body);
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
         { $set: {name:name, type:type, category:category, keywords:keywords, 
           price:price, avaialble:available, photos:photos, description:description}},
          // {$set: {name:"product name"}},
          { new: true }
        );
        if (!updatedProduct) { console.log("an error occurred id not found"); }
        res.status(200).json("Product Modified Successfully");
      } catch (err) { 
        next(err);
      }
  });
}
// DELETE
export const deleteproduct = async (req, res, next) => {
    try {
       const deletedproduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(`item: ${deletedproduct.name} has been deleted`)
        // res.json("the following product have been delete")
    } catch (err) {
        next(err);
  }
}