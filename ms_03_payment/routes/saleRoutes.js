
const express = require("express");
const router = express.Router();

const saleController = require("../controllers/saleController");
const authenticateToken = require("../middleware/auth");

// Membuat transaksi penjualan
router.post("/", authenticateToken, saleController.create);

// Melihat transaksi berdasarkan ID
router.get("/:id", authenticateToken, saleController.getById);

// Mengubah status transaksi
router.patch("/:id/paid", authenticateToken, saleController.markPaid);

module.exports = router;
