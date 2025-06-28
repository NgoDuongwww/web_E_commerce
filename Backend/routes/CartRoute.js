module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const CartController = require('../controllers/CartController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const InsertCartRequest = require('../dto/requests/cart/InsertCartRequest.js')

  router.get('/carts', asyncHandler(CartController.getCarts))
  router.get('/carts/:id', asyncHandler(CartController.getCartById))
  router.post(
    '/carts',
    requireRoles([UserRole.ADMIN, UserRole.USER]),
    validate(InsertCartRequest),
    asyncHandler(CartController.insertCart)
  )
  router.post(
    '/checkout',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(CartController.checkoutCart)
  )
  router.delete(
    '/carts/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(CartController.deleteCart)
  )
}
