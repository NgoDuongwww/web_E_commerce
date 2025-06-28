module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const NewsController = require('../controllers/NewsController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const validateImageExists = require('../middlewares/validateImageExists.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const InsertNewsRequest = require('../dto/requests/news/InsertNewsRequest.js')
  const UpdateNewsRequest = require('../dto/requests/news/UpdateNewsRequest.js')

  router.get('/news', asyncHandler(NewsController.getNewsArticles))
  router.get('/news/:id', asyncHandler(NewsController.getNewsArticleById))
  router.post(
    '/news',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validateImageExists,
    validate(InsertNewsRequest),
    asyncHandler(NewsController.insertNewsArticle)
  )
  router.put(
    '/news/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateNewsRequest),
    asyncHandler(NewsController.updateNewsArticle)
  )
  router.delete(
    '/news/:id',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(NewsController.deleteNewsArticle)
  )
}
