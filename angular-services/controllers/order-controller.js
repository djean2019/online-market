const Order = require('../models/order-model').orderModel;
const User = require('../models/user-model').userModel;
const mongoose = require('mongoose');

exports.createOrder = (req, res, next) => {
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
    Order.find({"order.user.userId":mongoose.Types.ObjectId(req.params.userId)})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
}

exports.cancelById = (req, res, next) => {
    Order.deleteOne(req.params.orderId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
}
