const Joi = require('joi')

class UpdateProductRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu cập nhật sản phẩm.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.name = data.name // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.image = data.image
    this.description = data.description
    this.brand_id = data.brand_id
    this.category_id = data.category_id
    this.attributes = data.attributes
    this.is_visible = data.is_visible
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ optional() có nghĩa là trường đó không bắt buộc phải có trong dữ liệu gửi lên.
      // ➡ allow("") cho phép trường đó có giá trị là chuỗi rỗng.
      // ➡ integer() yêu cầu giá trị phải là số nguyên.
      // ➡ string() yêu cầu giá trị phải là một chuỗi.
      // ➡ number() yêu cầu giá trị phải là một số.
      // ➡ array() yêu cầu giá trị phải là một mảng.
      // ➡ items() yêu cầu xác định kiểu và điều kiện của một phần tử mảng.
      // ➡ object() yêu cầu giá trị phải là một đối tượng.
      // ➡ boolean() yêu cầu giá trị phải là một giá trị boolean (true/false).
      name: Joi.string().optional(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      image: Joi.string().allow('').optional(),
      description: Joi.string().optional(),
      brand_id: Joi.number().integer().optional(),
      category_id: Joi.number().integer().optional(),
      attributes: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required(),
          }),
        )
        .optional(),
      is_visible: Joi.boolean().optional(),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = UpdateProductRequest
