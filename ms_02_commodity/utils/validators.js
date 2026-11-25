
const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Memeriksa UUID
function isValidUUID(value) {
    return typeof value === "string" && UUID_REGEX.test(value);
}

// Validasi ID
function validateId(id) {
    if (!isValidUUID(id)) {
        return "ID tidak valid. Format ID harus berupa UUID.";
    }

    return null;
}

// Validasi nama kategori
function validateCategoryName(name) {
    if (typeof name !== "string" || !name.trim()) {
        return "Nama kategori wajib diisi.";
    }

    if (name.trim().length > 100) {
        return "Nama kategori maksimal 100 karakter.";
    }

    return null;
}

// Validasi data barang
function validateCommodity(data) {
    const {
        sku,
        name,
        category_id,
        unit,
        cost_price,
        selling_price,
        image_url
    } = data;

    // SKU
    if (typeof sku !== "string" || !sku.trim()) {
        return "SKU barang wajib diisi.";
    }

    if (sku.trim().length > 50) {
        return "SKU maksimal 50 karakter.";
    }

    // Nama barang
    if (typeof name !== "string" || !name.trim()) {
        return "Nama barang wajib diisi.";
    }

    if (name.trim().length > 150) {
        return "Nama barang maksimal 150 karakter.";
    }

    // Kategori
    if (!isValidUUID(category_id)) {
        return "Kategori barang tidak valid.";
    }

    // Satuan
    if (typeof unit !== "string" || !unit.trim()) {
        return "Satuan barang wajib diisi.";
    }

    if (unit.trim().length > 50) {
        return "Satuan barang maksimal 50 karakter.";
    }

    // Harga wajib diisi
    if (
        cost_price === undefined ||
        cost_price === null ||
        String(cost_price).trim() === "" ||
        selling_price === undefined ||
        selling_price === null ||
        String(selling_price).trim() === ""
    ) {
        return "Harga pokok dan harga jual wajib diisi.";
    }

    // Harga harus berupa angka
    const costPrice = Number(cost_price);
    const sellingPrice = Number(selling_price);

    if (
        !Number.isFinite(costPrice) ||
        !Number.isFinite(sellingPrice)
    ) {
        return "Harga harus berupa angka yang valid.";
    }

    // Harga tidak boleh negatif
    if (costPrice < 0 || sellingPrice < 0) {
        return "Harga tidak boleh bernilai negatif.";
    }

    // URL gambar opsional
    if (
        image_url !== undefined &&
        image_url !== null &&
        image_url !== ""
    ) {
        if (typeof image_url !== "string") {
            return "URL gambar harus berupa teks.";
        }

        if (image_url.trim()) {
            try {
                const url = new URL(image_url);

                if (!["http:", "https:"].includes(url.protocol)) {
                    return "URL gambar harus menggunakan HTTP atau HTTPS.";
                }
            } catch {
                return "Format URL gambar tidak valid.";
            }
        }
    }

    return null;
}




// Validasi pagination
function validatePagination(query) {
    const { page = "1", limit = "10" } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
        !Number.isInteger(pageNumber) ||
        pageNumber < 1
    ) {
        return "Nomor halaman harus berupa bilangan bulat minimal 1.";
    }

    if (
        !Number.isInteger(limitNumber) ||
        limitNumber < 1 ||
        limitNumber > 100
    ) {
        return "Limit harus berupa bilangan bulat antara 1 sampai 100.";
    }

    return null;
}

// Validasi query IDs untuk pengambilan barang massal
function validateCommodityIds(ids) {
    if (ids === undefined) {
        return null;
    }

    if (typeof ids !== "string" || !ids.trim()) {
        return "Parameter ids tidak boleh kosong.";
    }

    const idList = ids.split(",").map(id => id.trim());

    if (idList.length > 100) {
        return "Maksimal 100 ID barang dalam satu permintaan.";
    }

    if (idList.some(id => !isValidUUID(id))) {
        return "Salah satu ID barang memiliki format UUID yang tidak valid.";
    }

    if (new Set(idList).size !== idList.length) {
        return "Daftar ID barang tidak boleh berisi ID duplikat.";
    }

    return null;
}


module.exports = {
    isValidUUID,
    validateId,
    validateCategoryName,
    validateCommodity,
    validatePagination,
    validateCommodityIds
};
