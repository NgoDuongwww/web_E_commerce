module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const OrderController = require('../controllers/OrderController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const UpdateOrderRequest = require('../dto/requests/order/UpdateOrderRequest.js')

  router.get('/orders', asyncHandler(OrderController.getOrders))
  router.get('/orders/:id', asyncHandler(OrderController.getOrderById))
  router.put(
    '/orders/:id',
    requireRoles([UserRole.ADMIN, UserRole.USER]),
    validate(UpdateOrderRequest),
    asyncHandler(OrderController.updateOrder)
  )
  router.delete(
    '/orders/:id',
    requireRoles([UserRole.ADMIN]),
    asyncHandler(OrderController.deleteOrder)
  )
}
