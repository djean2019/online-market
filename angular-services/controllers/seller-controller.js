const Product = require("../models/product-model").productModel;
const Order = require("../models/order-model").orderModel;
const ResponseApi = require("../models/response");
const mongoose = require("mongoose");

exports.insert = (req, res, next) => {
    Product.create(req.body)
        .then(result => {
            res.status(201).send({ id: result });
        })
        .catch(err => {
            console.log(err);
            res.status(501).send({ errors: { Field: ["is invalid"] } });
        });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ errMsg: err });
        });
};

exports.patchById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            for (let i in req.body) product[i] = req.body[i];
            product.save().then(result => {
                res.status(200).send(result);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(204).send({});
        });
};

exports.removeById = async (req, res, next) => {
    const prod = await Order.find({
        "items.productId": mongoose.Types.ObjectId(req.params.productId),
    });

    if (prod.length === 0) {
        Product.findByIdAndDelete(req.params.productId)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ errMsg: err });
            });
    } else {
        res.status(401).send({
            errors: { "Cannot delete this product": ["is ordered."] },
        });
    }
};

exports.listBySeller = (req, res, next) => {
    Product.aggregate([{ $match: { userId: mongoose.Types.ObjectId(req.params.sellerId) } }])
        .then(result => {
            res.status(200).send(new ResponseApi(200, "success", result));
        })
        .catch(err => {
            res.status(500).send(new ResponseApi(500, "error", err));
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({ items: { $elemMatch: { userId: req.params.sellerId } } })
        .then(result => {
            res.status(200).send(new ResponseApi(200, "success", result));
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(new ResponseApi(500, "error", err));
        });
};

exports.changeOrderStatus = (req, res, next) => {
    const orderStauts = Order.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.orderId) },
        { $set: { status: req.body.status } }
    )
        .then(result => {
            res.status(200).send(new ResponseApi(200, "success", result));
        })
        .catch(err => {
            res.status(500).send(new ResponseApi(500, "error", err));
        });
    console.log("Change status: ", orderStauts);
};
