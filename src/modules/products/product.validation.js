const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(1000),
  price: Joi.number().min(0).required(),
  discountPrice: Joi.number().min(0),
  brand: Joi.string().required(),
  gender: Joi.string().valid("men", "women", "unisex", "kids").required(),
  season: Joi.string()
    .valid("spring", "summer", "autumn", "winter", "all-season")
    .required(),
  sizes: Joi.array().items(
    Joi.object({
      size: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL").required(),
      stock: Joi.number().min(0),
    }),
  ),
  colors: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      hex: Joi.string().required(),
      images: Joi.array().items(Joi.string()),
      stock: Joi.number().min(0),
    }),
  ),
  material: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500),
});

module.exports = { createProductSchema, reviewSchema };
