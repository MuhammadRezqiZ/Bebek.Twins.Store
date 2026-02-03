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
    // 1. Tabel Kelompok Bebek (Livestock Batches)
    // Mencatat kelompok bebek yang masuk, umurnya, dan jumlah populasinya.
    `CREATE TABLE IF NOT EXISTS livestock_batches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      batch_name VARCHAR(100) NOT NULL, -- Nama kelompok, misal "Bebek Fase Bayah A"
      arrival_date DATE NOT NULL,       -- Tanggal masuk kandang
      initial_count INT NOT NULL,       -- Jumlah awal
      current_count INT NOT NULL,       -- Jumlah saat ini (akan berkurang jika ada kematian)
      breed VARCHAR(50),                -- Jenis bebek (Mojosari, Hibrida, dll)
      age_weeks INT DEFAULT 0,          -- Umur saat masuk (minggu)
      status ENUM('active', 'sold', 'culled') DEFAULT 'active', -- Status aktif/dijual/afkir
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // 2. Tabel Stok Pakan & Logistik (Feed Inventory)
    // Mencatat jenis pakan dan sisa stok di gudang.
    `CREATE TABLE IF NOT EXISTS feed_inventory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      feed_name VARCHAR(100) NOT NULL,  -- Nama pakan (Konsentrat 144, Dedak, Jagung)
      stock_kg DECIMAL(10, 2) DEFAULT 0, -- Sisa stok dalam Kg
      cost_per_kg DECIMAL(10, 2) DEFAULT 0, -- Harga rata-rata per kg (untuk hitung HPP)
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    // 3. Tabel Pencatatan Harian (Daily Logs)
    // "Jantung" dari aplikasi: mencatat telur, pakan, dan kematian setiap hari.
    `CREATE TABLE IF NOT EXISTS daily_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      log_date DATE NOT NULL,
      batch_id INT,                     -- Referensi ke kelompok bebek mana
      eggs_total INT DEFAULT 0,         -- Total telur keluar
      eggs_good INT DEFAULT 0,          -- Telur utuh/bagus (dijual)
      eggs_bad INT DEFAULT 0,           -- Telur retak/pecah
      feed_used_kg DECIMAL(10, 2) DEFAULT 0, -- Pakan yang dikasih hari ini (Kg)
      mortality INT DEFAULT 0,          -- Jumlah bebek mati hari ini
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (batch_id) REFERENCES livestock_batches(id) ON DELETE SET NULL
    )`,

    // 4. Tabel Keuangan (Transactions)
    // Mencatat pemasukan (jual telur/bebek) dan pengeluaran (beli pakan/obat/gaji).
    `CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      transaction_date DATE NOT NULL,
      type ENUM('income', 'expense') NOT NULL, -- Pemasukan atau Pengeluaran
      category VARCHAR(50) NOT NULL,    -- Kategori: 'Penjualan Telur', 'Beli Pakan', 'Operasional'
      amount DECIMAL(15, 2) NOT NULL,   -- Nominal Rupiah
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  // Helper function to run queries sequentially
  const runQueries = async () => {
    for (const query of queries) {
      await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            console.error("Error executing query:", err.message);
            // Don't reject, just log and continue (e.g. if table exists issues)
            resolve(); 
          } else {
            console.log("Query executed successfully.");
            resolve();
          }
        });
      });
    }
    
    // Insert some sample data if tables are empty
    // Check if batches exist
    connection.query("SELECT COUNT(*) as count FROM livestock_batches", (err, res) => {
        if (!err && res[0].count === 0) {
            console.log("Seeding initial data...");
            const seedSql = `
                INSERT INTO livestock_batches (batch_name, arrival_date, initial_count, current_count, breed, age_weeks) 
                VALUES ('Batch A - Kandang Depan', CURDATE(), 100, 100, 'Mojosari Petelur', 18);
            `;
            connection.query(seedSql);
            
            const seedFeed = `
                INSERT INTO feed_inventory (feed_name, stock_kg, cost_per_kg) 
                VALUES ('Konsentrat 144', 50, 8500), ('Dedak Halus', 100, 3500);
            `;
            connection.query(seedFeed);
            console.log("Sample data inserted.");
        }
        connection.end();
    });
  };

  runQueries();
});
