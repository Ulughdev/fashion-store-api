const Category = require("../../models/category.model");
const AppError = require("../../utils/AppError");

const createCategory = async (data) => {
  const exists = await Category.findOne({ name: data.name });
  if (exists) throw new AppError("Category already exists", 400);

  const category = await Category.create(data);
  return category;
};

const getCategories = async () => {
  const categories = await Category.find({ isActive: true }).populate(
    "parent",
    "name slug",
  );
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id).populate("parent", "name slug");
  if (!category) throw new AppError("Category not found", 404);
  return category;
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) throw new AppError("Category not found", 404);
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
  if (!category) throw new AppError("Category not found", 404);
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
