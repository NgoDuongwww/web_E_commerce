module.exports = (router) => {
  // Constant import
  const UserRole = require('../constants')

  // Controller import
  const BrandController = require('../controllers/BrandController.js')

  // Middleware import
  const asyncHandler = require('../middlewares/asyncHandler.js')
  const validate = require('../middlewares/validate.js')
  const validateImageExists = require('../middlewares/validateImageExists.js')
  const requireRoles = require('../middlewares/jwtMiddleware.js')

  // DTO import
  const InsertBrandRequest = require('../dto/requests/brand/InsertBrandRequest.js')
  const UpdateBrandRequest = require('../dto/requests/brand/UpdateBrandRequest.js')

  // Public
  router.get('/brands', asyncHandler(BrandController.getBrands))
  router.get('/brands/:id', asyncHandler(BrandController.getBrandById))

  // Admin
  router.get(
    '/admin/brands',
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BrandController.getBrands)
  )
  router.get(
    '/admin/brands/:id',
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BrandController.getBrandById)
  )
  router.post(
    '/admin/brands',
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertBrandRequest),
    asyncHandler(BrandController.insertBrand)
  )
  router.put(
    '/admin/brands/:id',
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateBrandRequest),
    asyncHandler(BrandController.updateBrand)
  )
  router.delete(
    '/admin/brands/:id',
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BrandController.deleteBrand)
  )
}
