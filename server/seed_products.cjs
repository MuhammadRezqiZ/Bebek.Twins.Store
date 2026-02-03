const db = require('./database.cjs');
const products = require('./products_data.cjs');

console.log("Memulai update data produk...");

// 1. Kosongkan tabel produk lama
const truncateSql = "TRUNCATE TABLE products";
db.query(truncateSql, (err) => {
    if (err) {
        console.error("Gagal mengosongkan tabel:", err);
        process.exit(1);
    }
    console.log("Tabel products berhasil dikosongkan.");

    // 2. Masukkan data baru dari file products_data.cjs
    let completed = 0;
    let errors = 0;

    products.forEach(product => {
        const insertSql = `
            INSERT INTO products (name, description, price, category, image_url, stock, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        const values = [
            product.name, 
            product.description, 
            product.price, 
            product.category, 
            product.image_url,
            product.stock
        ];

        db.query(insertSql, values, (err) => {
            if (err) {
                console.error(`Gagal memasukkan ${product.name}:`, err.message);
                errors++;
            } else {
                console.log(`Berhasil memasukkan: ${product.name}`);
            }

            completed++;
            if (completed === products.length) {
                console.log("\nProses selesai!");
                console.log(`Berhasil: ${products.length - errors}, Gagal: ${errors}`);
                process.exit(0);
            }
        });
    });
});
