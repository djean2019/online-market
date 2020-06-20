/**
 * Order Model
 */
const { createReceipt } = require("../util/receipt");
const mongoose = require('mongoose')

const order = {
    'items':[],
    'status':{
        type: String,
        default: "Pending"
    },
    'payment':{
        type: String,
        default: "Credit card"
    },
    'user': {
        'userId':{
                type: mongoose.Schema.Types.ObjectId, ref: 'user'
        },
        'name':{
            type: String
        }
    },
    'address': [
        {
          billing: {
            street: {
              type: String,
              default: "...",
            },
            state: {
              type: String,
              default: "...",
            },
            zip: {
              type: String,
              default: "...",
            },
          },
          shipping: {
            street: {
                type: String,
                default:"..."
              },
              city: {
                type: String,
                default:"..."
              },
              state: {
                type: String,
                default:"..."
              },
              zip: {
                type: String,
                default:"..."
              },
          },
        }],
    'review':{
      type: String
    }
}

const orderSchema = new mongoose.Schema(order);
const orderModel = mongoose.model('order',orderSchema);

const orderDomain = {
    'orderSchema': orderSchema,
    'orderModel': orderModel
}

createReceipt(order, "orderReceipt.pdf");

module.exports = orderDomain;