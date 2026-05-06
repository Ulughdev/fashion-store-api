const Joi = require("joi");

const updateMeSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});

module.exports = { updateMeSchema, changePasswordSchema };
