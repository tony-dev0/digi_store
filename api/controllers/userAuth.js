import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const date = Date.now();
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
const formatedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

//find user by email
export const findemail = async (req, res, next) => {
  const newUser = new User(req.body);
  const finduser = await User.findOne({ email: newUser.email });
  if (finduser == "") {
    res.json("user not found");
  } else {
    res.json(finduser);
  }
  next();
};

// Register
export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(String(req.body.password), salt);

  const newUser = new User({
    username: String(req.body.username),
    phone: String(req.body.phone),
    email: String(req.body.email),
    password: hash,
    createdAt: formatedDate,
  });

  const finduser = await User.findOne({ email: newUser.email });
  try {
    if (!finduser) {
      const result = await User.insertMany([newUser]);
      return res.json(result[0]._id);
    } else {
      throw new Error("Email already exist");
    }
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ login: false, msg: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(
      String(req.body.password),
      user.password
    );
    if (!isPasswordCorrect)
      return res.json({
        login: false,
        msg: "username or password is incorrect",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("_actok", token, {
        //   maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true, //use secure: true before hosting (https)
      })
      .status(200)
      .json({ login: true, details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("user found");
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password: pass, ...rest } = user._doc;
      res.cookie("_actok", token, { httpOnly: true }).status(200).json(rest);
    } else {
      console.log("tryng to generate password for user");
      const generatedPassword =
        Math.random().toString(36).slice(-9) +
        Math.random().toString(36).slice(-9);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        createdAt: formatedDate,
      });
      console.log("user almost saved");
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT);
      const { password, ...rest } = newUser._doc;
      res.cookie("_actok", token, { httpOnly: true }).status(200).json(rest);
      console.log("completed operatiion");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  //   res.cookie('_actok', '', { maxAge: 1});
  // res.setHeader('set-cookie','_actok=; max-age=1');
  try {
    res.clearCookie("_actok");
    res.status(200).json("You have been logged out");
  } catch (error) {
    next(error);
  }
};
export const verifyuser = (req, res, next) => {
  const token = req.cookies._actok;
  if (!token) {
    return res.json({ valid: false });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.json({ valid: false });
    // res.json({valid: true, user: user}); // dont use this check old template for verifyUser

    // if (user.id === req.params.id) { res.json({valid: true, user: user.name}); }
    // else { res.json({valid: true, user: "theodore"}); }
    next();
  });
};

//   export const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//       if (req.user.id === req.params.id) {
//         next();
//       } else {
//         return next(createError(403, "You are not authorized!"));
//       }
//     });
//   };
// admin
