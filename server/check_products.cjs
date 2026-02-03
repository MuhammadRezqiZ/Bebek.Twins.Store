const db = require('./database.cjs');

const sql = "SELECT * FROM products";
db.query(sql, [], (err, results) => {
    if (err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(results, null, 2));
    }
    process.exit();
});
