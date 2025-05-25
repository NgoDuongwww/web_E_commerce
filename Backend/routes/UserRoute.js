module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const UserController = require("../controllers/UserController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const LoginUserRequest = require("../dto/requests/user/LoginUserRequest.js");
  const RegisterUserRequest = require("../dto/requests/user/RegisterUserRequest.js");

  router.post(
    "/users/admin/register",
    validate(RegisterUserRequest),
    asyncHandler(UserController.registerAdmin)
  );
  router.post(
    "/users/register",
    validate(RegisterUserRequest),
    asyncHandler(UserController.registerUser)
  );
  router.post(
    "/users/login",
    validate(LoginUserRequest),
    asyncHandler(UserController.loginUser)
  );
  router.put(
    "/users/update/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(UserController.updateUser)
  );
  router.post(
    "/users/me/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(UserController.getUserById)
  );
};
