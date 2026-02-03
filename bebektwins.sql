-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 03, 2026 at 05:42 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bebektwins`
--

-- --------------------------------------------------------

--
-- Table structure for table `catatan_harian`
--

CREATE TABLE `catatan_harian` (
  `id` int NOT NULL,
  `tanggal` date NOT NULL,
  `id_kelompok` int DEFAULT NULL,
  `telur_total` int DEFAULT '0',
  `telur_bagus` int DEFAULT '0',
  `telur_rusak` int DEFAULT '0',
  `pakan_terpakai_kg` decimal(10,2) DEFAULT '0.00',
  `kematian` int DEFAULT '0',
  `catatan` text,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kelompok_ternak`
--

CREATE TABLE `kelompok_ternak` (
  `id` int NOT NULL,
  `nama_kelompok` varchar(100) NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `jumlah_awal` int NOT NULL,
  `jumlah_saat_ini` int NOT NULL,
  `jenis_bebek` varchar(50) DEFAULT NULL,
  `umur_minggu` int DEFAULT '0',
  `status` enum('aktif','terjual','afkir') DEFAULT 'aktif',
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kelompok_ternak`
--

INSERT INTO `kelompok_ternak` (`id`, `nama_kelompok`, `tanggal_masuk`, `jumlah_awal`, `jumlah_saat_ini`, `jenis_bebek`, `umur_minggu`, `status`, `dibuat_pada`) VALUES
(1, 'Batch A - Kandang Depan', '2026-02-03', 100, 100, 'Mojosari Petelur', 18, 'aktif', '2026-02-02 16:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `keuangan`
--

CREATE TABLE `keuangan` (
  `id` int NOT NULL,
  `tanggal_transaksi` date NOT NULL,
  `jenis` enum('pemasukan','pengeluaran') NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `jumlah_uang` decimal(15,2) NOT NULL,
  `keterangan` text,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `keuangan`
--

INSERT INTO `keuangan` (`id`, `tanggal_transaksi`, `jenis`, `kategori`, `jumlah_uang`, `keterangan`, `dibuat_pada`) VALUES
(1, '2026-02-03', 'pengeluaran', 'Beli Pakan', 425000.00, 'Beli Konsentrat 1 Sak 50kg', '2026-02-02 16:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `livestock_batches`
--

CREATE TABLE `livestock_batches` (
  `id` int NOT NULL,
  `batch_name` varchar(100) NOT NULL,
  `arrival_date` date NOT NULL,
  `initial_count` int NOT NULL,
  `current_count` int NOT NULL,
  `breed` varchar(50) DEFAULT NULL,
  `age_weeks` int DEFAULT '0',
  `status` enum('active','sold','culled') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `livestock_batches`
--

INSERT INTO `livestock_batches` (`id`, `batch_name`, `arrival_date`, `initial_count`, `current_count`, `breed`, `age_weeks`, `status`, `created_at`) VALUES
(1, 'Batch A - Kandang Depan', '2026-02-02', 100, 100, 'Mojosari Petelur', 18, 'active', '2026-02-02 15:59:21');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category`, `image_url`, `stock`, `created_at`) VALUES
(1, 'Telur Asin Spesial', 'Telur asin masir berminyak dengan kualitas terbaik, dijamin gurih dan lezat.', 5000.00, 'Telur', '../assets/asin.jpg', 100, '2026-02-03 17:29:39'),
(2, 'Telur Bebek Segar (Grade A)', 'Telur bebek segar pilihan, cangkang tebal dan kuning telur berwarna oranye pekat.', 3500.00, 'Telur', '../assets/gambar1.png', 250, '2026-02-03 17:29:39'),
(3, 'Telur Bebek Mentah (Grosir)', 'Paket telur bebek mentah isi 30 butir (1 tray), cocok untuk usaha martabak atau jamu.', 95000.00, 'Telur', 'https://images.unsplash.com/photo-1627589926887-13589b883023?auto=format&fit=crop&q=80&w=300&h=300', 50, '2026-02-03 17:29:39'),
(4, 'Bebek Afkir Potong', 'Daging bebek afkir segar, cocok untuk olahan rica-rica atau bebek goreng.', 45000.00, 'Daging', 'https://images.unsplash.com/photo-1605494209539-7221e7844093?auto=format&fit=crop&q=80&w=300&h=300', 20, '2026-02-03 17:29:39'),
(5, 'Kotoran Bebek Kering (Pupuk)', 'Pupuk organik dari kotoran bebek yang sudah dikeringkan, bagus untuk tanaman.', 15000.00, 'Limbah', 'https://plus.unsplash.com/premium_photo-1678743179262-b913d8b12273?auto=format&fit=crop&q=80&w=300&h=300', 50, '2026-02-03 17:29:39');

-- --------------------------------------------------------

--
-- Table structure for table `stok_pakan`
--

CREATE TABLE `stok_pakan` (
  `id` int NOT NULL,
  `nama_pakan` varchar(100) NOT NULL,
  `stok_kg` decimal(10,2) DEFAULT '0.00',
  `harga_per_kg` decimal(10,2) DEFAULT '0.00',
  `terakhir_diupdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stok_pakan`
--

INSERT INTO `stok_pakan` (`id`, `nama_pakan`, `stok_kg`, `harga_per_kg`, `terakhir_diupdate`) VALUES
(1, 'Konsentrat 144', 50.00, 8500.00, '2026-02-02 16:01:57'),
(2, 'Dedak Halus', 100.00, 3500.00, '2026-02-02 16:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'admin', '$2y$10$Fsa.oeLdognMqj5C2gIlT.bJywnWk6ri8xipa0YW.boCtnxDDjroq', 'admin', '2026-02-02 15:39:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catatan_harian`
--
ALTER TABLE `catatan_harian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kelompok` (`id_kelompok`);

--
-- Indexes for table `kelompok_ternak`
--
ALTER TABLE `kelompok_ternak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keuangan`
--
ALTER TABLE `keuangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `livestock_batches`
--
ALTER TABLE `livestock_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stok_pakan`
--
ALTER TABLE `stok_pakan`
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
-- AUTO_INCREMENT for table `catatan_harian`
--
ALTER TABLE `catatan_harian`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelompok_ternak`
--
ALTER TABLE `kelompok_ternak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `keuangan`
--
ALTER TABLE `keuangan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `livestock_batches`
--
ALTER TABLE `livestock_batches`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stok_pakan`
--
ALTER TABLE `stok_pakan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `catatan_harian`
--
ALTER TABLE `catatan_harian`
  ADD CONSTRAINT `catatan_harian_ibfk_1` FOREIGN KEY (`id_kelompok`) REFERENCES `kelompok_ternak` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
