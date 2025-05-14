const Joi = require("joi");

class insertProductRequest {
  constructor(data) {
    this.name = data.name;
    this.price = data.price;
    this.oldprice = data.oldprice;
    this.image = data.image;
    this.description = data.description;
    this.specification = data.specification;
    this.buyturn = data.buyturn;
    this.quantity = data.quantity;
    this.category_id = data.category_id;
    this.brand_id = data.brand_id;
    this.attributes = data.attributes;
    this.variants = data.variants;
    this.variant_values = data.variant_values;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      oldprice: Joi.number().positive(),
      image: Joi.string().allow(""),
      description: Joi.string().optional(),
      specification: Joi.string().required(),
      buyturn: Joi.number().integer().min(0),
      quantity: Joi.number().integer().min(0),
      category_id: Joi.number().integer().required(),
      brand_id: Joi.number().integer().required(),
      attributes: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required(),
          })
        )
        .optional(),
      variants: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            values: Joi.array().items(Joi.string().required()).required(),
          })
        )
        .optional(),
      variant_values: Joi.array()
        .items(
          Joi.object({
            variant_combination: Joi.array()
              .items(Joi.string().required())
              .required(),
            price: Joi.number().positive().required(),
            old_price: Joi.number().positive().optional(),
            stock: Joi.number().integer().min(0).default(0),
            sku: Joi.string().allow(""),
          })
        )
        .optional(),
    });

    return schema.validate(data);
  }
}

module.exports = insertProductRequest;
