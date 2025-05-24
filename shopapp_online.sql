-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 22, 2025 at 04:23 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopapp_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(10, 'Màn hình', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(11, 'Kết nối', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(12, 'Dung lượng pin', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(13, 'Chống nước', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(14, 'Tính năng', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(15, 'Chất liệu mặt kính', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(16, 'Trọng lượng', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(17, 'Màu sắc', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(18, 'Dây đeo', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(19, 'Camera', '2025-05-12 15:56:26', '2025-05-12 15:56:26'),
(20, 'Hệ điều hành', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(21, 'Chất liệu vỏ', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(22, 'Bộ nhớ', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(23, 'Chip', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(24, 'RAM', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(25, 'Ổ cứng', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(26, 'Card đồ họa', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(27, 'Cổng kết nối', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(28, 'Cảm biến', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(29, 'Hệ thống lấy nét', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(30, 'Chống rung', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(31, 'Tốc độ chụp', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(32, 'Quay video', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(33, 'Thẻ nhớ', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(34, 'CPU', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(35, 'Bộ nhớ trong', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(36, 'Camera chính', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(37, 'Camera trước', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(38, 'Pin', '2025-05-20 13:28:07', '2025-05-20 13:28:07');

-- --------------------------------------------------------

--
-- Table structure for table `bannerdetails`
--

CREATE TABLE `bannerdetails` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `banner_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bannerdetails`
--

INSERT INTO `bannerdetails` (`id`, `product_id`, `banner_id`, `created_at`, `updated_at`) VALUES
(1, 2, 2, '2025-05-13 16:27:27', '2025-05-13 16:27:27'),
(3, 3, 2, '2025-05-22 09:56:46', '2025-05-22 09:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text,
  `status` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `name`, `image`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Ronaldo', '1745938789881-ronaldo-drinking.jpg', 1, '2025-05-13 15:48:53', '2025-05-13 16:05:52'),
(3, 'Ronaldoo', '1745938789881-ronaldo-drinking.jpg', 1, '2025-05-13 16:06:34', '2025-05-13 16:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Apple', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:16:06', '2025-05-12 15:16:06'),
(2, 'SamSung', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:16:16', '2025-05-12 15:16:16'),
(3, 'Xiao Mi', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:16:24', '2025-05-12 15:16:24'),
(4, 'Vivo', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:16:35', '2025-05-12 15:16:35'),
(5, 'Nokia', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:16:43', '2025-05-12 15:16:43'),
(7, 'Sony', '1745938789881-ronaldo-drinking.jpg', '2025-05-20 12:53:06', '2025-05-22 09:57:11'),
(8, 'Dell', '1745938789881-ronaldo-drinking.jpg', '2025-05-20 13:15:21', '2025-05-20 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `id` int NOT NULL,
  `cart_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Phone', '1745389373266-Untitled-2.png', '2025-05-12 15:17:19', '2025-05-22 14:14:44'),
(2, 'Laptop', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:17:25', '2025-05-12 15:17:25'),
(3, 'Máy tính bảng', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:17:32', '2025-05-12 15:17:32'),
(4, 'Đồng hồ thông minh', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:17:41', '2025-05-12 15:17:41'),
(5, 'Tai nghe', '1745938789881-ronaldo-drinking.jpg', '2025-05-12 15:19:24', '2025-05-12 15:19:24'),
(6, 'Máy ảnh', '1745938789881-ronaldo-drinking.jpg', '2025-05-20 12:53:43', '2025-05-20 12:53:43');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` int NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `percent_value` int NOT NULL DEFAULT '0',
  `max_discount` int NOT NULL DEFAULT '0',
  `min_total` int NOT NULL DEFAULT '0',
  `brand_id` int NOT NULL,
  `category_id` int NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`id`, `code`, `percent_value`, `max_discount`, `min_total`, `brand_id`, `category_id`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'SAVE20', 10, 50000, 200000, 1, 2, '2025-06-30 00:00:00', '2025-05-20 07:45:26', '2025-05-22 14:20:18'),
(3, 'DEAL20', 20, 100000, 500000, 3, 4, '2025-07-15 16:59:59', '2025-05-20 07:51:49', '2025-05-20 07:51:49'),
(4, 'HOTSALE30', 30, 150000, 800000, 2, 1, '2025-08-01 16:59:59', '2025-05-20 07:53:37', '2025-05-20 07:53:37');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `star` int NOT NULL,
  `content` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1: visible, 2: invisible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` text,
  `content` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `image`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Iphone', '', 'tung tung tung sahur', '2025-05-22 14:21:30', '2025-05-22 14:21:30');

-- --------------------------------------------------------

--
-- Table structure for table `newsdetails`
--

CREATE TABLE `newsdetails` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `news_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `newsdetails`
--

INSERT INTO `newsdetails` (`id`, `product_id`, `news_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2025-05-22 14:21:30', '2025-05-22 14:21:30');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `order_id`, `product_variant_id`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 2, 9, 22990000, 13, '2025-05-12 16:12:01', '2025-05-22 14:49:10'),
(3, 3, 17, 57990000, 12, '2025-05-20 15:40:41', '2025-05-20 15:40:41'),
(4, 3, 18, 67990000, 12, '2025-05-20 15:40:41', '2025-05-20 15:40:41'),
(5, 3, 19, 69990000, 12, '2025-05-20 15:40:41', '2025-05-20 15:40:41'),
(6, 3, 20, 79990000, 12, '2025-05-20 15:40:41', '2025-05-20 15:40:41'),
(7, 4, 20, 79990000, 12, '2025-05-20 15:41:34', '2025-05-20 15:41:34'),
(8, 4, 22, 29990000, 12, '2025-05-20 15:41:34', '2025-05-20 15:41:34'),
(9, 5, 22, 29990000, 12, '2025-05-20 15:43:31', '2025-05-20 15:43:31'),
(10, 6, 22, 29990000, 12, '2025-05-20 15:53:39', '2025-05-20 15:53:39'),
(11, 7, 22, 29990000, 12, '2025-05-20 16:03:16', '2025-05-20 16:03:16'),
(12, 8, 20, 300000, 1, '2025-05-20 16:04:52', '2025-05-20 16:04:52'),
(13, 9, 20, 300000, 1, '2025-05-20 16:12:12', '2025-05-20 16:12:12'),
(17, 13, 21, 25990000, 21, '2025-05-22 16:14:09', '2025-05-22 16:14:09');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` int NOT NULL COMMENT '1: Pending, 2: Processing, 3: Shipped, 4: Delivered, 5: Cancelled, 6: Refunded, 7: Failed',
  `note` text,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `total` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `discount_id` int DEFAULT NULL,
  `discount_amount` int DEFAULT '0' COMMENT 'Số tiền đã giảm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `note`, `phone`, `address`, `total`, `created_at`, `updated_at`, `discount_id`, `discount_amount`) VALUES
(2, 1, 1, NULL, '0', '0', 275880000, '2025-05-12 16:12:01', '2025-05-12 16:12:01', NULL, 0),
(3, 1, 7, 'Giao hàng nhanh nếu có thể', '0', '0', 0, '2025-05-20 15:40:41', '2025-05-22 14:41:35', 2, 0),
(4, 1, 1, 'Giao hàng nhanh nếu có thể', '0', '0', 0, '2025-05-20 15:41:34', '2025-05-20 15:41:34', 2, 0),
(5, 1, 1, 'Giao hàng nhanh nếu có thể', '0', '0', 0, '2025-05-20 15:43:31', '2025-05-20 15:43:31', 2, 0),
(6, 1, 1, 'Giao hàng nhanh nếu có thể', '0', '0', 359830000, '2025-05-20 15:53:39', '2025-05-20 15:53:39', 2, 0),
(7, 1, 1, 'Giao hàng nhanh nếu có thể', '0', '0', 359830000, '2025-05-20 16:03:16', '2025-05-20 16:03:16', 2, 0),
(8, 1, 1, 'Giao hàng nhanh nếu có thể', '0', '0', 270000, '2025-05-20 16:04:52', '2025-05-20 16:04:52', 2, 0),
(9, 1, 2, 'Giao hàng nhanh nếu có thể', '0', '0', 270000, '2025-05-20 16:12:12', '2025-05-22 14:41:11', 2, 30000),
(13, 1, 1, 'Giao hàng nhanh nếu có thể', NULL, NULL, 545740000, '2025-05-22 16:14:09', '2025-05-22 16:14:09', 2, 50000);

-- --------------------------------------------------------

--
-- Table structure for table `productimages`
--

CREATE TABLE `productimages` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `buyturn` int NOT NULL DEFAULT '0',
  `brand_id` int NOT NULL,
  `category_id` int NOT NULL,
  `rating` int NOT NULL DEFAULT '0',
  `total_ratings` int NOT NULL DEFAULT '0',
  `total_sold` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1: Visible, 2: Invisible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `buyturn`, `brand_id`, `category_id`, `rating`, `total_ratings`, `total_sold`, `created_at`, `updated_at`, `is_visible`) VALUES
(2, 'Đồng hồ thông minh Xiaomi Mi Watch', '1745938789881-ronaldo-drinking.jpg', 'Xiaomi Mi Watch – Đồng hồ thông minh thiết kế cao cấp, tích hợp GPS, cảm biến SpO2, đo nhịp tim liên tục, hỗ trợ 117 chế độ luyện tập, khả năng chống nước 5ATM.', 523, 3, 4, 0, 0, 0, '2025-05-12 15:25:47', '2025-05-12 15:25:47', 1),
(3, 'Samsung Galaxy S21', '1745938789881-ronaldo-drinking.jpg', 'Samsung Galaxy S21 – Smartphone cao cấp với màn hình Dynamic AMOLED 2X, camera 64MP, hỗ trợ 5G, pin 4000mAh, hỗ trợ sạc nhanh 25W.', 152, 1, 1, 0, 0, 0, '2025-05-12 15:56:26', '2025-05-12 15:56:26', 1),
(4, 'Iphone 16', '1745938789881-ronaldo-drinking.jpg', 'Iphone 16', 321, 1, 2, 0, 0, 0, '2025-05-12 15:57:52', '2025-05-20 15:23:25', 1),
(5, 'MacBook Pro 16-inch', '1745938789881-ronaldo-drinking.jpg', 'MacBook Pro 16-inch với chip M1 Pro, hiệu năng mạnh mẽ cho công việc sáng tạo và lập trình.', 120, 1, 2, 0, 0, 0, '2025-05-20 08:30:01', '2025-05-20 08:30:01', 1),
(6, 'MacBook Air 13-inch', '1745938789881-ronaldo-drinking.jpg', 'MacBook Air 13-inch với chip M2, thiết kế mỏng nhẹ, hiệu năng ổn định cho công việc hàng ngày và học tập.', 96, 1, 2, 0, 0, 21, '2025-05-20 08:36:09', '2025-05-22 16:14:09', 1),
(7, 'Canon EOS R7', '1745938789881-ronaldo-drinking.jpg', 'Canon EOS R7 là máy ảnh mirrorless APS-C cao cấp, phù hợp cho nhiếp ảnh gia chuyên nghiệp và bán chuyên.', 75, 7, 6, 0, 0, 0, '2025-05-20 12:54:12', '2025-05-20 12:54:12', 1),
(8, 'Dell XPS 15', '1745938789881-ronaldo-drinking.jpg', 'Dell XPS 15 sở hữu thiết kế cao cấp, hiệu năng mạnh mẽ với chip Intel Core i7 thế hệ 13, phù hợp cho công việc nặng và sáng tạo nội dung.', 80, 8, 2, 0, 0, 0, '2025-05-20 13:21:36', '2025-05-20 13:21:36', 1),
(9, 'Vivo V27 5G', '1745938789881-ronaldo-drinking.jpg', 'Vivo V27 5G với thiết kế mỏng nhẹ, camera ấn tượng và hiệu năng mạnh mẽ nhờ chip Dimensity 7200.', 210, 4, 1, 0, 0, 0, '2025-05-20 13:28:07', '2025-05-20 13:28:07', 1),
(10, 'Vivo X80 Pro', '1745938789881-ronaldo-drinking.jpg', 'Vivo X80 Pro với camera ZEISS, chip Snapdragon 8 Gen 1, màn hình AMOLED 6.78 inch, hiệu năng mạnh mẽ và thiết kế sang trọng.', 180, 4, 1, 0, 0, 0, '2025-05-20 13:34:15', '2025-05-20 13:34:15', 1),
(17, 'Vivo V25 5G', '1745938789881-ronaldo-drinking.jpg', 'Vivo V25 5G với thiết kế đổi màu độc đáo, camera chính 64MP, chip MediaTek Dimensity 900, màn hình AMOLED 6.44 inch.', 150, 4, 1, 0, 0, 0, '2025-05-20 15:22:01', '2025-05-20 15:22:01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  `value` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_attribute_values`
--

INSERT INTO `product_attribute_values` (`id`, `product_id`, `attribute_id`, `value`, `created_at`, `updated_at`) VALUES
(10, 2, 10, 'AMOLED 1.39 inch, 454x454 pixels', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(11, 2, 11, 'Bluetooth 5.0, GPS, GLONASS', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(12, 2, 12, '420mAh (dùng 14 ngày liên tục)', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(13, 2, 13, '5ATM (bơi, lặn nông)', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(14, 2, 14, 'Theo dõi nhịp tim, đo SpO2, GPS chính xác, 117 chế độ luyện tập, nhận thông báo, nghe nhạc offline', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(15, 2, 15, 'Kính cường lực Gorilla Glass 3', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(16, 2, 16, '32g (không dây đeo)', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(17, 2, 17, 'Titan Xám, Titan Trắng, Titan Xanh, Titan Đen', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(18, 2, 18, 'Silicon cao cấp', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(19, 3, 10, '6.2 inch Dynamic AMOLED 2X, 120Hz', '2025-05-12 15:56:26', '2025-05-12 15:56:26'),
(20, 3, 11, '5G, Bluetooth 5.0, NFC', '2025-05-12 15:56:26', '2025-05-12 15:56:26'),
(21, 3, 12, '4000mAh (sạc nhanh 25W)', '2025-05-12 15:56:26', '2025-05-12 15:56:26'),
(22, 3, 19, '64MP (camera chính), 12MP (camera siêu rộng), 10MP (camera telephoto)', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(23, 3, 20, 'Android 11, One UI 3.1', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(24, 3, 17, 'Phantom Gray, Phantom White, Phantom Violet, Phantom Pink', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(25, 3, 21, 'Khung kim loại, mặt kính Gorilla Glass Victus', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(26, 3, 22, '128GB, 256GB', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(27, 4, 10, '6.1 inch Super Retina XDR, 60Hz', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(28, 4, 11, '5G, Bluetooth 5.0, NFC', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(29, 4, 12, '3240mAh (sạc nhanh 20W)', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(30, 4, 19, '12MP (camera chính), 12MP (camera siêu rộng)', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(31, 4, 20, 'iOS 15', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(32, 4, 17, 'Red, Blue, Pink, Black, White, Green', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(33, 4, 21, 'Khung nhôm, mặt kính Ceramic Shield', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(34, 4, 22, '128GB, 256GB, 512GB', '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(35, 5, 10, '16 inch Retina, độ phân giải 3072x1920', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(36, 5, 23, 'Apple M1 Pro 10-core', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(37, 5, 24, '16GB', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(38, 5, 25, '512GB SSD', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(39, 5, 26, '16-core GPU', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(40, 5, 20, 'macOS Monterey', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(41, 5, 27, 'Thunderbolt 4, HDMI, SDXC', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(42, 5, 16, '2.1 kg', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(43, 6, 10, '13.3 inch Retina, độ phân giải 2560x1600', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(44, 6, 23, 'Apple M2 8-core', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(45, 6, 24, '8GB', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(46, 6, 25, '256GB SSD', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(47, 6, 26, 'Integrated 8-core GPU', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(48, 6, 20, 'macOS Ventura', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(49, 6, 27, 'Thunderbolt 3, USB 4', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(50, 6, 16, '1.29 kg', '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(51, 7, 28, 'APS-C CMOS 32.5MP', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(52, 7, 29, 'Dual Pixel CMOS AF II', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(53, 7, 30, 'IBIS 5 trục', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(54, 7, 31, '30 fps (chụp điện tử), 15 fps (chụp cơ)', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(55, 7, 32, '4K 60fps, Full HD 120fps', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(56, 7, 33, '2 khe SD UHS-II', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(57, 7, 11, 'Wi-Fi, Bluetooth', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(58, 7, 16, '612g (có pin và thẻ nhớ)', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(59, 8, 10, '15.6 inch FHD+ 1920x1200, viền mỏng InfinityEdge', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(60, 8, 34, 'Intel Core i7-13700H', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(61, 8, 24, '16GB DDR5', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(62, 8, 25, '1TB SSD', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(63, 8, 26, 'NVIDIA GeForce RTX 4050 6GB', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(64, 8, 20, 'Windows 11 Pro', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(65, 8, 27, 'Thunderbolt 4, USB-C, HDMI, Jack 3.5mm', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(66, 8, 16, '1.92 kg', '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(67, 9, 10, '6.78 inch AMOLED, 120Hz, 1080 x 2400', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(68, 9, 23, 'MediaTek Dimensity 7200', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(69, 9, 24, '8GB', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(70, 9, 35, '256GB', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(71, 9, 36, '50MP + 8MP + 2MP', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(72, 9, 37, '50MP', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(73, 9, 38, '4600mAh, sạc nhanh 66W', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(74, 9, 20, 'Android 13, Funtouch OS 13', '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(75, 10, 10, '6.78 inch AMOLED, độ phân giải 3200x1440', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(76, 10, 23, 'Snapdragon 8 Gen 1', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(77, 10, 24, '12GB', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(78, 10, 22, '256GB', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(79, 10, 19, 'Chính 50MP ZEISS, trước 32MP', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(80, 10, 38, '4500mAh, sạc nhanh 80W', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(81, 10, 20, 'Android 12', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(82, 10, 11, '5G, Wi-Fi 6, Bluetooth 5.2', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(83, 10, 16, '219g', '2025-05-20 13:34:15', '2025-05-20 13:34:15'),
(126, 17, 10, '6.44 inch AMOLED, độ phân giải 2404x1080', '2025-05-20 15:22:01', '2025-05-20 15:22:01'),
(127, 17, 23, 'MediaTek Dimensity 900', '2025-05-20 15:22:01', '2025-05-20 15:22:01'),
(128, 17, 24, '8GB', '2025-05-20 15:22:01', '2025-05-20 15:22:01'),
(129, 17, 35, '128GB', '2025-05-20 15:22:01', '2025-05-20 15:22:01'),
(130, 17, 19, 'Camera chính 64MP, camera selfie 44MP', '2025-05-20 15:22:01', '2025-05-20 15:22:01'),
(131, 17, 38, '4500mAh, sạc nhanh 44W', '2025-05-20 15:22:01', '2025-05-20 15:22:01'),
(132, 17, 20, 'Android 12', '2025-05-20 15:22:01', '2025-05-20 15:22:01');

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_values`
--

CREATE TABLE `product_variant_values` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `old_price` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1: Visible, 2: Invisible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_variant_values`
--

INSERT INTO `product_variant_values` (`id`, `product_id`, `price`, `old_price`, `stock`, `sku`, `created_at`, `updated_at`, `is_visible`) VALUES
(5, 2, 5990000, 6490000, 50, '8-12', '2025-05-12 15:25:47', '2025-05-12 15:25:47', 1),
(6, 2, 6490000, 6990000, 40, '11-13', '2025-05-12 15:25:47', '2025-05-12 15:25:47', 1),
(7, 2, 6990000, 7490000, 30, '9-14', '2025-05-12 15:25:47', '2025-05-12 15:25:47', 1),
(8, 2, 5990000, 6490000, 60, '10-12', '2025-05-12 15:25:47', '2025-05-12 15:25:47', 1),
(9, 3, 22990000, 24990000, 50, '15-19', '2025-05-12 15:56:27', '2025-05-12 15:56:27', 1),
(10, 3, 24990000, 26990000, 40, '16-20', '2025-05-12 15:56:27', '2025-05-12 15:56:27', 1),
(11, 3, 22990000, 24990000, 30, '17-19', '2025-05-12 15:56:27', '2025-05-12 15:56:27', 1),
(12, 3, 24990000, 26990000, 30, '18-20', '2025-05-12 15:56:27', '2025-05-12 15:56:27', 1),
(13, 4, 28990000, 31990000, 30, '19-21', '2025-05-12 15:57:53', '2025-05-12 15:57:53', 1),
(14, 4, 31990000, 34990000, 25, '20-22', '2025-05-12 15:57:53', '2025-05-12 15:57:53', 1),
(15, 4, 34990000, 37990000, 20, '23-27', '2025-05-12 15:57:53', '2025-05-12 15:57:53', 1),
(16, 4, 28990000, 31990000, 25, '19-24', '2025-05-12 15:57:53', '2025-05-12 15:57:53', 1),
(17, 5, 57990000, 64990000, 15, '2728', '2025-05-20 08:30:01', '2025-05-20 08:30:01', 1),
(18, 5, 67990000, 74990000, 10, '2729', '2025-05-20 08:30:01', '2025-05-20 08:30:01', 1),
(19, 5, 69990000, 76990000, 5, '2831', '2025-05-20 08:30:01', '2025-05-20 08:30:01', 1),
(20, 5, 300000, 86990000, 3, '2931', '2025-05-20 08:30:01', '2025-05-20 08:30:01', 1),
(21, 6, 25990000, 27990000, 9, '2032', '2025-05-20 08:36:09', '2025-05-22 16:14:09', 1),
(22, 6, 29990000, 31990000, 15, '2028', '2025-05-20 08:36:09', '2025-05-20 08:36:09', 1),
(23, 6, 29990000, 31990000, 10, '2732', '2025-05-20 08:36:09', '2025-05-20 08:36:09', 1),
(24, 6, 33990000, 35990000, 5, '2728', '2025-05-20 08:36:09', '2025-05-20 08:36:09', 1),
(25, 7, 42990000, 46990000, 10, '3436', '2025-05-20 12:54:12', '2025-05-20 12:54:12', 1),
(26, 7, 48990000, 51990000, 5, '3536', '2025-05-20 12:54:12', '2025-05-20 12:54:12', 1),
(27, 7, 44990000, 48990000, 3, '3437', '2025-05-20 12:54:12', '2025-05-20 12:54:12', 1),
(28, 7, 50990000, 53990000, 2, '3537', '2025-05-20 12:54:12', '2025-05-20 12:54:12', 1),
(29, 8, 38990000, 42990000, 10, '2831', '2025-05-20 13:21:36', '2025-05-20 13:21:36', 1),
(30, 8, 42990000, 46990000, 5, '2931', '2025-05-20 13:21:36', '2025-05-20 13:21:36', 1),
(31, 8, 42990000, 46990000, 3, '2838', '2025-05-20 13:21:36', '2025-05-20 13:21:36', 1),
(32, 8, 46990000, 50990000, 2, '2938', '2025-05-20 13:21:36', '2025-05-20 13:21:36', 1),
(33, 9, 8490000, 9490000, 40, '1932', '2025-05-20 13:28:07', '2025-05-20 13:28:07', 1),
(34, 9, 8990000, 9990000, 30, '2032', '2025-05-20 13:28:07', '2025-05-20 13:28:07', 1),
(35, 9, 9990000, 10990000, 20, '1939', '2025-05-20 13:28:07', '2025-05-20 13:28:07', 1),
(36, 9, 10990000, 11990000, 10, '2039', '2025-05-20 13:28:07', '2025-05-20 13:28:07', 1),
(37, 10, 19990000, 21990000, 15, '1932', '2025-05-20 13:34:15', '2025-05-20 13:34:15', 1),
(38, 10, 21990000, 23990000, 10, '1939', '2025-05-20 13:34:15', '2025-05-20 13:34:15', 1),
(39, 10, 22990000, 24990000, 8, '2032', '2025-05-20 13:34:15', '2025-05-20 13:34:15', 1),
(40, 10, 23990000, 25990000, 7, '2039', '2025-05-20 13:34:15', '2025-05-20 13:34:15', 1),
(65, 17, 10990000, 11990000, 40, '1932', '2025-05-20 15:22:01', '2025-05-20 15:22:01', 1),
(66, 17, 11990000, 12990000, 15, '1939', '2025-05-20 15:22:01', '2025-05-20 15:22:01', 1),
(67, 17, 11990000, 12990000, 3, '2032', '2025-05-20 15:22:01', '2025-05-20 15:22:01', 1),
(68, 17, 12990000, 13990000, 2, '2039', '2025-05-20 15:22:01', '2025-05-20 15:22:01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250412220426-create-user.js'),
('20250412234957-create-category.js'),
('20250413000709-create-brand.js'),
('20250413001158-create-news.js'),
('20250413001244-create-banner.js'),
('20250413013225-create-order.js'),
('20250413022635-create-product.js'),
('20250413051111-create-product-variant-value.js'),
('20250413064113-create-order-detail.js'),
('20250413065553-create-banner-detail.js'),
('20250413070055-create-feed-back.js'),
('20250413071144-create-new-detail.js'),
('20250429152040-create-product-image.js'),
('20250430163946-create-cart.js'),
('20250430164711-create-cart-item.js'),
('20250508160534-create-attribute.js'),
('20250508161705-create-product-attribute-value.js'),
('20250511150146-create-variant.js'),
('20250511150154-create-variant-value.js'),
('20250517081105-create-discount.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` int NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `password_changed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `avatar`, `phone`, `is_locked`, `password_changed_at`, `created_at`, `updated_at`) VALUES
(1, 'abc@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$CRWJsDySfTe6p3J1mW+3TA$WO9o3O8J4cecn9eApaDf8JE6Y9t2FssHJfQ5adnj3B0', 'Duongw', 2, NULL, 668, 0, NULL, '2025-05-12 15:14:27', '2025-05-12 15:14:27'),
(2, NULL, '$argon2id$v=19$m=65536,t=3,p=4$py7uiBw/SCKmmqWtvheHSg$/iRdvkoBBsbSqSTjNlMYMVmaZsYnnzxsPWHgaETXM3c', 'Duongw', 1, NULL, 123, 0, NULL, '2025-05-12 15:14:47', '2025-05-12 15:14:47'),
(3, '456@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$kEooGdPUpQhcj1GwYhDwYg$GuNMtfYfHV1BE9t4rWTpKop5kyk755cIIxjKutsT5u0', 'Duongw', 1, NULL, NULL, 0, NULL, '2025-05-12 15:14:51', '2025-05-12 15:14:51');

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` (`id`, `name`, `created_at`, `updated_at`) VALUES
(3, 'Màu sắc', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(4, 'Loại dây', '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(5, 'Bộ nhớ', '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(6, 'RAM', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(7, 'Ổ cứng', '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(8, 'Ống kính kèm theo', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(9, 'Bảo hành', '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(10, 'Bộ nhớ trong', '2025-05-20 13:28:07', '2025-05-20 13:28:07');

-- --------------------------------------------------------

--
-- Table structure for table `variant_values`
--

CREATE TABLE `variant_values` (
  `id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `image` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `variant_values`
--

INSERT INTO `variant_values` (`id`, `variant_id`, `value`, `image`, `created_at`, `updated_at`) VALUES
(8, 3, 'Titan Xám', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(9, 3, 'Titan Trắng', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(10, 3, 'Titan Xanh', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(11, 3, 'Titan Đen', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(12, 4, 'Dây Silicon', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(13, 4, 'Dây Da', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(14, 4, 'Dây Kim Loại', NULL, '2025-05-12 15:25:47', '2025-05-12 15:25:47'),
(15, 3, 'Phantom Gray', NULL, '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(16, 3, 'Phantom White', NULL, '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(17, 3, 'Phantom Violet', NULL, '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(18, 3, 'Phantom Pink', NULL, '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(19, 5, '128GB', NULL, '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(20, 5, '256GB', NULL, '2025-05-12 15:56:27', '2025-05-12 15:56:27'),
(21, 3, 'Red', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(22, 3, 'Blue', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(23, 3, 'Pink', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(24, 3, 'Black', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(25, 3, 'White', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(26, 3, 'Green', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(27, 5, '512GB', NULL, '2025-05-12 15:57:52', '2025-05-12 15:57:52'),
(28, 6, '16GB', NULL, '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(29, 6, '32GB', NULL, '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(30, 7, '512GB', NULL, '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(31, 7, '1TB', NULL, '2025-05-20 08:30:01', '2025-05-20 08:30:01'),
(32, 6, '8GB', NULL, '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(33, 7, '256GB', NULL, '2025-05-20 08:36:09', '2025-05-20 08:36:09'),
(34, 8, 'Body Only', NULL, '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(35, 8, 'Kit 18-150mm', NULL, '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(36, 9, '12 tháng', NULL, '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(37, 9, '24 tháng', NULL, '2025-05-20 12:54:12', '2025-05-20 12:54:12'),
(38, 7, '2TB', NULL, '2025-05-20 13:21:36', '2025-05-20 13:21:36'),
(39, 6, '12GB', NULL, '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(40, 10, '128GB', NULL, '2025-05-20 13:28:07', '2025-05-20 13:28:07'),
(41, 10, '256GB', NULL, '2025-05-20 13:28:07', '2025-05-20 13:28:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bannerdetails`
--
ALTER TABLE `bannerdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `banner_id` (`banner_id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `code` (`code`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsdetails`
--
ALTER TABLE `newsdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `news_id` (`news_id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_discount` (`discount_id`);

--
-- Indexes for table `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `product_variant_values`
--
ALTER TABLE `product_variant_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variant_values`
--
ALTER TABLE `variant_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `bannerdetails`
--
ALTER TABLE `bannerdetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `newsdetails`
--
ALTER TABLE `newsdetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `productimages`
--
ALTER TABLE `productimages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `product_variant_values`
--
ALTER TABLE `product_variant_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `variant_values`
--
ALTER TABLE `variant_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bannerdetails`
--
ALTER TABLE `bannerdetails`
  ADD CONSTRAINT `bannerDetails_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bannerDetails_ibfk_2` FOREIGN KEY (`banner_id`) REFERENCES `banners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartItems_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cartItems_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variant_values` (`id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `discounts_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `discounts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedBacks_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedBacks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `newsdetails`
--
ALTER TABLE `newsdetails`
  ADD CONSTRAINT `newsDetails_ibfk_2` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `newsDetails_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderDetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderDetails_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variant_values` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_discount` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `productimages`
--
ALTER TABLE `productimages`
  ADD CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `product_attribute_values_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_attribute_values_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`);

--
-- Constraints for table `product_variant_values`
--
ALTER TABLE `product_variant_values`
  ADD CONSTRAINT `product_variant_values_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `variant_values`
--
ALTER TABLE `variant_values`
  ADD CONSTRAINT `variant_values_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
