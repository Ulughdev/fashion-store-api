const Product = require("../../models/product.model");
const AppError = require("../../utils/AppError");

const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

const getProducts = async (query) => {
  const {
    gender,
    size,
    color,
    season,
    brand,
    category,
    minPrice,
    maxPrice,
    search,
    sort,
    page = 1,
    limit = 10,
    featured,
  } = query;

  const filter = { isActive: true };

  if (gender) filter.gender = gender;
  if (season) filter.season = season;
  if (brand) filter.brand = new RegExp(brand, "i");
  if (category) filter.category = category;
  if (featured) filter.isFeatured = true;
  if (size) filter["sizes.size"] = size;
  if (color) filter["colors.name"] = new RegExp(color, "i");

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const sortOptions = {
    newest: { createdAt: -1 },
    "price-low": { price: 1 },
    "price-high": { price: -1 },
    rating: { avgRating: -1 },
  };

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortOptions[sort] || { createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name slug"),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id).populate("category", "name slug");
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

const addReview = async (productId, userId, { rating, comment }) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  const alreadyReviewed = product.ratings.find(
    (r) => r.user.toString() === userId.toString(),
  );
  if (alreadyReviewed) throw new AppError("Already reviewed", 400);

  product.ratings.push({ user: userId, rating, comment });
  product.calculateAvgRating();
  await product.save();

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
};
