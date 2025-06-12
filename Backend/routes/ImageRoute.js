module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants/UserRole.js')

  // Controller import
  const ImageController = require('../controllers/ImageController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const imageUpload = require('../middlewares/imageUpload.js')
  const imageGoogleUpload = require('../middlewares/imageGoogleUpload.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  router.post(
    '/images/upload',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    imageUpload.array('images', 5), // ➡ imageUpload chỉ cho phép upload tối đa 5 ảnh
    asyncHandler(ImageController.uploadImages),
  )
  router.post(
    '/images/google/upload',
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    imageGoogleUpload.single('image'),
    asyncHandler(ImageController.uploadImageToGoogleStorage),
  )
  router.get('/images/:filename', asyncHandler(ImageController.viewImage)),
    router.delete(
      '/images/delete',
      requireRoles([UserRole.USER, UserRole.ADMIN]),
      ImageController.deleteImage,
    )
}
