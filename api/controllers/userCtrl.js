import User from "../models/User.js";

// get all users
export const getUsers = async (req, res, next) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
  }
}

// update a user
export const updateUser = async (req, res, next) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
      // reomve the const updatedUser edit this to return true
      //  so that you can confirm before dispatching an event in client side
    } catch (err) { 
      next(err);
    }}
// delete a user
export const deleteUser = async (req, res, next) => {
    try {
       const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(`User: ${deletedUser.name} has been deleted`);
        //reomve the const deletedUser edit this to return true 
        // so that you can confirm before dispatching an event in client side
    } catch (err) {
        next(err);
    }
    }
// delete multiple user (later)

//get all products
