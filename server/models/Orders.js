const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        productId: {
            type: Number,
            required: true
        },
        orderId: {
            type: String,
            required: false,
            unique: true
        },

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        aptNumber: {
            type: Number,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order; 