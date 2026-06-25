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

// --- Token helpers ---
const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || "3m"; // short-lived
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || "5m"; // long-lived
const ACCESS_SECRET = process.env.JWT || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN || `${ACCESS_SECRET}-refresh`;

const signAccessToken = (id) =>
  jwt.sign({ id }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
const signRefreshToken = (id) =>
  jwt.sign({ id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

const storeHashedRefreshToken = async (user, token) => {
  const hash = await bcrypt.hash(token, 10);
  user.refreshTokens = user.refreshTokens || [];
  user.refreshTokens.push(hash);
  await user.save();
};

const removeMatchingRefreshToken = async (user, token) => {
  if (!user || !user.refreshTokens || !token) return false;
  for (let i = 0; i < user.refreshTokens.length; i++) {
    const hashed = user.refreshTokens[i];
    const match = await bcrypt.compare(token, hashed);
    if (match) {
      user.refreshTokens.splice(i, 1);
      await user.save();
      return true;
    }
  }
  return false;
};

const rotateRefreshToken = async (user, oldToken) => {
  for (let i = 0; i < user.refreshTokens.length; i++) {
    const hashed = user.refreshTokens[i];
    const match = await bcrypt.compare(oldToken, hashed);
    if (match) {
      const newToken = signRefreshToken(user._id.toString());
      const newHash = await bcrypt.hash(newToken, 10);
      user.refreshTokens[i] = newHash;
      await user.save();
      return newToken;
    }
  }
  return null;
};

// Register
export const register = async (req, res, next) => {
  try {
    const error = validateRegisterInput(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(String(req.body.password), salt);

    const newUser = new User({
      username: String(req.body.username).trim(),
      phone: req.body.phone ? String(req.body.phone).trim() : undefined,
      email: String(req.body.email).trim(),
      password: hash,
      createdAt: formatedDate,
    });

    const finduser = await User.findOne({ email: newUser.email });
    if (!finduser) {
      const result = await User.insertMany([newUser]);
      return res.status(201).json({ success: true, id: result[0]._id });
    } else {
      return res
        .status(409)
        .json({ success: false, message: "email already exists" });
    }
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const error = validateLoginInput(req.body);
    if (error) return res.status(400).json({ login: false, message: error });

    const user = await User.findOne({ email: String(req.body.email).trim() });
    if (!user)
      return res
        .status(401)
        .json({ login: false, message: "username or password is incorrect" });

    const isPasswordCorrect = await bcrypt.compare(
      String(req.body.password),
      user.password,
    );
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ login: false, message: "username or password is incorrect" });

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());

    await storeHashedRefreshToken(user, refreshToken);

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("_actok", accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("_rt", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
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
      const accessToken = signAccessToken(user._id.toString());
      const refreshToken = signRefreshToken(user._id.toString());
      await storeHashedRefreshToken(user, refreshToken);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("_actok", accessToken, {
          maxAge: 15 * 60 * 1000,
          httpOnly: true,
        })
        .cookie("_rt", refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
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
      const accessToken = signAccessToken(newUser._id.toString());
      const refreshToken = signRefreshToken(newUser._id.toString());
      await storeHashedRefreshToken(newUser, refreshToken);
      const { password, ...rest } = newUser._doc;
      res
        .cookie("_actok", accessToken, {
          maxAge: 15 * 60 * 1000,
          httpOnly: true,
        })
        .cookie("_rt", refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
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
  try {
    const refreshToken = req.cookies?._rt;
    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (user) await removeMatchingRefreshToken(user, refreshToken);
      } catch (e) {
        // ignore invalid token
      }
    }
    res.clearCookie("_actok");
    res.clearCookie("_rt");
    res.status(200).json({ message: "You have been logged out" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?._rt;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let decoded;
    try {
      decoded = jwt.verify(token, REFRESH_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Refresh token expired" });
      }
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    // Ensure token exists in user's stored hashed tokens
    try {
      let matched = false;
      for (let i = 0; i < (user.refreshTokens || []).length; i++) {
        const hashed = user.refreshTokens[i];
        if (await bcrypt.compare(token, hashed)) {
          matched = true;
          break;
        }
      }

      if (!matched) {
        // possible reuse or theft - clear all refresh tokens for safety
        user.refreshTokens = [];
        await user.save();
        // treat as unauthorized / possible token theft
        res.clearCookie("_actok");
        res.clearCookie("_rt");
        return res.status(403).json({ message: "Refresh token reuse detected" });
      }
    } catch (err) {
      if (err && err.name === "TokenExpiredError") {
        // Attempt to decode to find user to revoke stored refresh tokens
        const decodedUnsafe = jwt.decode(token);
        try {
          if (decodedUnsafe && decodedUnsafe.id) {
            const u = await User.findById(decodedUnsafe.id);
            if (u) {
              u.refreshTokens = [];
              await u.save();
            }
          }
        } catch (saveErr) {
          console.error('Failed to clear stored refresh tokens after expiry:', saveErr);
        }
        // Clear cookies and force logout
        res.clearCookie("_actok");
        res.clearCookie("_rt");
        return res.status(401).json({ message: "Refresh token expired. Logged out." });
      } else {
        console.error('Error while verifying refresh token:', err);
        return res.status(400).json({ message: 'Invalid refresh token' });
      }
    }
                  }
                } catch (e) {
                  // ignore DB errors while handling expiry
                }
                // clear cookies so client is logged out
                res.clearCookie("_actok");
                res.clearCookie("_rt");
                return res.status(401).json({ message: "Refresh token expired - logged out" });
              }
              // invalid token
              res.clearCookie("_rt");
              return res.status(403).json({ message: "Invalid refresh token" });
    const newAccess = signAccessToken(user._id.toString());
    const newRefresh = await rotateRefreshToken(user, token);
    if (!newRefresh)
      return res
        .status(500)
        .json({ message: "Could not rotate refresh token" });

    res
      .cookie("_actok", newAccess, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("_rt", newRefresh, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true });
  } catch (err) {
              res.clearCookie("_actok");
              res.clearCookie("_rt");
              return res.status(403).json({ message: "Refresh token not recognized - logged out" });
  }
};

export const verifyToken = async (req, res, next) => {
            if (!newRefresh) {
              res.clearCookie("_actok");
              res.clearCookie("_rt");
              return res.status(500).json({ message: "Could not rotate refresh token" });
            }
  if (!token) return res.json({ verified: false, message: "No token found" });
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error && error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ verified: false, message: "Access token expired" });
    }
    return res
      .status(401)
      .json({ verified: false, message: "Invalid access token" });
  }
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
