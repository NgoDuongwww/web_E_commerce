module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const UserController = require('../controllers/UserController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const LoginRequest = require('../dto/requests/user/LoginRequest.js')
  const RegisterRequest = require('../dto/requests/user/RegisterRequest.js')

  router.post(
    '/users/admin/register',
    validate(RegisterRequest),
    asyncHandler(UserController.registerAdmin)
  )
  router.post(
    '/users/register',
    validate(RegisterRequest),
    asyncHandler(UserController.registerUser)
  )
  router.post(
    '/users/login',
    validate(LoginRequest),
    asyncHandler(UserController.login)
  )
  router.put(
    '/users/update/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(UserController.updateUser)
  )
  router.post(
    '/users/me/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(UserController.getUserById)
  )
}
