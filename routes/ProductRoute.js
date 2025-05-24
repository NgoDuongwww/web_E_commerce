module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const ProductController = require("../controllers/ProductController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const validateImageExists = require("../middlewares/validateImageExists.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const InsertProductRequest = require("../dto/requests/product/InsertProductRequest.js");
  const UpdateProductRequest = require("../dto/requests/product/UpdateProductRequest.js");

  router.get(
    "/admin/products", // ➡ tạo routes GET /products.
    asyncHandler(ProductController.getProductsByAdmin) // ➡ asyncHandler để tự động bắt lỗi trong getProductsByAdmin.
  );

  router.get(
    "/products", // ➡ tạo routes GET /products.
    asyncHandler(ProductController.getProductsByUser) // ➡ asyncHandler để tự động bắt lỗi trong getProductsByUser.
  );
  router.get(
    "/products/:id", // ➡ tạo routes GET /products/:id.
    asyncHandler(ProductController.getProductById) // ➡ asyncHandler để tự động bắt lỗi trong getProductById.
  );
  router.post(
    "/products", // ➡ tạo routes POST /products.
    requireRoles([UserRole.ADMIN]), // ➡ requireRoles kiểm tra quyền truy cập của người dùng.
    validateImageExists, // ➡ validateImageExists kiểm tra ảnh có tồn tại hay không và tạo đường dẫn hình ảnh.
    validate(InsertProductRequest), // ➡ validate kiểm tra dữ liệu gửi lên có đúng yêu cầu không
    asyncHandler(ProductController.insertProduct) // ➡ asyncHandler để tự động bắt lỗi.
  );
  router.put(
    "/products/:id", // ➡ tạo routes PUT /products/:id.
    requireRoles([UserRole.ADMIN]), // ➡ requireRoles kiểm tra quyền truy cập của người dùng.
    validateImageExists, // ➡ validateImageExists kiểm tra ảnh có tồn tại hay không và tạo đường dẫn hình ảnh.
    validate(UpdateProductRequest), // ➡ validate kiểm tra dữ liệu gửi lên có đúng yêu cầu không
    asyncHandler(ProductController.updateProduct) // ➡ asyncHandler để tự động bắt lỗi trong updateProducts.
  );
  router.delete(
    "/products/:id", // ➡ tạo routes DELETE /products/:id.
    requireRoles([UserRole.ADMIN]), // ➡ requireRoles kiểm tra quyền truy cập của người dùng.
    asyncHandler(ProductController.deleteProduct) // ➡ asyncHandler để tự động bắt lỗi trong deleteProducts.
  );
};
