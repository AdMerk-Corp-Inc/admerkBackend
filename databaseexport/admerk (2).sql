-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 21, 2023 at 02:12 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admerk`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `isoCode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phoneCode` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `isoCode`, `name`, `phoneCode`, `currency`) VALUES
(1, 'AF', 'Afghanistan', '93', 'AFN'),
(2, 'AL', 'Albania', '355', 'ALL'),
(3, 'DZ', 'Algeria', '213', 'DZD'),
(4, 'AS', 'American Samoa', '1684', 'USD'),
(5, 'AD', 'Andorra', '376', 'EUR'),
(6, 'AO', 'Angola', '244', 'AOA'),
(7, 'AI', 'Anguilla', '1264', 'XCD'),
(8, 'AQ', 'Antarctica', '0', ''),
(9, 'AG', 'Antigua And Barbuda', '1268', 'XCD'),
(10, 'AR', 'Argentina', '54', 'ARS'),
(11, 'AM', 'Armenia', '374', 'AMD'),
(12, 'AW', 'Aruba', '297', 'AWG'),
(13, 'AU', 'Australia', '61', 'AUD'),
(14, 'AT', 'Austria', '43', 'EUR'),
(15, 'AZ', 'Azerbaijan', '994', 'AZN'),
(16, 'BS', 'Bahamas The', '1242', 'BSD'),
(17, 'BH', 'Bahrain', '973', 'BHD'),
(18, 'BD', 'Bangladesh', '880', 'BDT'),
(19, 'BB', 'Barbados', '1246', 'BBD'),
(20, 'BY', 'Belarus', '375', 'BYN'),
(21, 'BE', 'Belgium', '32', 'EUR'),
(22, 'BZ', 'Belize', '501', 'BZD'),
(23, 'BJ', 'Benin', '229', 'XOF'),
(24, 'BM', 'Bermuda', '1441', 'BMD'),
(25, 'BT', 'Bhutan', '975', 'BTN'),
(26, 'BO', 'Bolivia', '591', 'BOB'),
(27, 'BA', 'Bosnia and Herzegovina', '387', 'BAM'),
(28, 'BW', 'Botswana', '267', 'BWP'),
(29, 'BV', 'Bouvet Island', '0', 'NOK'),
(30, 'BR', 'Brazil', '55', 'BRL'),
(31, 'IO', 'British Indian Ocean Territory', '246', 'USD'),
(32, 'BN', 'Brunei', '673', 'BND'),
(33, 'BG', 'Bulgaria', '359', 'BGN'),
(34, 'BF', 'Burkina Faso', '226', 'XOF'),
(35, 'BI', 'Burundi', '257', 'BIF'),
(36, 'KH', 'Cambodia', '855', 'KHR'),
(37, 'CM', 'Cameroon', '237', 'XAF'),
(38, 'CA', 'Canada', '1', 'CAD'),
(39, 'CV', 'Cape Verde', '238', 'CVE'),
(40, 'KY', 'Cayman Islands', '1345', 'KYD'),
(41, 'CF', 'Central African Republic', '236', 'XAF'),
(42, 'TD', 'Chad', '235', 'XAF'),
(43, 'CL', 'Chile', '56', 'CLP'),
(44, 'CN', 'China', '86', 'CNY'),
(45, 'CX', 'Christmas Island', '61', 'AUD'),
(46, 'CC', 'Cocos (Keeling) Islands', '672', 'AUD'),
(47, 'CO', 'Colombia', '57', 'COP'),
(48, 'KM', 'Comoros', '269', 'KMF'),
(49, 'CG', 'Republic Of The Congo', '242', 'XAF'),
(50, 'CD', 'Democratic Republic Of The Congo', '242', 'CDF'),
(51, 'CK', 'Cook Islands', '682', 'NZD'),
(52, 'CR', 'Costa Rica', '506', 'CRC'),
(53, 'CI', 'Cote D\'Ivoire (Ivory Coast)', '225', 'XOF'),
(54, 'HR', 'Croatia (Hrvatska)', '385', 'HRK'),
(55, 'CU', 'Cuba', '53', 'CUP'),
(56, 'CY', 'Cyprus', '357', 'EUR'),
(57, 'CZ', 'Czech Republic', '420', 'CZK'),
(58, 'DK', 'Denmark', '45', 'DKK'),
(59, 'DJ', 'Djibouti', '253', 'DJF'),
(60, 'DM', 'Dominica', '1767', 'XCD'),
(61, 'DO', 'Dominican Republic', '1809', 'DOP'),
(62, 'TP', 'East Timor', '670', ''),
(63, 'EC', 'Ecuador', '593', 'USD'),
(64, 'EG', 'Egypt', '20', 'EGP'),
(65, 'SV', 'El Salvador', '503', 'USD'),
(66, 'GQ', 'Equatorial Guinea', '240', 'XAF'),
(67, 'ER', 'Eritrea', '291', 'ERN'),
(68, 'EE', 'Estonia', '372', 'EUR'),
(69, 'ET', 'Ethiopia', '251', 'ETB'),
(70, 'XA', 'External Territories of Australia', '61', ''),
(71, 'FK', 'Falkland Islands', '500', 'FKP'),
(72, 'FO', 'Faroe Islands', '298', 'DKK'),
(73, 'FJ', 'Fiji Islands', '679', 'FJD'),
(74, 'FI', 'Finland', '358', 'EUR'),
(75, 'FR', 'France', '33', 'EUR'),
(76, 'GF', 'French Guiana', '594', 'EUR'),
(77, 'PF', 'French Polynesia', '689', 'XPF'),
(78, 'TF', 'French Southern Territories', '0', 'EUR'),
(79, 'GA', 'Gabon', '241', 'XAF'),
(80, 'GM', 'Gambia The', '220', 'GMD'),
(81, 'GE', 'Georgia', '995', 'GEL'),
(82, 'DE', 'Germany', '49', 'EUR'),
(83, 'GH', 'Ghana', '233', 'GHS'),
(84, 'GI', 'Gibraltar', '350', 'GIP'),
(85, 'GR', 'Greece', '30', 'EUR'),
(86, 'GL', 'Greenland', '299', 'DKK'),
(87, 'GD', 'Grenada', '1473', 'XCD'),
(88, 'GP', 'Guadeloupe', '590', 'EUR'),
(89, 'GU', 'Guam', '1671', 'USD'),
(90, 'GT', 'Guatemala', '502', 'GTQ'),
(91, 'XU', 'Guernsey and Alderney', '44', ''),
(92, 'GN', 'Guinea', '224', 'GNF'),
(93, 'GW', 'Guinea-Bissau', '245', 'XOF'),
(94, 'GY', 'Guyana', '592', 'GYD'),
(95, 'HT', 'Haiti', '509', 'HTG'),
(96, 'HM', 'Heard and McDonald Islands', '0', 'AUD'),
(97, 'HN', 'Honduras', '504', 'HNL'),
(98, 'HK', 'Hong Kong S.A.R.', '852', 'HKD'),
(99, 'HU', 'Hungary', '36', 'HUF'),
(100, 'IS', 'Iceland', '354', 'ISK'),
(101, 'IN', 'India', '91', 'INR'),
(102, 'ID', 'Indonesia', '62', 'IDR'),
(103, 'IR', 'Iran', '98', 'IRR'),
(104, 'IQ', 'Iraq', '964', 'IQD'),
(105, 'IE', 'Ireland', '353', 'EUR'),
(106, 'IL', 'Israel', '972', 'ILS'),
(107, 'IT', 'Italy', '39', 'EUR'),
(108, 'JM', 'Jamaica', '1876', 'JMD'),
(109, 'JP', 'Japan', '81', 'JPY'),
(110, 'XJ', 'Jersey', '44', ''),
(111, 'JO', 'Jordan', '962', 'JOD'),
(112, 'KZ', 'Kazakhstan', '7', 'KZT'),
(113, 'KE', 'Kenya', '254', 'KES'),
(114, 'KI', 'Kiribati', '686', 'AUD'),
(115, 'KP', 'Korea North', '850', 'KPW'),
(116, 'KR', 'Korea South', '82', 'KRW'),
(117, 'KW', 'Kuwait', '965', 'KWD'),
(118, 'KG', 'Kyrgyzstan', '996', 'KGS'),
(119, 'LA', 'Laos', '856', 'LAK'),
(120, 'LV', 'Latvia', '371', 'EUR'),
(121, 'LB', 'Lebanon', '961', 'LBP'),
(122, 'LS', 'Lesotho', '266', 'LSL'),
(123, 'LR', 'Liberia', '231', 'LRD'),
(124, 'LY', 'Libya', '218', 'LYD'),
(125, 'LI', 'Liechtenstein', '423', 'CHF'),
(126, 'LT', 'Lithuania', '370', 'EUR'),
(127, 'LU', 'Luxembourg', '352', 'EUR'),
(128, 'MO', 'Macau S.A.R.', '853', 'MOP'),
(129, 'MK', 'Macedonia', '389', 'MKD'),
(130, 'MG', 'Madagascar', '261', 'MGA'),
(131, 'MW', 'Malawi', '265', 'MWK'),
(132, 'MY', 'Malaysia', '60', 'MYR'),
(133, 'MV', 'Maldives', '960', 'MVR'),
(134, 'ML', 'Mali', '223', 'XOF'),
(135, 'MT', 'Malta', '356', 'EUR'),
(136, 'XM', 'Man (Isle of)', '44', ''),
(137, 'MH', 'Marshall Islands', '692', 'USD'),
(138, 'MQ', 'Martinique', '596', 'EUR'),
(139, 'MR', 'Mauritania', '222', 'MRO'),
(140, 'MU', 'Mauritius', '230', 'MUR'),
(141, 'YT', 'Mayotte', '269', 'EUR'),
(142, 'MX', 'Mexico', '52', 'MXN'),
(143, 'FM', 'Micronesia', '691', 'USD'),
(144, 'MD', 'Moldova', '373', 'MDL'),
(145, 'MC', 'Monaco', '377', 'EUR'),
(146, 'MN', 'Mongolia', '976', 'MNT'),
(147, 'MS', 'Montserrat', '1664', 'XCD'),
(148, 'MA', 'Morocco', '212', 'MAD'),
(149, 'MZ', 'Mozambique', '258', 'MZN'),
(150, 'MM', 'Myanmar', '95', 'MMK'),
(151, 'NA', 'Namibia', '264', 'NAD'),
(152, 'NR', 'Nauru', '674', 'AUD'),
(153, 'NP', 'Nepal', '977', 'NPR'),
(154, 'AN', 'Netherlands Antilles', '599', ''),
(155, 'NL', 'Netherlands The', '31', 'EUR'),
(156, 'NC', 'New Caledonia', '687', 'XPF'),
(157, 'NZ', 'New Zealand', '64', 'NZD'),
(158, 'NI', 'Nicaragua', '505', 'NIO'),
(159, 'NE', 'Niger', '227', 'XOF'),
(160, 'NG', 'Nigeria', '234', 'NGN'),
(161, 'NU', 'Niue', '683', 'NZD'),
(162, 'NF', 'Norfolk Island', '672', 'AUD'),
(163, 'MP', 'Northern Mariana Islands', '1670', 'USD'),
(164, 'NO', 'Norway', '47', 'NOK'),
(165, 'OM', 'Oman', '968', 'OMR'),
(166, 'PK', 'Pakistan', '92', 'PKR'),
(167, 'PW', 'Palau', '680', 'USD'),
(168, 'PS', 'Palestinian Territory Occupied', '970', 'ILS'),
(169, 'PA', 'Panama', '507', 'PAB'),
(170, 'PG', 'Papua new Guinea', '675', 'PGK'),
(171, 'PY', 'Paraguay', '595', 'PYG'),
(172, 'PE', 'Peru', '51', 'PEN'),
(173, 'PH', 'Philippines', '63', 'PHP'),
(174, 'PN', 'Pitcairn Island', '0', 'NZD'),
(175, 'PL', 'Poland', '48', 'PLN'),
(176, 'PT', 'Portugal', '351', 'EUR'),
(177, 'PR', 'Puerto Rico', '1787', 'USD'),
(178, 'QA', 'Qatar', '974', 'QAR'),
(179, 'RE', 'Reunion', '262', 'EUR'),
(180, 'RO', 'Romania', '40', 'RON'),
(181, 'RU', 'Russia', '70', 'RUB'),
(182, 'RW', 'Rwanda', '250', 'RWF'),
(183, 'SH', 'Saint Helena', '290', 'SHP'),
(184, 'KN', 'Saint Kitts And Nevis', '1869', 'XCD'),
(185, 'LC', 'Saint Lucia', '1758', 'XCD'),
(186, 'PM', 'Saint Pierre and Miquelon', '508', 'EUR'),
(187, 'VC', 'Saint Vincent And The Grenadines', '1784', 'XCD'),
(188, 'WS', 'Samoa', '684', 'WST'),
(189, 'SM', 'San Marino', '378', 'EUR'),
(190, 'ST', 'Sao Tome and Principe', '239', 'STD'),
(191, 'SA', 'Saudi Arabia', '966', 'SAR'),
(192, 'SN', 'Senegal', '221', 'XOF'),
(193, 'RS', 'Serbia', '381', 'RSD'),
(194, 'SC', 'Seychelles', '248', 'SCR'),
(195, 'SL', 'Sierra Leone', '232', 'SLL'),
(196, 'SG', 'Singapore', '65', 'SGD'),
(197, 'SK', 'Slovakia', '421', 'EUR'),
(198, 'SI', 'Slovenia', '386', 'EUR'),
(199, 'XG', 'Smaller Territories of the UK', '44', ''),
(200, 'SB', 'Solomon Islands', '677', 'SBD'),
(201, 'SO', 'Somalia', '252', 'SOS'),
(202, 'ZA', 'South Africa', '27', 'ZAR'),
(203, 'GS', 'South Georgia', '0', 'GBP'),
(204, 'SS', 'South Sudan', '211', 'SSP'),
(205, 'ES', 'Spain', '34', 'EUR'),
(206, 'LK', 'Sri Lanka', '94', 'LKR'),
(207, 'SD', 'Sudan', '249', 'SDG'),
(208, 'SR', 'Suriname', '597', 'SRD'),
(209, 'SJ', 'Svalbard And Jan Mayen Islands', '47', 'NOK'),
(210, 'SZ', 'Swaziland', '268', 'SZL'),
(211, 'SE', 'Sweden', '46', 'SEK'),
(212, 'CH', 'Switzerland', '41', 'CHF'),
(213, 'SY', 'Syria', '963', 'SYP'),
(214, 'TW', 'Taiwan', '886', 'TWD'),
(215, 'TJ', 'Tajikistan', '992', 'TJS'),
(216, 'TZ', 'Tanzania', '255', 'TZS'),
(217, 'TH', 'Thailand', '66', 'THB'),
(218, 'TG', 'Togo', '228', 'XOF'),
(219, 'TK', 'Tokelau', '690', 'NZD'),
(220, 'TO', 'Tonga', '676', 'TOP'),
(221, 'TT', 'Trinidad And Tobago', '1868', 'TTD'),
(222, 'TN', 'Tunisia', '216', 'TND'),
(223, 'TR', 'Turkey', '90', 'TRY'),
(224, 'TM', 'Turkmenistan', '7370', 'TMT'),
(225, 'TC', 'Turks And Caicos Islands', '1649', 'USD'),
(226, 'TV', 'Tuvalu', '688', 'AUD'),
(227, 'UG', 'Uganda', '256', 'UGX'),
(228, 'UA', 'Ukraine', '380', 'UAH'),
(229, 'AE', 'United Arab Emirates', '971', 'AED'),
(230, 'GB', 'United Kingdom', '44', 'GBP'),
(231, 'US', 'United States', '1', 'USD'),
(232, 'UM', 'United States Minor Outlying Islands', '1', 'USD'),
(233, 'UY', 'Uruguay', '598', 'UYU'),
(234, 'UZ', 'Uzbekistan', '998', 'UZS'),
(235, 'VU', 'Vanuatu', '678', 'VUV'),
(236, 'VA', 'Vatican City State (Holy See)', '39', 'EUR'),
(237, 'VE', 'Venezuela', '58', 'VEF'),
(238, 'VN', 'Vietnam', '84', 'VND'),
(239, 'VG', 'Virgin Islands (British)', '1284', 'USD'),
(240, 'VI', 'Virgin Islands (US)', '1340', 'USD'),
(241, 'WF', 'Wallis And Futuna Islands', '681', 'XPF'),
(242, 'EH', 'Western Sahara', '212', 'MAD'),
(243, 'YE', 'Yemen', '967', 'YER'),
(244, 'YU', 'Yugoslavia', '38', ''),
(245, 'ZM', 'Zambia', '260', 'ZMW'),
(246, 'ZW', 'Zimbabwe', '263', 'ZWL');

-- --------------------------------------------------------

--
-- Table structure for table `hobbies`
--

CREATE TABLE `hobbies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hobbies`
--

INSERT INTO `hobbies` (`id`, `name`) VALUES
(2, 'Web Designing'),
(3, 'sketching12');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1 COMMENT '1=active,2=unactive',
  `applied_count` varchar(255) DEFAULT '0',
  `cover_picture` varchar(255) DEFAULT NULL,
  `created_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_date` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `attachement` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `status`, `applied_count`, `cover_picture`, `created_date`, `created_by`, `updated_date`, `updated_by`, `skills`, `hobby`, `description`, `attachement`) VALUES
(1, 'new job12', 2, '0', 'uploads/1676900376766-Screenshot 2023-01-28 at 1.04.10 AM.png', '2023-02-20 19:12:03', '1', '2023-02-20 19:12:47', '1', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20230216062053_add_user_table.js', 1, '2023-02-16 01:24:36'),
(2, '20230216064921_add_skills_table.js', 1, '2023-02-16 01:24:36'),
(3, '20230216064934_add_hobby_table.js', 1, '2023-02-16 01:24:36'),
(4, '20230216065238_add_country_table.js', 1, '2023-02-16 01:24:36'),
(5, '20230216074928_add_field_user_table.js', 2, '2023-02-16 02:19:53'),
(6, '20230216105508_add_ticket_table.js', 3, '2023-02-16 08:34:11'),
(7, '20230220125012_add_jobs_table.js', 4, '2023-02-20 07:22:31'),
(8, '20230220132426_add_field_jobs_table.js', 5, '2023-02-20 07:55:17'),
(9, '20230221130509_add_fields_jobs.js', 6, '2023-02-21 07:36:11');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`) VALUES
(2, 'Web Designing'),
(3, 'Graphic Designer');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` int(11) DEFAULT 1 COMMENT '1=open,2=closed',
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `status`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'NEED HELP', 'shshdsdsd', 2, '1', '2023-02-16 19:34:13', '1', '2023-02-16 19:40:30'),
(2, 'first ticket', 'example', 1, '8', '2023-02-18 17:48:54', NULL, NULL),
(3, 'first ticket', 'example', 1, '8', '2023-02-18 17:49:24', NULL, NULL),
(4, 'first ticket', 'example', 1, '8', '2023-02-18 17:49:27', NULL, NULL),
(5, 'first ticket', 'example', 1, '8', '2023-02-18 17:50:20', NULL, NULL),
(6, 'my system is not working', 'issue in my sys', 1, '9', '2023-02-20 19:29:57', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country_id` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `whatsapp_number` varchar(255) DEFAULT NULL,
  `graduation` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `from_usa` int(11) DEFAULT 2 COMMENT '1=yes,2=No',
  `description` text DEFAULT NULL,
  `role` int(11) DEFAULT 4 COMMENT '1=admin,2=volunteer,3=sponsor,4=refugee',
  `status` int(11) DEFAULT 1 COMMENT '1=active,2=not active',
  `created_by` int(11) DEFAULT NULL,
  `created_date` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `country_id`, `country_code`, `country_name`, `dob`, `whatsapp_number`, `graduation`, `skills`, `hobby`, `profile_photo`, `gender`, `from_usa`, `description`, `role`, `status`, `created_by`, `created_date`, `updated_by`, `updated_date`, `password`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, 1, 1, NULL, NULL, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(2, 'Jhon Doe', 'jhon@gmail.com', '1', '93', 'Afghanistan', '19/08/1997', '8562067021', 'BSC', 'software development,python', 'badminton,football', 'uploads/1676536083365-Screenshot 2023-01-31 at 1.45.19 AM.png', 'Male', 1, 'dddshdg\najhjdahdah\nadsadhad\nsdahsgdahsd', 4, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(5, 'web123', 'alihussainkabri52@gmail.com', '101', '91', 'India', '2023-02-16', 'Alihussain', 'Alihussain', 'Web Designing', 'Web Designing', 'uploads/1676553715484-Screenshot 2023-02-03 at 5.01.12 PM.png', 'male', 1, 'sadadasdsa', 4, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(6, 'web123', 'alihussainkabri521@gmail.com', '101', '91', 'India', NULL, '8562', NULL, NULL, NULL, NULL, NULL, 2, NULL, 3, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(7, 'web123', 'dsadad@g.com', NULL, NULL, NULL, NULL, NULL, NULL, 'Web Designing', 'Web Designing', NULL, NULL, 2, NULL, 4, 1, NULL, 2023, NULL, NULL, '25d55ad283aa400af464c76d713c07ad'),
(8, 'idris', 'i@g.com', '101', '91', 'India', '2001-09-01', '9358473253', 'BBA, MLSU', 'Web Designing,Graphic Designer', 'Web Designing', 'uploads/1676720661301-1676361815.png', 'male', 2, 'hello mkawdn klawld kwadjkn mawdnm anmwwd nwa.m a dwwanmd .,m. adkwamd kwad jkjbq dwajkd  adwwad wa k  hello mkawdn klawld kwadjkn mawdnm anmwwd nwa.m a dwwanmd .,m. adkwamd kwad jkjbq dwajkd  adwwad wa k  hello mkawdn klawld kwadjkn mawdnm anmwwd nwa.m a dwwanmd .,m. adkwamd kwad jkjbq dwajkd  adwwad wa k  hello mkawdn klawld kwadjkn mawdnm anmwwd nwa.m a dwwanmd .,m. adkwamd kwad jkjbq dwajkd  adwwad wa k  ', 4, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(9, 'refugee 1', 'refugee1@gmail.com', '101', '91', 'India', '1997-08-20', '8562067021', 'B.tech engineer', 'Web Designing', 'Web Designing', 'uploads/1676901495743-Screenshot 2023-02-03 at 5.01.12 PM.png', 'male', 1, 'dddjajana c\r\n\r\nsaadadas\r\ndad', 4, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(10, 'sponsor1', 'sponsor1@gmail.com', '101', '91', 'India', NULL, '8562067021', NULL, NULL, NULL, NULL, NULL, 2, NULL, 3, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70'),
(11, 'volunteer1', 'volunteer@gmail.com', '101', '91', 'India', NULL, '8562067021', NULL, NULL, NULL, NULL, NULL, 2, NULL, 2, 1, NULL, 2023, NULL, NULL, '202cb962ac59075b964b07152d234b70');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hobbies`
--
ALTER TABLE `hobbies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `hobbies`
--
ALTER TABLE `hobbies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
