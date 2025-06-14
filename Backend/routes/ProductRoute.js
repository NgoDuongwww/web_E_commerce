module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants/UserRole.js')

  // Controller import
  const ProductController = require('../controllers/ProductController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const validateImageExists = require('../middlewares/validateImageExists.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const InsertProductRequest = require('../dto/requests/product/InsertProductRequest.js')
  const UpdateProductRequest = require('../dto/requests/product/UpdateProductRequest.js')

  // Public
  router.get(
    '/products', // ➡ tạo routes GET /products.
    asyncHandler(ProductController.getProductsForPublic), // ➡ asyncHandler để tự động bắt lỗi trong getProductsForPublic.
  )
  router.get(
    '/products/:id', // ➡ tạo routes GET /products/:id.
    asyncHandler(ProductController.getProductByIdForPublic), // ➡ asyncHandler để tự động bắt lỗi trong getProductByIdForPublic.
  )

  // Admin
  router.get(
    '/admin/products', // ➡ tạo routes GET /admin/products.
    requireRoles([UserRole.ADMIN]),
    asyncHandler(ProductController.getProductsForAdmin), // ➡ asyncHandler để tự động bắt lỗi trong getProductsForAdmin.
  )
  router.get(
    '/admin/products/:id', // ➡ tạo routes GET /admin/products/:id.
    requireRoles([UserRole.ADMIN]),
    asyncHandler(ProductController.getProductByIdForAdmin), // ➡ asyncHandler để tự động bắt lỗi trong getProductByIdForAdmin.
  )
  router.post(
    '/admin/products', // ➡ tạo routes POST /admin/products.
    requireRoles([UserRole.ADMIN]), // ➡ requireRoles kiểm tra quyền truy cập của người dùng.
    validateImageExists, // ➡ validateImageExists kiểm tra ảnh có tồn tại hay không và tạo đường dẫn hình ảnh.
    validate(InsertProductRequest), // ➡ validate kiểm tra dữ liệu gửi lên có đúng yêu cầu không
    asyncHandler(ProductController.insertProduct), // ➡ asyncHandler để tự động bắt lỗi.
  )
  router.put(
    '/admin/products/:id', // ➡ tạo routes PUT /admin/products/:id.
    requireRoles([UserRole.ADMIN]), // ➡ requireRoles kiểm tra quyền truy cập của người dùng.
    validateImageExists, // ➡ validateImageExists kiểm tra ảnh có tồn tại hay không và tạo đường dẫn hình ảnh.
    validate(UpdateProductRequest), // ➡ validate kiểm tra dữ liệu gửi lên có đúng yêu cầu không
    asyncHandler(ProductController.updateProduct), // ➡ asyncHandler để tự động bắt lỗi trong updateProducts.
  )
  router.delete(
    '/admin/products/:id', // ➡ tạo routes DELETE /admin/products/:id.
    requireRoles([UserRole.ADMIN]), // ➡ requireRoles kiểm tra quyền truy cập của người dùng.
    asyncHandler(ProductController.deleteProduct), // ➡ asyncHandler để tự động bắt lỗi trong deleteProducts.
  )
}
