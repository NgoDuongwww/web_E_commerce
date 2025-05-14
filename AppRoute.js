const express = require("express");
const router = express.Router();

// Constant import
const UserRole = require("./constants/UserRole.js");

// Controller import
const BannerController = require("./controllers/BannerController.js");
const BannerDetailController = require("./controllers/BannerDetailController.js");
const BrandController = require("./controllers/BrandController.js");
const CartController = require("./controllers/CartController.js");
const CartItemController = require("./controllers/CartItemController.js");
const CategoryController = require("./controllers/CategoryController.js");
const ImageController = require("./controllers/ImageController.js");
const NewsController = require("./controllers/NewsController.js");
const NewsDetailController = require("./controllers/NewsDetailController.js");
const OrderController = require("./controllers/OrderController.js");
const OrderDetailController = require("./controllers/OrderDetailController.js");
const ProductController = require("./controllers/ProductController.js");
const ProductImageController = require("./controllers/ProductImageController.js");
const UserController = require("./controllers/UserController.js");

// Middleware import
const asyncHandler = require("./middlewares/asyncHandler.js");
const validate = require("./middlewares/validate.js");
const imageUpload = require("./middlewares/imageUpload.js");
const validateImageExists = require("./middlewares/validateImageExists.js");
const imageGoogleUpload = require("./middlewares/imageGoogleUpload.js");
const requireRoles = require("./middlewares/jwtMiddleware.js");

// DTO import
const InsertBannerRequest = require("./dto/requests/banner/InsertBannerRequest.js");
const InsertBannerDetailRequest = require("./dto/requests/bannerdetail/InsertBannerDetailRequest.js");
const InsertCartRequest = require("./dto/requests/cart/InsertCartRequest.js");
const InsertCartItemRequest = require("./dto/requests/cartitem/InsertCartItemRequest.js");
const InsertNewsRequest = require("./dto/requests/news/InsertNewsRequest.js");
const UpdateNewsRequest = require("./dto/requests/news/UpdateNewsRequest.js");
const InsertNewsDetailRequest = require("./dto/requests/newsdetail/InsertNewsDetailRequest.js");
const InsertOrderRequest = require("./dto/requests/order/InsertOrderRequest.js");
const UpdateOrderRequest = require("./dto/requests/order/UpdateOrderRequest.js");
const InsertProductRequest = require("./dto/requests/product/InsertProductRequest.js");
const UpdateProductRequest = require("./dto/requests/product/UpdateProductRequest.js");
const insertProductImageRequest = require("./dto/requests/product_image/InsertProductImageRequest.js");
const LoginUserRequest = require("./dto/requests/user/LoginUserRequest.js");
const RegisterUserRequest = require("./dto/requests/user/RegisterUserRequest.js");

module.exports = (app) => {
  // Image Routes
  router.post(
    "/images/upload",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    imageUpload.array("images", 5),
    asyncHandler(ImageController.uploadImages)
  );
  router.post(
    "/images/google/upload",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    imageGoogleUpload.single("image"),
    asyncHandler(ImageController.uploadImageToGoogleStorage)
  );
  router.get("/images/:filename", asyncHandler(ImageController.viewImage));
  router.delete(
    "/images/delete",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    ImageController.deleteImage
  );

  // Users Routes
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

  // Products Routes
  router.get("/products", asyncHandler(ProductController.getProducts));
  router.get("/products/:id", asyncHandler(ProductController.getProductById));
  router.post(
    "/products",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertProductRequest),
    asyncHandler(ProductController.insertProduct)
  );
  router.put(
    "/products/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateProductRequest),
    asyncHandler(ProductController.updateProduct)
  );
  router.delete(
    "/products/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(ProductController.deleteProduct)
  );

  // Product Images Routes
  router.get(
    "/product-images",
    asyncHandler(ProductImageController.getProductImages)
  );
  router.get(
    "/product-images/:id",
    asyncHandler(ProductImageController.getProductImageById)
  );
  router.post(
    "/product-images",
    requireRoles([UserRole.ADMIN]),
    validate(insertProductImageRequest),
    asyncHandler(ProductImageController.insertProductImage)
  );
  router.put(
    "/product-images/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(ProductImageController.updateProductImage)
  );
  router.delete(
    "/product-images/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(ProductImageController.deleteProductImage)
  );

  // Banner Routes
  router.get("/banners", asyncHandler(BannerController.getBanners));
  router.get("/banners/:id", asyncHandler(BannerController.getBannerById));
  router.post(
    "/banners",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertBannerRequest),
    asyncHandler(BannerController.insertBanner)
  );
  router.put(
    "/banners/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(BannerController.updateBanner)
  );
  router.delete(
    "/banners/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BannerController.deleteBanner)
  );

  // Banner Detail Routes
  router.get(
    "/banner-details",
    asyncHandler(BannerDetailController.getBannerDetails)
  );
  router.get(
    "/banner-details/:id",
    asyncHandler(BannerDetailController.getBannerDetailById)
  );
  router.post(
    "/banner-details",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    validate(InsertBannerDetailRequest),
    asyncHandler(BannerDetailController.insertBannerDetail)
  );
  router.put(
    "/banner-details/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(BannerDetailController.updateBannerDetail)
  );
  router.delete(
    "/banner-details/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BannerDetailController.deleteBannerDetail)
  );

  // Brand Routes
  router.get("/brands", asyncHandler(BrandController.getBrands));
  router.get("/brands/:id", asyncHandler(BrandController.getBrandById));
  router.post(
    "/brands",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(BrandController.insertBrand)
  );
  router.put(
    "/brands/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(BrandController.updateBrand)
  );
  router.delete(
    "/brands/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(BrandController.deleteBrand)
  );

  // Cart Routes
  router.get("/carts", asyncHandler(CartController.getCarts));
  router.get("/carts/:id", asyncHandler(CartController.getCartById));
  router.post(
    "/carts",
    requireRoles([UserRole.ADMIN, UserRole.USER]),
    validate(InsertCartRequest),
    asyncHandler(CartController.insertCart)
  );
  router.post(
    "/checkout",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(CartController.checkoutCart)
  );
  router.put("/carts/:id", asyncHandler(CartController.updateCart));
  router.delete(
    "/carts/:id",
    requireRoles([UserRole.USER]),
    asyncHandler(CartController.deleteCart)
  );

  // Cart Items Routes
  router.get("/cart-items", asyncHandler(CartItemController.getCartItems));
  router.get(
    "/cart-items/:id",
    asyncHandler(CartItemController.getCartItemById)
  );
  router.get(
    "/cart-items/carts/:cart_id",
    asyncHandler(CartItemController.getCartItemByCartId)
  );
  router.post(
    "/cart-items",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validate(InsertCartItemRequest),
    asyncHandler(CartItemController.insertCartItem)
  );
  router.put(
    "/cart-items/:id",
    requireRoles([UserRole.USER]),
    asyncHandler(CartItemController.updateCartItem)
  );
  router.delete(
    "/cart-items/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(CartItemController.deleteCartItem)
  );

  // Categories Routes
  router.get("/categories", asyncHandler(CategoryController.getCategories));
  router.get(
    "/categories/:id",
    asyncHandler(CategoryController.getCategoryById)
  );
  router.post(
    "/categories",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(CategoryController.insertCategory)
  );
  router.put(
    "/categories/:id",
    requireRoles([UserRole.ADMIN]),
    validateImageExists,
    asyncHandler(CategoryController.updateCategory)
  );
  router.delete(
    "/categories/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(CategoryController.deleteCategory)
  );

  // News Routes
  router.get("/news", asyncHandler(NewsController.getNewsArticles));
  router.get("/news/:id", asyncHandler(NewsController.getNewsArticleById));
  router.post(
    "/news",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validateImageExists,
    validate(InsertNewsRequest),
    asyncHandler(NewsController.insertNewsArticle)
  );
  router.put(
    "/news/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validateImageExists,
    validate(UpdateNewsRequest),
    asyncHandler(NewsController.updateNewsArticle)
  );
  router.delete(
    "/news/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(NewsController.deleteNewsArticle)
  );

  // News Detail Routes
  router.get(
    "/news-details",
    asyncHandler(NewsDetailController.getNewsDetails)
  );
  router.get(
    "/news-details/:id",
    asyncHandler(NewsDetailController.getNewsDetailById)
  );
  router.post(
    "/news-details",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validate(InsertNewsDetailRequest),
    asyncHandler(NewsDetailController.insertNewsDetail)
  );
  router.put(
    "/news-details/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(NewsDetailController.updateNewsDetail)
  );
  router.delete(
    "/news-details/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(NewsDetailController.deleteNewsDetail)
  );

  // Order Routes
  router.get("/orders", asyncHandler(OrderController.getOrders));
  router.get("/orders/:id", asyncHandler(OrderController.getOrderById));
  // router.post(
  //   "/orders",
  //   validate(InsertOrderRequest),
  //   asyncHandler(OrderController.insertOrder)
  // );
  router.put(
    "/orders/:id",
    requireRoles([UserRole.ADMIN, UserRole.USER]),
    validate(UpdateOrderRequest),
    asyncHandler(OrderController.updateOrder)
  );
  router.delete(
    "/orders/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(OrderController.deleteOrder)
  );

  // Order Detail Routes
  router.get(
    "/order-details",
    asyncHandler(OrderDetailController.getOrderDetails)
  );
  router.get(
    "/order-details/:id",
    asyncHandler(OrderDetailController.getOrderDetailById)
  );
  router.post(
    "/order-details",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(OrderDetailController.insertOrderDetail)
  );
  router.put(
    "/order-details/:id",
    asyncHandler(OrderDetailController.updateOrderDetail)
  );
  router.delete(
    "/order-details/:id",
    requireRoles([UserRole.ADMIN]),
    asyncHandler(OrderDetailController.deleteOrderDetail)
  );

  app.use("/api/", router); // ➡ Gắn router vào /api/. (→ /api/products)
};
