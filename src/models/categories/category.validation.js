const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  parent: Joi.string().hex().length(24), // MongoDB ObjectId
  image: Joi.string().uri(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50),
  parent: Joi.string().hex().length(24),
  image: Joi.string().uri(),
  isActive: Joi.boolean(),
});

module.exports = { createCategorySchema, updateCategorySchema };
