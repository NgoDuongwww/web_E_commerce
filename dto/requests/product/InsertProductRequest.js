const Joi = require("joi");

class insertProductRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm sản phẩm.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.name = data.name; // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.image = data.image;
    this.description = data.description;
    this.brand_id = data.brand_id;
    this.category_id = data.category_id;
    this.attributes = data.attributes;
    this.variants = data.variants;
    this.variant_values = data.variant_values;
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ string() yêu cầu giá trị phải là một chuỗi.
      // ➡ number() yêu cầu giá trị phải là một số.
      // ➡ required() yêu cầu trường đó là bắt buộc phải có trong dữ liệu gửi lên.
      // ➡ positive() yêu cầu giá trị phải là số dương.
      // ➡ integer() yêu cầu giá trị phải là số nguyên.
      // ➡ min(0) yêu cầu giá trị phải lớn hơn hoặc bằng 0.
      // ➡ allow("") cho phép trường đó có giá trị là chuỗi rỗng.
      // ➡ optional() cho phép trường đó có giá trị (không bắt buộc).
      // ➡ array() yêu cầu giá trị phải là một mảng.
      // ➡ items() yêu cầu xác định kiểu và điều kiện của một phần tử mảng.
      // ➡ object() yêu cầu giá trị phải là một đối tượng.
      name: Joi.string().required(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      image: Joi.string().allow(""),
      description: Joi.string().optional(),
      brand_id: Joi.number().integer().required(),
      category_id: Joi.number().integer().required(),
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

    return schema.validate(data); // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = insertProductRequest;
