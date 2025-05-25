module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const BannerDetailController = require("../controllers/BannerDetailController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const validateImageExists = require("../middlewares/validateImageExists.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const InsertBannerDetailRequest = require("../dto/requests/bannerdetail/InsertBannerDetailRequest.js");
  const UpdateBannerDetailRequest = require("../dto/requests/bannerdetail/UpdateBannerDetailRequest.js");

  router.get(
    "/banner-details",
    asyncHandler(BannerDetailController.getBannerDetails)
  );
  router.get(
    "/banner-details/:id",
    asyncHandler(BannerDetailController.getBannerDetailById)
  );
  router.post(
    "/banner-details",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertBannerDetailRequest),
    asyncHandler(BannerDetailController.insertBannerDetail)
  );
  router.put(
    "/banner-details/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateBannerDetailRequest),
    asyncHandler(BannerDetailController.updateBannerDetail)
  );
  router.delete(
    "/banner-details/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BannerDetailController.deleteBannerDetail)
  );
};
