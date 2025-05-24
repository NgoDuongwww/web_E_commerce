module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const DiscountController = require("../controllers/DiscountController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const InsertDiscountRequest = require("../dto/requests/discount/InsertDiscountRequest.js");
  const UpdateDiscountRequest = require("../dto/requests/discount/UpdateDiscountRequest.js");

  router.get("/discounts", asyncHandler(DiscountController.getDiscounts));
  router.get(
    "/discounts/:id",
    asyncHandler(DiscountController.getDiscountById)
  );
  router.post(
    "/discounts",
    requireRoles([UserRole.ADMIN]),
    validate(InsertDiscountRequest),
    asyncHandler(DiscountController.insertDiscount)
  );
  router.put(
    "/discounts/:id",
    requireRoles([UserRole.ADMIN]),
    validate(UpdateDiscountRequest),
    asyncHandler(DiscountController.updateDiscount)
  );
  router.delete(
    "/discounts/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(DiscountController.deleteDiscount)
  );
};
