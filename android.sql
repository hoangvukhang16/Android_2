-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 07, 2024 lúc 07:51 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `android`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(186, 39, 22, 3, '2024-11-07 09:23:31', '2024-11-07 09:23:31'),
(187, 39, 24, 1, '2024-11-07 09:24:38', '2024-11-07 09:24:38'),
(188, 39, 9, 1, '2024-11-07 09:24:48', '2024-11-07 09:24:48'),
(189, 39, 9, 1, '2024-11-07 09:26:10', '2024-11-07 09:26:10'),
(215, 46, 26, 1, '2024-11-07 10:00:08', '2024-11-07 10:00:08'),
(218, 46, 30, 1, '2024-11-07 10:07:17', '2024-11-07 10:07:17'),
(219, 47, 25, 1, '2024-11-07 10:12:27', '2024-11-07 10:12:27'),
(220, 47, 26, 1, '2024-11-07 10:12:28', '2024-11-07 10:12:28'),
(221, 47, 26, 3, '2024-11-07 10:12:29', '2024-11-07 10:12:29'),
(222, 47, 28, 3, '2024-11-07 10:16:41', '2024-11-07 10:16:41'),
(223, 47, 23, 1, '2024-11-07 10:25:36', '2024-11-07 10:25:36'),
(224, 47, 26, 1, '2024-11-07 10:29:18', '2024-11-07 10:29:18'),
(228, 46, 32, 1, '2024-11-07 13:01:32', '2024-11-07 13:01:32'),
(230, 46, 36, 1, '2024-11-07 14:13:19', '2024-11-07 14:13:19'),
(231, 49, 20, 1, '2024-11-07 15:11:54', '2024-11-07 15:11:54'),
(232, 49, 19, 1, '2024-11-07 15:11:55', '2024-11-07 15:11:55'),
(233, 49, 19, 5, '2024-11-07 15:11:58', '2024-11-07 15:11:58'),
(234, 49, 23, 3, '2024-11-07 15:12:01', '2024-11-07 15:12:01'),
(237, 46, 37, 1, '2024-11-07 16:07:24', '2024-11-07 16:07:24'),
(238, 46, 37, 3, '2024-11-07 16:07:25', '2024-11-07 16:07:25'),
(240, 46, 26, 1, '2024-11-07 16:15:32', '2024-11-07 16:15:32'),
(244, 50, 9, 1, '2024-11-07 16:16:44', '2024-11-07 16:16:44'),
(245, 50, 10, 1, '2024-11-07 16:16:44', '2024-11-07 16:16:44'),
(246, 50, 11, 1, '2024-11-07 16:16:45', '2024-11-07 16:16:45'),
(247, 50, 12, 1, '2024-11-07 16:16:45', '2024-11-07 16:16:45'),
(248, 50, 13, 1, '2024-11-07 16:16:47', '2024-11-07 16:16:47'),
(249, 50, 14, 1, '2024-11-07 16:16:47', '2024-11-07 16:16:47'),
(250, 50, 15, 1, '2024-11-07 16:16:47', '2024-11-07 16:16:47'),
(251, 50, 16, 1, '2024-11-07 16:16:47', '2024-11-07 16:16:47'),
(252, 50, 16, 1, '2024-11-07 16:16:48', '2024-11-07 16:16:48'),
(253, 50, 9, 1, '2024-11-07 16:19:44', '2024-11-07 16:19:44'),
(254, 50, 17, 1, '2024-11-07 16:19:46', '2024-11-07 16:19:46'),
(255, 50, 9, 1, '2024-11-07 16:19:48', '2024-11-07 16:19:48'),
(256, 46, 10, 1, '2024-11-07 16:45:18', '2024-11-07 16:45:18'),
(261, 46, 36, 1, '2024-11-07 18:34:42', '2024-11-07 18:34:42'),
(262, 46, 30, 1, '2024-11-07 18:34:44', '2024-11-07 18:34:44'),
(263, 46, 30, 1, '2024-11-07 18:34:46', '2024-11-07 18:34:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Quần áo', '2024-11-06 02:09:51', '2024-11-06 02:09:57'),
(2, 'Công cụ', '2024-11-06 02:10:13', '2024-11-06 02:10:13'),
(3, 'Phụ kiện', '2024-11-06 02:10:13', '2024-11-06 02:10:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_details` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `payment_method`, `payment_details`, `status`, `created_at`, `updated_at`) VALUES
(1, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"Khang\",\"phoneNumber\":\"1\",\"address\":\"1\"}', 'pending', '2024-11-07 17:01:17', '2024-11-07 17:01:17'),
(2, 46, 11253000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"momo\"}', 'pending', '2024-11-07 17:01:50', '2024-11-07 17:01:50'),
(3, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"1\",\"phoneNumber\":\"1\",\"address\":\"1\"}', 'pending', '2024-11-07 17:03:05', '2024-11-07 17:03:05'),
(4, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"1\",\"phoneNumber\":\"11\",\"address\":\"\"}', 'pending', '2024-11-07 17:06:20', '2024-11-07 17:06:20'),
(5, 46, 11253000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"zaloPay\"}', 'pending', '2024-11-07 17:06:46', '2024-11-07 17:06:46'),
(6, 46, 11253000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"zaloPay\"}', 'pending', '2024-11-07 17:39:28', '2024-11-07 17:39:28'),
(7, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"Khang\",\"phoneNumber\":\"1\",\"address\":\"2\"}', 'pending', '2024-11-07 17:42:19', '2024-11-07 17:42:19'),
(8, 46, 11253000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"zaloPay\"}', 'pending', '2024-11-07 17:43:14', '2024-11-07 17:43:14'),
(9, 46, 11253000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"momo\"}', 'pending', '2024-11-07 17:45:01', '2024-11-07 17:45:01'),
(10, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"Khang\",\"phoneNumber\":\"0366511124\",\"address\":\"Quang Ngai\"}', 'pending', '2024-11-07 17:52:39', '2024-11-07 17:52:39'),
(11, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"\",\"phoneNumber\":\"\",\"address\":\"\"}', 'pending', '2024-11-07 17:54:06', '2024-11-07 17:54:06'),
(12, 46, 11253000.00, 'cashOnDelivery', '{\"fullName\":\"Haha\",\"phoneNumber\":\"Ioo\",\"address\":\"Iii\"}', 'pending', '2024-11-07 18:01:57', '2024-11-07 18:01:57'),
(13, 46, 10964000.00, 'bank', '{\"cardNumber\":\"Khang\",\"expiry\":\"727227\",\"cvv\":\"W72727\"}', 'pending', '2024-11-07 18:15:18', '2024-11-07 18:15:18'),
(14, 46, 11529000.00, 'cashOnDelivery', '{\"fullName\":\"Khang\",\"phoneNumber\":\"2\",\"address\":\"7\"}', 'pending', '2024-11-07 18:26:25', '2024-11-07 18:26:25'),
(15, 46, 7152000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"momo\"}', 'pending', '2024-11-07 18:45:09', '2024-11-07 18:45:09'),
(16, 46, 7152000.00, 'cashOnDelivery', '{\"fullName\":\"\",\"phoneNumber\":\"\",\"address\":\"\"}', 'pending', '2024-11-07 18:45:13', '2024-11-07 18:45:13'),
(17, 46, 7152000.00, 'eWallet', '{\"walletId\":\"\",\"selectedWallet\":\"zaloPay\"}', 'pending', '2024-11-07 18:48:44', '2024-11-07 18:48:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 5, 21, 1, 1600000.00),
(2, 5, 22, 1, 800000.00),
(3, 5, 23, 1, 750000.00),
(4, 5, 24, 2, 710000.00),
(5, 5, 26, 2, 700000.00),
(6, 5, 30, 1, 532000.00),
(7, 5, 32, 1, 150000.00),
(8, 5, 36, 1, 123000.00),
(9, 5, 37, 4, 895000.00),
(10, 5, 10, 1, 180000.00),
(11, 5, 9, 1, 429000.00),
(12, 5, 17, 1, 289000.00),
(13, 6, 21, 1, 1600000.00),
(14, 6, 22, 1, 800000.00),
(15, 6, 23, 1, 750000.00),
(16, 6, 24, 2, 710000.00),
(17, 6, 26, 2, 700000.00),
(18, 6, 30, 1, 532000.00),
(19, 6, 32, 1, 150000.00),
(20, 6, 36, 1, 123000.00),
(21, 6, 37, 4, 895000.00),
(22, 6, 10, 1, 180000.00),
(23, 6, 9, 1, 429000.00),
(24, 6, 17, 1, 289000.00),
(25, 7, 21, 1, 1600000.00),
(26, 7, 22, 1, 800000.00),
(27, 7, 23, 1, 750000.00),
(28, 7, 24, 2, 710000.00),
(29, 7, 26, 2, 700000.00),
(30, 7, 30, 1, 532000.00),
(31, 7, 32, 1, 150000.00),
(32, 7, 36, 1, 123000.00),
(33, 7, 37, 4, 895000.00),
(34, 7, 10, 1, 180000.00),
(35, 7, 9, 1, 429000.00),
(36, 7, 17, 1, 289000.00),
(37, 8, 21, 1, 1600000.00),
(38, 8, 22, 1, 800000.00),
(39, 8, 23, 1, 750000.00),
(40, 8, 24, 2, 710000.00),
(41, 8, 26, 2, 700000.00),
(42, 8, 30, 1, 532000.00),
(43, 8, 32, 1, 150000.00),
(44, 8, 36, 1, 123000.00),
(45, 8, 37, 4, 895000.00),
(46, 8, 10, 1, 180000.00),
(47, 8, 9, 1, 429000.00),
(48, 8, 17, 1, 289000.00),
(49, 9, 21, 1, 1600000.00),
(50, 9, 22, 1, 800000.00),
(51, 9, 23, 1, 750000.00),
(52, 9, 24, 2, 710000.00),
(53, 9, 26, 2, 700000.00),
(54, 9, 30, 1, 532000.00),
(55, 9, 32, 1, 150000.00),
(56, 9, 36, 1, 123000.00),
(57, 9, 37, 4, 895000.00),
(58, 9, 10, 1, 180000.00),
(59, 9, 9, 1, 429000.00),
(60, 9, 17, 1, 289000.00),
(61, 10, 21, 1, 1600000.00),
(62, 10, 22, 1, 800000.00),
(63, 10, 23, 1, 750000.00),
(64, 10, 24, 2, 710000.00),
(65, 10, 26, 2, 700000.00),
(66, 10, 30, 1, 532000.00),
(67, 10, 32, 1, 150000.00),
(68, 10, 36, 1, 123000.00),
(69, 10, 37, 4, 895000.00),
(70, 10, 10, 1, 180000.00),
(71, 10, 9, 1, 429000.00),
(72, 10, 17, 1, 289000.00),
(73, 11, 21, 1, 1600000.00),
(74, 11, 22, 1, 800000.00),
(75, 11, 23, 1, 750000.00),
(76, 11, 24, 2, 710000.00),
(77, 11, 26, 2, 700000.00),
(78, 11, 30, 1, 532000.00),
(79, 11, 32, 1, 150000.00),
(80, 11, 36, 1, 123000.00),
(81, 11, 37, 4, 895000.00),
(82, 11, 10, 1, 180000.00),
(83, 11, 9, 1, 429000.00),
(84, 11, 17, 1, 289000.00),
(85, 12, 21, 1, 1600000.00),
(86, 12, 22, 1, 800000.00),
(87, 12, 23, 1, 750000.00),
(88, 12, 24, 2, 710000.00),
(89, 12, 26, 2, 700000.00),
(90, 12, 30, 1, 532000.00),
(91, 12, 32, 1, 150000.00),
(92, 12, 36, 1, 123000.00),
(93, 12, 37, 4, 895000.00),
(94, 12, 10, 1, 180000.00),
(95, 12, 9, 1, 429000.00),
(96, 12, 17, 1, 289000.00),
(97, 13, 21, 1, 1600000.00),
(98, 13, 22, 1, 800000.00),
(99, 13, 23, 1, 750000.00),
(100, 13, 24, 2, 710000.00),
(101, 13, 26, 2, 700000.00),
(102, 13, 30, 1, 532000.00),
(103, 13, 32, 1, 150000.00),
(104, 13, 36, 1, 123000.00),
(105, 13, 37, 4, 895000.00),
(106, 13, 10, 1, 180000.00),
(107, 13, 9, 1, 429000.00),
(108, 14, 21, 1, 1600000.00),
(109, 14, 22, 1, 800000.00),
(110, 14, 23, 1, 750000.00),
(111, 14, 24, 2, 710000.00),
(112, 14, 26, 2, 700000.00),
(113, 14, 30, 1, 532000.00),
(114, 14, 32, 1, 150000.00),
(115, 14, 36, 1, 123000.00),
(116, 14, 37, 4, 895000.00),
(117, 14, 10, 1, 180000.00),
(118, 14, 9, 1, 429000.00),
(119, 14, 35, 1, 245000.00),
(120, 14, 14, 1, 320000.00),
(121, 15, 26, 2, 700000.00),
(122, 15, 30, 3, 532000.00),
(123, 15, 32, 1, 150000.00),
(124, 15, 36, 2, 123000.00),
(125, 15, 37, 4, 895000.00),
(126, 15, 10, 1, 180000.00),
(127, 16, 26, 2, 700000.00),
(128, 16, 30, 3, 532000.00),
(129, 16, 32, 1, 150000.00),
(130, 16, 36, 2, 123000.00),
(131, 16, 37, 4, 895000.00),
(132, 16, 10, 1, 180000.00),
(133, 17, 26, 2, 700000.00),
(134, 17, 30, 3, 532000.00),
(135, 17, 32, 1, 150000.00),
(136, 17, 36, 2, 123000.00),
(137, 17, 37, 4, 895000.00),
(138, 17, 10, 1, 180000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(15,0) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `category_id`, `title`, `price`, `description`, `image`) VALUES
(9, 1, 'Áo Hoodie Thể Thao Shamdi Unisex Already Pullover', 429000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/3_58771700ed43440aab4522aef74b1ed8.jpg'),
(10, 1, 'Quần Legging Đùi Nam Shamdi', 180000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/legging-nam-1_218d4a76436e41d8a130a3bb594106ed.jpg'),
(11, 1, 'Quần Legging Nam Shamdi Dài', 250000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/quan-legging-nam__3__b62e58e49bc2453488adf63233426dfd.jpg'),
(12, 1, 'Quần Short 1 Lớp Thể Thao Nam Shamdi Casual', 270000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/quan-short-shamdi4-min_5265184993d544dcab4c2956d98700c8.png'),
(13, 1, 'Quần Short Nam 1 Lớp Summer Cooling', 319000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/4_d762c70957a94556845f3cab4d936bf0.jpg'),
(14, 1, 'Áo Khoác Nam Essential', 320000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/11_4a1e75f88ff24710ba71b18a82b95ed5.jpg'),
(15, 1, 'Áo Khoác Gió Nam 2 Lớp Thể Thao', 429000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/ao-khoac-2-lop-nam-the-thao-chong-nang-mua-2_cd2fb405e5c741cab77a6e802f351497.jpeg'),
(16, 1, 'Quần Short Nam Outdoor 2 in 1', 250000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/c9d9144b-03e6-4362-a710-2fcadeba5b1e_781b67541a4f4d62a53a15e7788ca0fc.jpeg'),
(17, 1, 'Áo Thể Thao Nam Ngắn Tay Reform', 289000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/z5584726983753_69635345dd7351871bd3735e0e111241_b6d4c1a4048e44b49c86cdfce2ab23ce.jpg'),
(18, 1, 'Tất Thể Thao Cao Cấp Chống Hôi Chân', 30000, 'Mua 2 SP cùng loại giảm thêm 5%\r\nFreeship với đơn hàng từ 349.000đ\r\n60 Ngày đổi trả mọi lý do\r\n365 Ngày bảo hành sản phẩm\r\nÁp dụng thêm mã ƯU ĐÃI để tiết kiệm hơn', 'https://product.hstatic.net/200000602133/product/tat-the-thao-shamdi-3_1c88b321f11b4b76b8d42cd9a2a22e24.jpg'),
(19, 2, 'Vợt Pickleball Joola Ben Johns Hyperion CFS 14', 5500000, 'Trọng lượng nhẹ chỉ 221g\r\nBề mặt vợt làm từ sợi carbon-flex5\r\nĐộ dày 14mm cho lực bật tốt \r\nTay cầm thoải mái \r\nCân bằng cả sức mạnh và khả năng kiểm soát\r\nĐược USAPA chấp thuận để chơi trong giải đấu.', 'https://bizweb.dktcdn.net/100/011/344/products/vot-picklaball-joola-ben-johns-hyperion-14-gymstore.jpg?v=1725851009063'),
(20, 2, 'Máy giãn cơ OstroVit Massage Gun OMG-01', 1850000, '30 chế độ hoạt động khác nhau\r\n6 đầu mát xa đa năng\r\nGiúp giãn cơ, giảm căng cứng, đau nhức\r\nTăng cường lưu thông máu\r\nDễ dàng sử dụng', 'https://bizweb.dktcdn.net/100/011/344/products/may-gian-co-ostrovit-massage-gun-900x900-1.jpg?v=1678672906177'),
(21, 2, 'HT Apparel Lever Belt - Đai lưng tập Gym Khóa Lẫy', 1600000, 'Đai khóa Lever cơ chế đóng / mở nhanh\r\nĐộ dày 12 mm\r\nChất liệu: Velvet/ Satin\r\nHỗ trợ vùng cơ trọng tâm\r\nAn toàn khi tập luyện\r\nMàu sắc: Đỏ / Đen ', 'https://bizweb.dktcdn.net/100/011/344/products/vn-11134207-7qukw-lhcdefvq7inmad.jpg?v=1689847482670'),
(22, 2, 'Đai lưng Gofit Leather Lifting Belt, 6 Inch', 800000, 'Comfortable and durable, the GoFit 6\" Leather Weightlifting Belt is the tool you need to protect your back and promote proper lifting.', 'https://bizweb.dktcdn.net/100/011/344/products/screen-shot-2019-04-24-at-1-09-36-pm.png?v=1556086314650'),
(23, 2, 'Harbinger Red Line Knee Wraps, 78\'\' (200 cm)', 750000, 'Dây quấn đầu gối chính hãng Harbinger hỗ trợ cố định đầu gối, giảm chấn thương khi tập luyện', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/011/344/products/harbinger-red-line-knee-wraps.jpg?v=1472810123250'),
(24, 2, 'Harbinger Training Grip Wristwrap Weightlifting Gloves, Full Black', 710000, 'Găng tay nâng tạ Hanbinger Training Grip chính hãng\r\nHỗ trợ nâng tạ, bảo vệ cổ tay\r\nThiết kế linh hoạt dễ vận động\r\nLớp đệm TechDel bảo vệ tối đa\r\nDây buộc cổ tay dạng móc dán chắc chắn', 'https://bizweb.dktcdn.net/100/011/344/products/harbinger-training-grip-wristwrap-weightlifting-gloves-full-black-gymstore-2-jpeg.jpg?v=1715323994673'),
(25, 2, 'Harbinger Flexfit Contour Belt Red, 6 inch', 710000, 'Đai lưng tập gym chính hãng, nhập khẩu hiệu Harbinger. ', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/011/344/products/harbinger-flexfit-contour-belt-red-6-inch.jpg?v=1553530322737'),
(26, 2, 'Lót tạ - Harbinger Ergofit Bar Pad, 15 inch', 700000, 'Thanh đỡ vai lót tạ đòn cao cấp Harbinger, nhập khẩu chính hãng. Hỗ trợ tập Squat không gây đau.', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/011/344/products/harbinger-ergofit-bar-pad-15-inch.jpg?v=1553530463197'),
(27, 2, 'Bình giữ nhiệt Revomax Inox 316L, 473 ml', 699000, 'FDA Hoa Kỳ chứng nhận chất lượng.\r\nNắp chai được thiết kế đặc biệt: Công nghệ Twist-Free với 3 điểm chạm \r\nSiêu chống tràn có thể xoay bình 360 độ mà không lo rò rỉ.\r\nGiữ nhiệt số 1: 36 giờ lạnh và 18h nóng.\r\nChống sốc nhiệt khi cầm trên tay\r\nChịu được va đập tương đối.\r\nVan xả khí: thoải mái đựng được mọi đồ uống như bia hơi, nước có gas', 'https://bizweb.dktcdn.net/100/011/344/products/binh-giu-nhiet-gozen-revomax-onyx-black-gymstore.jpg?v=1723434799430'),
(28, 2, 'Dầu mầu thi đấu Dream Tan, 2 Oz', 699000, 'For Instant Skin Color!\r\n\r\nMoisturizes Your Skin With Every Application!', 'https://bizweb.dktcdn.net/100/011/344/products/acd8b79f-781e-466e-8c94-300e83a940b1.jpg?v=1629104829827'),
(29, 3, 'Bộ Tạ Tập Gym Body Sculpture Smart Dumbbell Tower - Nhiều Màu', 532000, 'Dụng Cụ Tập GymSKU BW-108T-19KG-M', 'https://supersports.com.vn/cdn/shop/products/BW-108T-19KG-M-1.png?v=1668162896&width=1920'),
(30, 3, 'Bánh Xe Tập Thể Thao Body Sculpture Exercise Wheel - Đen', 532000, 'Dụng Cụ Tập GymSKU BB-703DEB-B', 'https://supersports.com.vn/cdn/shop/products/BB-703DEB-B-1_3b655470-7c7a-4bc8-89a1-4ed8b43d325a.jpg?v=1668162590'),
(31, 3, 'Dây Nhảy Giảm Cân Ptp Power - Đen', 765000, 'Dụng Cụ Tập GymSKU WTR1', 'https://supersports.com.vn/cdn/shop/products/WTR1-1_d0adc133-c200-4714-bdc3-4b249c0410fa.jpg?v=1673951141&width=1920'),
(32, 3, 'Dụng Cụ Hít Đất Body Sculpture Push Up Bar - Đen', 150000, 'Dụng Cụ Tập GymSKU BB-6331EG-B', 'https://supersports.com.vn/cdn/shop/products/BB-6331EG-B-1_4330deae-9a32-4e46-a117-2fb34554cda2.jpg?v=1668161230&width=1920'),
(33, 3, 'Dây Tập Cổ Chân Ptp Elite Ankle Straps - Đen', 329000, 'Dụng Cụ Tập GymSKU PTP E8', 'https://supersports.com.vn/cdn/shop/products/PTPE8-1.jpg?v=1673949956&width=1920'),
(34, 3, 'Bục Tập Aerobic Body Sculpture Aerobic Stepper - Đen', 329000, 'Dụng Cụ Tập GymSKU BSB-580N', 'https://supersports.com.vn/cdn/shop/products/BSB-580N-1.jpg?v=1700105812&width=1200'),
(35, 3, 'Xà Đơn Treo Tường Body Sculpture Doorway Gym Bar - Đen', 245000, 'Dụng Cụ Tập GymSKU BB-262L-B', 'https://supersports.com.vn/cdn/shop/products/BB-262L-B-1.jpg?v=1668161295&width=1920'),
(36, 3, 'Túi Đeo Cánh Tay Body Sculpture Arm Wallet - Đen', 123000, 'Dụng Cụ Tập GymSKU BP-207-H', 'https://supersports.com.vn/cdn/shop/products/BP-207-H-1_6ad6a677-0006-4b67-8dac-8c8b704eaa6c.jpg?v=1668161203&width=1920'),
(37, 3, 'Tạ Có Quai 10Kg Body Sculpture - Cam', 895000, 'Dụng Cụ Tập GymSKU BW-111IN-10KG', 'https://supersports.com.vn/cdn/shop/products/BW-111IN-10KG-1.jpg?v=1703644905&width=1920'),
(38, 3, 'Lò Xo Bóp Tập Ngón Tay Ptp - Đen', 405000, 'Dụng Cụ Tập GymSKU SG1', 'https://supersports.com.vn/cdn/shop/products/SG1-1_6d6e859a-5d1b-475b-91eb-7bbe0cc33bd5.jpg?v=1673950651&width=1920');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`) VALUES
(39, 'Khang', 'khang', '$2b$10$V5kezQ3LfuSPWXJ4NlMKDOs1JY1W0kgp38mQyp..msaIy1O8M2dMu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImVtYWlsIjoia2hhbmciLCJpYXQiOjE3MzA5NzEyNTYsImV4cCI6MTczMDk3NDg1Nn0.Dhu0OP6ybvlwuBj9Jp9S7BAgGcTrTdegwugusOEAKVU'),
(40, 'Ab', 'ab', '$2b$10$PaB.2gTq3cuoLLsIlfiUWeFels9ZH9.w59u3/5.lqn/00Y3/fDPjG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiIiwiaWF0IjoxNzMwOTY4NzQ4LCJleHAiOjE3MzA5NzIzNDh9.H4gXJNy5CRHG5JkXzc2FFJkdZrEK9cR4D4gOacecVLE'),
(45, 'A', '1', '$2b$10$zGSWjAZODU.G18ZLFpxbfuM4GQf5G7tb/zRHbnpS8nNbKTpDD8hzO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImVtYWlsIjoiMSIsImlhdCI6MTczMDk5NjExMCwiZXhwIjoxNzMwOTk5NzEwfQ.OtnPSMe_gzqK2PQkCfv256KrfHt28HrB6GDjWyujE8o'),
(46, 'A', 'a', '$2b$10$lai3scmc5yAxewWVtLo/fOmelX6JQICJQSAkUdANXk3tfEE0SdaWO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImVtYWlsIjoiYSIsImlhdCI6MTczMTAwNTI5OCwiZXhwIjoxNzMxMDA4ODk4fQ.g1AqxmYFLgRBwDItcGNdO4kVESAgQZwfhIVfO7UPFdw'),
(47, 'b', 'b', '$2b$10$bNuKEeMel5BgCukr1qIX9uq0rW3r3WyTDUsVv1Z1SxbnG4gO.WCQS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImVtYWlsIjoiYiIsImlhdCI6MTczMDk3NDMzOCwiZXhwIjoxNzMwOTc3OTM4fQ.sE1ER23YTTcuvbBVw9-ePUjMAH4INAru5oXVcrCp49k'),
(48, 'Hoàng Vũ Khang', 'hoangvukhang', '$2b$10$9cYrNJ2hMlnoN198EXt5kOyazXaKANyEnMaDHsw1ZMOdMtrmp62YS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImVtYWlsIjoiaG9hbmd2dWtoYW5nIiwiaWF0IjoxNzMwOTk1NTk2LCJleHAiOjE3MzA5OTkxOTZ9.6SPlYOecyoVYiowp0IHrsuB23OPfHp3Xql-3dek3cZQ'),
(49, 'Hoàng Vũ Khang', 'hoangvukhang100@gmail.com', '$2b$10$Fn2n6KeK2IwK1EtYRLAe2Ot9cCRuOboVvGvy5IqryQWj8h/k6pJkG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImVtYWlsIjoiaG9hbmd2dWtoYW5nMTAwQGdtYWlsLmNvbSIsImlhdCI6MTczMDk5NTc4NiwiZXhwIjoxNzMwOTk5Mzg2fQ.eYLrXaURt48_K7VM7Z7zCmZT-nRhrrncd5tL8AHHOuM'),
(50, 'Cc', 'cc', '$2b$10$12.cVR5/biB9M6Yj5gREoOjzH/NkrBCnO6UjnqLntJAYVdwFUVa4G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImVtYWlsIjoiY2MiLCJpYXQiOjE3MzA5OTYzODIsImV4cCI6MTczMDk5OTk4Mn0.DW94lv9DJ1rvn0ieyv_RO07PLQ1_Sev1u_n8HUZuTIg');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
