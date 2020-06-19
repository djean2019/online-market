/**
 * Order Model
 */

const mongoose = require('mongoose')

const order = {
    'items':[],
    'status':{
        type: String,
        default: "PENDING"
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
        }]
}

const orderSchema = new mongoose.Schema(order);
const orderModel = mongoose.model('order',orderSchema);

const orderDomain = {
    'orderSchema': orderSchema,
    'orderModel': orderModel
}

module.exports = orderDomain;