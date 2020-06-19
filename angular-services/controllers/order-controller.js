const Order = require('../models/order-model').orderModel;
const User = require('../models/user-model').userModel;
const mongoose = require('mongoose');

exports.createOrder = (req, res, next) => {
    req.body.sellerId = mongoose.Types.ObjectId(req.body.sellerId);
    Order.create(req.body)
        .then(result => {
            res.status(201).send({ id: result._id });
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.getById = (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.list = (req, res, next) => {
    Order.find({"user.userId":mongoose.Types.ObjectId(req.params.buyerId)},{})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
}

exports.cancelById = async (req, res, next) => {
    const orderStatus = await Order.find({$and:[{"_id":mongoose.Types.ObjectId(req.params.orderId)},{"status":"Pending"}]});
    if(orderStatus.length===0){
        res.status(401).send({
            errors: { "Cannot cancel this order": ["It has already been shipped."] },
          }); 
    } else {
        Order.findByIdAndDelete(req.params.orderId)
            .then(result => {
                res.status(200).send({});
            })
            .catch(err => {
                res.status(500).send({ errMsg: err });
            });
    }
}
