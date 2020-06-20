/**
 * Order Model
 */
const { createReceipt } = require("../util/receipt");
const mongoose = require("mongoose");

const order = {
    items: [],
    status: {
        type: String,
        default: "Pending",
    },
    payment: {
        type: String,
        default: "Credit card",
    },
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        name: {
            type: String,
        },
    },
    billingAddress: { type: String },
    shippingAddress: { type: String },
    review: {
        type: String,
        default: "No reviews!",
    },
};

const orderSchema = new mongoose.Schema(order);
const orderModel = mongoose.model("order", orderSchema);

const orderDomain = {
    orderSchema: orderSchema,
    orderModel: orderModel,
};

createReceipt(order, "orderReceipt.pdf");

module.exports = orderDomain;
