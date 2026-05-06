const User = require("../../models/user.model");
const AppError = require("../../utils/AppError");

const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const updateMe = async (userId, { name, email }) => {
  // Email o'zgartirilayotgan bo'lsa, boshqa user ishlatayotganini tekshirish
  if (email) {
    const exists = await User.findOne({ email, _id: { $ne: userId } });
    if (exists) throw new AppError("Email already in use", 400);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true },
  ).select("-password -refreshToken");

  if (!user) throw new AppError("User not found", 404);
  return user;
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new AppError("Current password is incorrect", 400);

  user.password = newPassword;
  await user.save();
};

// Admin uchun
const getAllUsers = async (query) => {
  const { page = 1, limit = 10, role } = query;
  const filter = {};
  if (role) filter.role = role;

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  return {
    users,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new AppError("User not found", 404);
};

module.exports = {
  getMe,
  updateMe,
  changePassword,
  getAllUsers,
  deleteUser,
};
