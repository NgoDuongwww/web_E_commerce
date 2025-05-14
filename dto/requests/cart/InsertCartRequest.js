const Joi = require("joi");

class InsertCartRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.session_id = data.session_id;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().optional(),
      session_id: Joi.string().optional(),
    }).xor("user_id", "session_id");

    return schema.validate(data);
  }
}

module.exports = InsertCartRequest;
