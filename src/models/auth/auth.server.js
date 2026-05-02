const User = require("../../models/user.model");
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES },
  );
  return { accessToken, refreshToken };
};

const register = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new AppError("Email already exists", 400);

  const user = await User.create({ name, email, password });
  const tokens = generateTokens(user._id);

  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid credentials", 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError("Invalid credentials", 401);

  const tokens = generateTokens(user._id);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};

const refresh = async (token) => {
  if (!token) throw new AppError("No refresh token", 401);

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 401);
  }

  const tokens = generateTokens(user._id);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

module.exports = { register, login, refresh, logout };
