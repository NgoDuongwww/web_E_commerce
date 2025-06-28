module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const OrderDetailController = require('../controllers/OrderDetailController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import

  router.get(
    '/order-details',
    asyncHandler(OrderDetailController.getOrderDetails)
  )
  router.get(
    '/order-details/:id',
    asyncHandler(OrderDetailController.getOrderDetailById)
  )
  router.put(
    '/order-details/:id',
    asyncHandler(OrderDetailController.updateOrderDetail)
  )
  router.delete(
    '/order-details/:id',
    requireRoles([UserRole.ADMIN]),
    asyncHandler(OrderDetailController.deleteOrderDetail)
  )
}
