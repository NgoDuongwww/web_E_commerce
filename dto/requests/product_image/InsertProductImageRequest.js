const Joi = require("joi");

class insertProductImageRequest {
  constructor(data) {
    this.image_url = data.image_url;
    this.product_id = data.product_id;
  }

  static validate(data) {
    const schema = Joi.object({
      image_url: Joi.string().required(),
      product_id: Joi.number().integer().required(),
    });

    return schema.validate(data);
  }
}

module.exports = insertProductImageRequest;
