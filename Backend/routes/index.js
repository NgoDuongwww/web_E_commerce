const BannerDetailRoute = require('./BannerDetailRoute')
const BannerRoute = require('./BannerRoute')
const BrandRoute = require('./BrandRoute')
const CartItemRoute = require('./CartItemRoute')
const CartRoute = require('./CartRoute')
const CategoryRoute = require('./CategoryRoute')
const DiscountRoute = require('./DiscountRoute')
const FeedbackRoute = require('./FeedbackRoute')
const ImageRoute = require('./ImageRoute')
const NewsDetailRoute = require('./NewsDetailRoute')
const NewsRoute = require('./NewsRoute')
const OrderDetailRoute = require('./OrderDetailRoute')
const OrderRoute = require('./OrderRoute')
const ProductImageRoute = require('./ProductImageRoute')
const ProductRoute = require('./ProductRoute')
const UserRoute = require('./UserRoute')

module.exports = (router) => {
  BannerDetailRoute(router)
  BannerRoute(router)
  BrandRoute(router)
  CartItemRoute(router)
  CartRoute(router)
  CategoryRoute(router)
  DiscountRoute(router)
  FeedbackRoute(router)
  ImageRoute(router)
  NewsDetailRoute(router)
  NewsRoute(router)
  OrderDetailRoute(router)
  OrderRoute(router)
  ProductImageRoute(router)
  ProductRoute(router)
  UserRoute(router)
}
