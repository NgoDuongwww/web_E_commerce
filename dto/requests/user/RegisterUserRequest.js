const Joi = require("joi");
const { UserRole } = require("../../../constants");

class RegisterUserRequest {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.avatar = data.avatar;
    this.phone = data.phone;
  }

  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      password: Joi.string().allow("").min(6).optional(),
      name: Joi.string().required(),
      avatar: Joi.string().uri().allow("").optional(),
      phone: Joi.string().optional(),
    });

    return schema.validate(data);
  }
}

module.exports = RegisterUserRequest;
