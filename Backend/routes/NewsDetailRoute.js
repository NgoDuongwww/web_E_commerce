module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const NewsDetailController = require('../controllers/NewsDetailController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const InsertNewsDetailRequest = require('../dto/requests/newsdetail/InsertNewsDetailRequest.js')

  router.get('/news-details', asyncHandler(NewsDetailController.getNewsDetails))
  router.get(
    '/news-details/:id',
    asyncHandler(NewsDetailController.getNewsDetailById)
  )
  router.post(
    '/news-details',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validate(InsertNewsDetailRequest),
    asyncHandler(NewsDetailController.insertNewsDetail)
  )
  router.put(
    '/news-details/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(NewsDetailController.updateNewsDetail)
  )
  router.delete(
    '/news-details/:id',
    requireRoles([UserRole.ADMIN]),
    asyncHandler(NewsDetailController.deleteNewsDetail)
  )
}
