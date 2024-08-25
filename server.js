const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.resolve(__dirname, "../../config/development.env"),
});
const authRoutes = require("./routes/auth.routes.js");
const bookRoutes = require("./routes/book.routes.js");
const cartRoutes = require("./routes/cart.routes.js");
const orderRoutes = require("./routes/order.routes.js");

const app = express();

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

/* parse requests of content-type - application/json */
app.use(express.json());

/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/* simple route */
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to book store api",
        developer: { name: "Krutik Shukla", designation: "Software Developer" },
    });
});

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/api", cartRoutes);
app.use("/orders", orderRoutes);

/* Define error-handling middleware last */
app.use(errorHandler);

/* set port, listen for requests */
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
