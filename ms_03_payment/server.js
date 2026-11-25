
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes Payment
const paymentRoutes = require("./routes/paymentRoutes");

// Routes Sales
const saleRoutes = require("./routes/saleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Halaman utama
app.get("/", (req, res) => {
    res.json({
        message: "Sales & Payment Microservice berjalan",
        services: [
            "ms_03_payment",
            "sales"
        ]
    });
});

// Endpoint Payment
app.use("/payments", paymentRoutes);

// Endpoint Sales
app.use("/sales", saleRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(
        `Sales & Payment Server berjalan di http://localhost:${PORT}`
    );
});
