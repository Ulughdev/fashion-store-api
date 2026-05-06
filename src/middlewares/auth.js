// const jwt = require("jsonwebtoken");
// const AppError = require("../utils/AppError");

// // const authenticate = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     return next(new AppError("Unauthorized", 401));
// //   }

// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     return next(new AppError("Invalid token", 401));
// //   }
// // };

// // module.exports = authenticate;
// // src/middlewares/auth.js — o'zgartirish
// const User = require("../models/user.model");

// const authenticate = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return next(new AppError("Unauthorized", 401));
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select(
//       "-password -refreshToken",
//     );
//     if (!user) return next(new AppError("User not found", 401));
//     req.user = user;
//     next();
//   } catch (err) {
//     return next(new AppError("Invalid token", 401));
//   }
// };
// // Fayl oxirida bu yo'q ❌
// module.exports = authenticate;

const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken",
    );
    if (!user) return next(new AppError("User not found", 401));
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError("Invalid token", 401));
  }
};

module.exports = authenticate;
