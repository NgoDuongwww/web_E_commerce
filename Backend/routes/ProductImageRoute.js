module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const ProductImageController = require("../controllers/ProductImageController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const validateImageExists = require("../middlewares/validateImageExists.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const insertProductImageRequest = require("../dto/requests/product_image/InsertProductImageRequest.js");

  router.get(
    "/product-images",
    asyncHandler(ProductImageController.getProductImages)
  );
  router.get(
    "/product-images/:id",
    asyncHandler(ProductImageController.getProductImageById)
  );
  router.post(
    "/product-images",
    requireRoles([UserRole.ADMIN]),
    validate(insertProductImageRequest),
    asyncHandler(ProductImageController.insertProductImage)
  );
  router.put(
    "/product-images/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(ProductImageController.updateProductImage)
  );
  router.delete(
    "/product-images/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(ProductImageController.deleteProductImage)
  );
};
