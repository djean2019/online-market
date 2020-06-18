/**
 * Order Model
 */

const mongoose = require('mongoose')

const order = {
    'items':[],
    'user': {
        'userId':{
                type: mongoose.Schema.Types.ObjectId, ref: 'user'
        },
        'name':{
            type: String
        }
    }
}

const orderSchema = new mongoose.Schema(order);
const orderModel = mongoose.model('order',orderSchema);

const orderDomain = {
    'orderSchema': orderSchema,
    'orderModel': orderModel
}

module.exports = orderDomain;