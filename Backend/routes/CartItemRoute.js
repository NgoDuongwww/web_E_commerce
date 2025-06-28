module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const CartItemController = require('../controllers/CartItemController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const InsertCartItemRequest = require('../dto/requests/cartitem/InsertCartItemRequest.js')

  router.get('/cart-items', asyncHandler(CartItemController.getCartItems))
  router.get(
    '/cart-items/:id',
    asyncHandler(CartItemController.getCartItemById)
  )
  router.get(
    '/cart-items/carts/:cart_id',
    asyncHandler(CartItemController.getCartItemByCartId)
  )
  router.post(
    '/cart-items',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validate(InsertCartItemRequest),
    asyncHandler(CartItemController.insertCartItem)
  )
  router.put(
    '/cart-items/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(CartItemController.insertCartItem)
  )
  router.delete(
    '/cart-items/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(CartItemController.deleteCartItem)
  )
}
