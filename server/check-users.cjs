const db = require('./database.cjs');

const sql = "SELECT * FROM users";
db.query(sql, [], (err, results) => {
    if (err) {
        console.error("Error reading users:", err.message);
        return;
    }
    console.log("Users in DB:", results);
    db.end(); // Tutup koneksi setelah selesai
});
