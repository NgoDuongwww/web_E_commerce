module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const CategoryController = require("../controllers/CategoryController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const validateImageExists = require("../middlewares/validateImageExists.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const InsertCategoryRequest = require("../dto/requests/category/InsertCategoryRequest.js");
  const UpdateCategoryRequest = require("../dto/requests/category/UpdateCategoryRequest.js");

  router.get("/categories", asyncHandler(CategoryController.getCategories));
  router.get(
    "/categories/:id",
    asyncHandler(CategoryController.getCategoryById)
  );
  router.post(
    "/admin/categories",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertCategoryRequest),
    asyncHandler(CategoryController.insertCategory)
  );
  router.put(
    "/admin/categories/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateCategoryRequest),
    asyncHandler(CategoryController.updateCategory)
  );
  router.delete(
    "/admin/categories/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(CategoryController.deleteCategory)
  );
};
