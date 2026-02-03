const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bebektwins'
});

connection.connect(err => {
  if (err) {
    console.error("Connection failed:", err);
    return;
  }
  console.log("Connected to MySQL server.");

  const queries = [
    // 0. Drop English tables if exist (Clean up)
    `DROP TABLE IF EXISTS livestock_batches`,
    `DROP TABLE IF EXISTS feed_inventory`,
    `DROP TABLE IF EXISTS daily_logs`,
    `DROP TABLE IF EXISTS transactions`,

    // 1. Tabel Kelompok Ternak (sebelumnya livestock_batches)
    `CREATE TABLE IF NOT EXISTS kelompok_ternak (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_kelompok VARCHAR(100) NOT NULL, -- "Bebek Fase Bayah A"
      tanggal_masuk DATE NOT NULL,
      jumlah_awal INT NOT NULL,
      jumlah_saat_ini INT NOT NULL,
      jenis_bebek VARCHAR(50),             -- "Mojosari", "Hibrida"
      umur_minggu INT DEFAULT 0,
      status ENUM('aktif', 'terjual', 'afkir') DEFAULT 'aktif',
      dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // 2. Tabel Stok Pakan (sebelumnya feed_inventory)
    `CREATE TABLE IF NOT EXISTS stok_pakan (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_pakan VARCHAR(100) NOT NULL,    -- "Konsentrat 144", "Dedak"
      stok_kg DECIMAL(10, 2) DEFAULT 0,
      harga_per_kg DECIMAL(10, 2) DEFAULT 0,
      terakhir_diupdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    // 3. Tabel Catatan Harian (sebelumnya daily_logs)
    `CREATE TABLE IF NOT EXISTS catatan_harian (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tanggal DATE NOT NULL,
      id_kelompok INT,                     -- Referensi ke kelompok_ternak
      telur_total INT DEFAULT 0,
      telur_bagus INT DEFAULT 0,
      telur_rusak INT DEFAULT 0,
      pakan_terpakai_kg DECIMAL(10, 2) DEFAULT 0,
      kematian INT DEFAULT 0,
      catatan TEXT,
      dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_kelompok) REFERENCES kelompok_ternak(id) ON DELETE SET NULL
    )`,

    // 4. Tabel Keuangan (sebelumnya transactions)
    `CREATE TABLE IF NOT EXISTS keuangan (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tanggal_transaksi DATE NOT NULL,
      jenis ENUM('pemasukan', 'pengeluaran') NOT NULL,
      kategori VARCHAR(50) NOT NULL,       -- "Penjualan Telur", "Beli Pakan"
      jumlah_uang DECIMAL(15, 2) NOT NULL,
      keterangan TEXT,
      dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  // Helper function to run queries sequentially
  const runQueries = async () => {
    for (const query of queries) {
      await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            console.error("Error executing query:", err.message);
            resolve(); 
          } else {
            console.log("Query executed successfully.");
            resolve();
          }
        });
      });
    }
    
    // Seed Data (Contoh Data)
    connection.query("SELECT COUNT(*) as count FROM kelompok_ternak", (err, res) => {
        if (!err && res[0].count === 0) {
            console.log("Seeding initial data (Indonesian)...");
            const seedSql = `
                INSERT INTO kelompok_ternak (nama_kelompok, tanggal_masuk, jumlah_awal, jumlah_saat_ini, jenis_bebek, umur_minggu, status) 
                VALUES ('Batch A - Kandang Depan', CURDATE(), 100, 100, 'Mojosari Petelur', 18, 'aktif');
            `;
            connection.query(seedSql);
            
            const seedFeed = `
                INSERT INTO stok_pakan (nama_pakan, stok_kg, harga_per_kg) 
                VALUES ('Konsentrat 144', 50, 8500), ('Dedak Halus', 100, 3500);
            `;
            connection.query(seedFeed);
            
            const seedFinance = `
                INSERT INTO keuangan (tanggal_transaksi, jenis, kategori, jumlah_uang, keterangan) 
                VALUES (CURDATE(), 'pengeluaran', 'Beli Pakan', 425000, 'Beli Konsentrat 1 Sak 50kg');
            `;
            connection.query(seedFinance);

            console.log("Sample data inserted.");
        }
        connection.end();
    });
  };

  runQueries();
});
