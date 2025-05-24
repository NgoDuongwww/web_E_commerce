module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const BannerController = require("../controllers/BannerController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const validateImageExists = require("../middlewares/validateImageExists.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const InsertBannerRequest = require("../dto/requests/banner/InsertBannerRequest.js");
  const UpdateBannerRequest = require("../dto/requests/banner/UpdateBannerRequest.js");

  router.get("/banners", asyncHandler(BannerController.getBanners));
  router.get("/banners/:id", asyncHandler(BannerController.getBannerById));
  router.post(
    "/banners",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertBannerRequest),
    asyncHandler(BannerController.insertBanner)
  );
  router.put(
    "/banners/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateBannerRequest),
    asyncHandler(BannerController.updateBanner)
  );
  router.delete(
    "/banners/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BannerController.deleteBanner)
  );
};
