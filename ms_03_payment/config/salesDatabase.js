
const { Pool } = require("pg");
require("dotenv").config();

const salesDB = new Pool({
    host: process.env.SALES_DB_HOST,
    port: process.env.SALES_DB_PORT || 5432,
    database: process.env.SALES_DB_NAME,
    user: process.env.SALES_DB_USER,
    password: process.env.SALES_DB_PASSWORD
});

// Memeriksa koneksi database Sales
salesDB.query("SELECT NOW()")
    .then(() => {
        console.log("PostgreSQL Sales berhasil terhubung!");
    })
    .catch(error => {
        console.error(
            "Database Sales gagal:",
            error.message
        );
    });

module.exports = salesDB;
