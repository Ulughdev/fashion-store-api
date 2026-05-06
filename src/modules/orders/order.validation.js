const Joi = require("joi");

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        size: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL").required(),
        color: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      }),
    )
    .min(1)
    .required(),

  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string(),
  }).required(),

  notes: Joi.string().max(500),
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered", "cancelled")
    .required(),
});

module.exports = { createOrderSchema, updateStatusSchema };
