
const saleService = require("../services/saleService");

// Membuat transaksi penjualan
async function create(req, res) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token autentikasi tidak valid"
            });
        }

        const token = authorization.split(" ")[1];

        const sale = await saleService.createSale(
            req.body.items,
            token
        );

        return res.status(201).json({
            message: "Transaksi penjualan berhasil dibuat",
            data: sale
        });

    } catch (error) {
        console.error("ERROR CREATE SALE:", error);

        return res.status(400).json({
            message: "Gagal membuat transaksi",
            error: error.message
        });
    }
}

// Menampilkan detail transaksi berdasarkan ID
async function getById(req, res) {
    try {
        const sale = await saleService.getSaleById(req.params.id);

        if (!sale) {
            return res.status(404).json({
                message: "Transaksi tidak ditemukan"
            });
        }

        return res.status(200).json({
            message: "Detail transaksi berhasil diambil",
            data: sale
        });

    } catch (error) {
        console.error("ERROR GET SALE:", error);

        return res.status(500).json({
            message: "Gagal mengambil detail transaksi",
            error: error.message
        });
    }
}

// Mengubah status transaksi menjadi PAID
async function markPaid(req, res) {
    try {
        const sale = await saleService.markSalePaid(req.params.id);

        if (!sale) {
            return res.status(400).json({
                message: "Transaksi tidak ditemukan atau bukan PENDING"
            });
        }

        return res.status(200).json({
            message: "Transaksi berhasil diselesaikan",
            data: sale
        });

    } catch (error) {
        console.error("ERROR MARK SALE PAID:", error);

        return res.status(400).json({
            message: "Gagal menyelesaikan transaksi",
            error: error.message
        });
    }
}

// Export controller
module.exports = {
    create,
    getById,
    markPaid
};
