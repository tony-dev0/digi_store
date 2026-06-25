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
const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE = 3 * 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
};

const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT, {
    expiresIn: process.env.ACCESS_EXPIRES || "15m",
  });

const signRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT, {
    expiresIn: process.env.REFRESH_EXPIRES || "3d",
  });

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("_actok", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  res.cookie("_rftok", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie("_actok", COOKIE_OPTIONS);
  res.clearCookie("_rftok", COOKIE_OPTIONS);
};

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
  const validationError = validateRegisterInput(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
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
      return res.status(200).json(result[0]._id);
    } else {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  const validationError = validateLoginInput(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
  try {
    const email = String(req.body.email).trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });

    const isPasswordCorrect = await bcrypt.compare(
      String(req.body.password),
      user.password,
    );
    if (!isPasswordCorrect)
      return res.status(400).json({
        message: "email or password is incorrect",
      });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

    user.refreshTokens = [hashedRefreshToken];
    await user.save();

    const { password, ...otherDetails } = user._doc;

    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({ login: true, details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const email = String(req.body.email).trim().toLowerCase();
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = signAccessToken(user._id);
      const refreshToken = signRefreshToken(user._id);
      const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

      user.refreshTokens = [hashedRefreshToken];
      await user.save();

      const { password: pass, ...rest } = user._doc;
      setAuthCookies(res, accessToken, refreshToken);
      res.status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-9) +
        Math.random().toString(36).slice(-9);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        createdAt: formatedDate,
      });
      await newUser.save();
      const accessToken = signAccessToken(newUser._id);
      const refreshToken = signRefreshToken(newUser._id);
      const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

      newUser.refreshTokens = [hashedRefreshToken];
      await newUser.save();

      const { password, ...rest } = newUser._doc;
      setAuthCookies(res, accessToken, refreshToken);
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies._rftok;
    // if token is not present in the cookie, return 401
    if (!refreshTokenCookie) {
      return res
        .status(401)
        .json({ verified: false, message: "TokenNotValid" });
    }

    const decoded = jwt.verify(refreshTokenCookie, process.env.JWT);
    const user = await User.findById(decoded.id);

    // if user is not found i.e token is invalid, clear cookies and return 401
    if (!user) {
      clearAuthCookies(res);
      return res
        .status(401)
        .json({ verified: false, message: "TokenNotValid" });
    }

    const hasValidRefreshToken = await Promise.all(
      (user.refreshTokens || []).map((storedToken) =>
        bcrypt.compare(refreshTokenCookie, storedToken),
      ),
    ).then((results) => results.some(Boolean));
    // the bcrypt.compare() function returns a promise, so we use Promise.all()
    //  to wait for all comparisons to complete and
    // then check if any of them returned true using results.some(Boolean).
    if (!hasValidRefreshToken) {
      user.refreshTokens = [];
      await user.save();
      clearAuthCookies(res);
      return res
        .status(401)
        .json({ verified: false, message: "TokenNotValid" });
    }
    // if the refresh token is valid, generate new access and refresh tokens
    const accessToken = signAccessToken(user._id);
    const newRefreshToken = signRefreshToken(user._id);
    const hashedRefreshToken = bcrypt.hashSync(newRefreshToken, 10);

    user.refreshTokens = [hashedRefreshToken];
    await user.save();

    setAuthCookies(res, accessToken, newRefreshToken);
    return res.status(200).json({ verified: true, message: "Token refreshed" });
  } catch (error) {
    if (error.name === "TokenNotValid") {
      clearAuthCookies(res);
      return res
        .status(401)
        .json({ verified: false, message: "TokenNotValid" });
    }
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies._rftok;

    if (refreshTokenCookie) {
      try {
        const decoded = jwt.verify(refreshTokenCookie, process.env.JWT);
        const user = await User.findById(decoded.id);
        if (user) {
          user.refreshTokens = [];
          await user.save();
        }
      } catch (error) {
        // ignore invalid refresh token on logout
      }
    }

    clearAuthCookies(res);
    res.status(200).json("You have been logged out");
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies._actok;
  if (!token)
    return res.status(401).json({ verified: false, message: "TokenNotValid" });

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ verified: false, message: "TokenNotValid" });
    }
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
