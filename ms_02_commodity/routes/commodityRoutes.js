
const express = require("express");
const router = express.Router();

const controller = require("../controllers/commodityController");
const priceHistoryController = require("../controllers/priceHistoryController");

const {
    validateUUIDParam,
    validateCommodityQuery,
    validateCommodityBody
} = require("../middleware/validation");

// Menampilkan semua barang
router.get(
    "/",
    validateCommodityQuery,
    controller.getAll
);

// Menambahkan barang (OWNER)
router.post(
    "/",
    validateCommodityBody,
    controller.create
);

// Riwayat perubahan harga (OWNER)
router.get(
    "/:id/price-histories",
    validateUUIDParam,
    priceHistoryController.getByCommodityId
);

// Detail barang
router.get(
    "/:id",
    validateUUIDParam,
    controller.getById
);

// Mengubah barang (OWNER)
router.put(
    "/:id",
    validateUUIDParam,
    validateCommodityBody,
    controller.update
);

// Menonaktifkan barang (soft delete, OWNER)
router.delete(
    "/:id",
    validateUUIDParam,
    controller.deactivate
);

module.exports = router;
