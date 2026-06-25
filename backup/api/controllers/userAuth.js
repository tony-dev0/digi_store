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

// --- Validation helpers ---
const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateRegisterInput = (body) => {
  const errors = [];
  const username = body.username && String(body.username).trim();
  const email = body.email && String(body.email).trim();
  const password = body.password && String(body.password);
  const phone = body.phone && String(body.phone).trim();

  if (!username || username.length < 3) {
    errors.push("username must be at least 3 characters");
  }
  if (!email || !isValidEmail(email)) {
    errors.push("invalid email address");
  }
  if (!password || password.length < 6) {
    errors.push("password must be at least 6 characters");
  }
  if (phone && !/^\+?\d{7,15}$/.test(phone)) {
    errors.push("invalid phone number");
  }
  return errors ? errors[0] : null;
};

const validateLoginInput = (body) => {
  const errors = [];
  const email = body.email && String(body.email).trim();
  const password = body.password && String(body.password);
  if (!email || !isValidEmail(email)) errors.push("invalid email address");
  if (!password) errors.push("password is required");
  return errors ? errors[0] : null;
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
    if (!user)
      return res.status(401).json({ login: false, message: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(
      String(req.body.password),
      user.password,
    );
    if (!isPasswordCorrect)
      return res.status(401).json({
        login: false,
        message: "username or password is incorrect",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "3m",
    });

    const { password, ...otherDetails } = user._doc;
    // cookie expires in 5 mins
    res
      .cookie("_actok", token, {
        maxAge: 3 * 60 * 1000,
        httpOnly: true,
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
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "7d",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("_actok", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } else {
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
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
        expiresIn: "7d",
      });
      const { password, ...rest } = newUser._doc;
      res
        .cookie("_actok", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json(rest);
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

export const verifyToken = (req, res, next) => {
  const token = req.cookies._actok;
  if (!token)
    return res
      .status(401)
      .json({ verified: false, message: "TokenExpiredError" });

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)
      return res
        .status(401)
        .json({ verified: false, message: "TokenNotValid" });
    req.userId = user.id;
    next();
  });
};

export const authorize = (roles) => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.userId });
    if (!user || !roles.includes(user?.role)) {
      return res.status(403).json({ message: "You don't have the permission" });
    }
    next();
  };
};
