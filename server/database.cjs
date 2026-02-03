const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default user Laragon/XAMPP
  password: '', // Default password kosong
  database: 'bebektwins'
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the MySQL database: ' + error.stack);
    return;
  }
  console.log('Connected to the MySQL database as id ' + connection.threadId);
  
  // Kita asumsikan tabel sudah dibuat oleh user di phpMyAdmin, 
  // jadi kita tidak perlu CREATE TABLE di sini kecuali user memintanya.
  // Namun, untuk keamanan, kita bisa cek apakah tabel users ada.
});

module.exports = connection;
