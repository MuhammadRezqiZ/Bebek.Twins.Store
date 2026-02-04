const express = require('express');
const cors = require('cors');
const db = require('./database.cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5001;
const SECRET_KEY = "bebek-twins-secret-key-change-this-in-prod";

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is reachable" });
});

// Middleware to authenticate Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`);
    
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error("Database error during login:", err.message);
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            console.log("User not found");
            return res.status(401).json({ message: "User not found" });
        }

        const user = results[0];

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            console.log("Invalid password");
            return res.status(401).json({ message: "Invalid Password" });
        }

        console.log("Login successful");
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours
        
        res.status(200).send({
            id: user.id,
            username: user.username,
            role: user.role,
            accessToken: token
        });
    });
});

// Get Products
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: "success",
            data: results
        });
    });
});

// Get Stats
app.get('/api/stats', authenticateToken, async (req, res) => {
    try {
        const getData = (query) => {
            return new Promise((resolve, reject) => {
                db.query(query, (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0].total || 0);
                });
            });
        };

        const ducksQuery = "SELECT SUM(jumlah_saat_ini) as total FROM kelompok_ternak WHERE status = 'aktif'";
        const productionQuery = "SELECT SUM(telur_total) as total FROM catatan_harian WHERE tanggal = CURDATE()";
        const revenueQuery = "SELECT SUM(jumlah_uang) as total FROM keuangan WHERE jenis = 'pemasukan' AND MONTH(tanggal_transaksi) = MONTH(CURRENT_DATE()) AND YEAR(tanggal_transaksi) = YEAR(CURRENT_DATE())";
        const feedQuery = "SELECT SUM(stok_kg) as total FROM stok_pakan";

        const [totalDucks, dailyProduction, monthlyRevenue, feedStock] = await Promise.all([
            getData(ducksQuery),
            getData(productionQuery),
            getData(revenueQuery),
            getData(feedQuery)
        ]);

        res.json({
            message: "success",
            data: {
                totalDucks,
                dailyProduction,
                monthlyRevenue,
                feedStock
            }
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Production History
app.get('/api/production', authenticateToken, (req, res) => {
    const sql = "SELECT id, tanggal as date, telur_total as total_eggs FROM catatan_harian ORDER BY tanggal DESC LIMIT 5";
    db.query(sql, [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: "success",
            data: results
        });
    });
});

// Get Livestock Batches (Kelompok Ternak)
app.get('/api/ternak', authenticateToken, (req, res) => {
    const sql = "SELECT * FROM kelompok_ternak ORDER BY status ASC, id DESC";
    db.query(sql, [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: "success",
            data: results
        });
    });
});

// Create Livestock Batch (Kelompok Ternak)
app.post('/api/ternak', authenticateToken, (req, res) => {
    console.log("Received POST /api/ternak request");
    console.log("Body:", req.body);

    const {
        nama_kelompok,
        tanggal_masuk,
        jumlah_awal,
        jumlah_saat_ini,
        jenis_bebek,
        umur_minggu,
        status
    } = req.body;
    // Validasi data
    if (!nama_kelompok || !tanggal_masuk || jumlah_awal === undefined) {
        return res.status(400).json({ error: "Nama kelompok, tanggal masuk, dan jumlah awal harus diisi" });
    }

    const insertSql = "INSERT INTO kelompok_ternak (nama_kelompok, tanggal_masuk, jumlah_awal, jumlah_saat_ini, jenis_bebek, umur_minggu, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        nama_kelompok,
        tanggal_masuk,
        Number(jumlah_awal || 0),
        Number((jumlah_saat_ini ?? jumlah_awal) || 0),
        jenis_bebek || null,
        Number(umur_minggu || 0),
        status || 'aktif'
    ];
    db.query(insertSql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const selectSql = "SELECT * FROM kelompok_ternak WHERE id = ?";
        db.query(selectSql, [result.insertId], (err2, rows) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(201).json({ message: "success", data: rows[0] });
        });
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Keep alive hack for Node v25 environment if needed
setInterval(() => {}, 60000);
