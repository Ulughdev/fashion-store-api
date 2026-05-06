const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
const AppError = require("../../utils/AppError");

const createOrder = async (userId, { items, shippingAddress, notes }) => {
  // 1. Productlarni tekshirish
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product)
      throw new AppError(`Product not found: ${item.productId}`, 404);
    if (!product.isActive)
      throw new AppError(`Product not available: ${product.name}`, 400);

    // Size mavjudmi?
    const sizeObj = product.sizes.find((s) => s.size === item.size);
    if (!sizeObj) throw new AppError(`Size ${item.size} not found`, 400);
    if (sizeObj.stock < item.quantity)
      throw new AppError(`Not enough stock for ${product.name}`, 400);

    // Color mavjudmi?
    const colorObj = product.colors.find((c) => c.name === item.color);
    if (!colorObj) throw new AppError(`Color ${item.color} not found`, 400);

    const price = product.discountPrice || product.price;
    subtotal += price * item.quantity;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      image: colorObj.images?.[0] || null,
    });

    // Stockni kamaytirish
    sizeObj.stock -= item.quantity;
    await product.save();
  }

  // 2. Order yaratish
  const shippingCost = subtotal > 100 ? 0 : 10;
  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingCost,
    total: +(subtotal + shippingCost).toFixed(2),
    notes,
  });

  return order;
};

const getMyOrders = async (userId) => {
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("items.product", "name images");
  return orders;
};

const getOrderById = async (orderId, userId, role) => {
  const order = await Order.findById(orderId)
    .populate("items.product", "name images")
    .populate("user", "name email");

  if (!order) throw new AppError("Order not found", 404);

  // Admin har qanday orderni ko'ra oladi, customer faqat o'znikini
  if (role !== "admin" && order.user._id.toString() !== userId.toString()) {
    throw new AppError("Access denied", 403);
  }

  return order;
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );
  if (!order) throw new AppError("Order not found", 404);
  return order;
};

const cancelOrder = async (orderId, userId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order not found", 404);

  if (order.user.toString() !== userId.toString()) {
    throw new AppError("Access denied", 403);
  }

  if (["shipped", "delivered"].includes(order.status)) {
    throw new AppError("Cannot cancel shipped or delivered order", 400);
  }

  // Stockni qaytarish
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      const sizeObj = product.sizes.find((s) => s.size === item.size);
      if (sizeObj) sizeObj.stock += item.quantity;
      await product.save();
    }
  }

  order.status = "cancelled";
  await order.save();

  return order;
};

// Admin uchun barcha orderlar
const getAllOrders = async (query) => {
  const { status, page = 1, limit = 10 } = query;
  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("user", "name email"),
    Order.countDocuments(filter),
  ]);

  return {
    orders,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
};
