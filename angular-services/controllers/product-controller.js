const Product = require('../models/product-model').productModel;
const User = require('../models/user-model').userModel;
const ResponseApi = require('../models/response');
const mongoose = require('mongoose');

exports.insert = (req, res, next) => {
    Product.create(req.body)
        .then(result => {
            res.status(201).send({ id: result._id});
        })
        .catch(err =>{
            res.status(501).send({ errMsg: err});
        })
}

exports.getById = (req, resp, next) => {
    Product.findById(req.params.productId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err});
        })
}

exports.patchById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            for(let i in req.body)
            product[i] = req.body[i];
            return product.save();
        })
        .catch(err => {
            res.status(204).send({ });
        })
}

exports.removeById = (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ errMsg: err});
        })
}

exports.list = (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({errMsg: err});
        })
}

exports.listBySeller = (req, res, next) => {
    let selId = req.params.sellerId;
    Product.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(selId) } },
        ])
        .then(result => {
            res.status(200).send(new ResponseApi(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ResponseApi(500, 'error', err));
        });
};

exports.getCart = (req, res, next) =>{
    User.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.buyerId) }},{$project:{_id:0,cart:1}}
    ])
    .then(result => {
        res.status(200).send(new ResponseApi(200, 'success', result));
    })
    .catch(err => {
        res.status(500).send(new ResponseApi(500, 'error', err));
    })
}
exports.removeCart = (req, res, next) =>{
    User.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.buyerId) }
    )
    .then(result => {
        res.status(200).send(new ResponseApi(200, 'success', result));
    })
    .catch(err => {
        res.status(500).send(new ResponseApi(500, 'error', err));
    })
}

exports.addToCart = (req, res, next) => {
    const buyerId = req.params.buyerId;
    const prodId = req.params.productId;
   console.log(isInCart(prodId));
    Product.findById(prodId)
        .then(product => {
            User.updateOne(
                // {_id: mongoose.Types.ObjectId(buyerId)}, {$pop: {"cart":-1}}
                // {_id: mongoose.Types.ObjectId(buyerId)}, {$push: {"cart":{"productId":product._id,"quantity":1}}}
                // {_id: mongoose.Types.ObjectId(buyerId)}, {$set: {"$cart.productId":mongoose.Types.ObjectId(product._Id), "$cart.quantity":1}}

                {$and:[{_id: mongoose.Types.ObjectId(buyerId)}, {"cart.productId":mongoose.Types.ObjectId(product._id)}]}, {$set: {"cart.productId":mongoose.Types.ObjectId(product._id),"cart.quantity":{$inc:1}}}, {upsert: true}
            )
            .then(result => {
                res.status(200).send(new ResponseApi(200, 'success', result));
            })
            .catch(err => {
                res.status(500).send(new ResponseApi(500, 'error', err));
            });
        })
    .then(resul => {
        // res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

const isInCart = function(id){
    User.find({"cart.quantity": 1})
        .then(result=> {
            console.log("Test in cart: ",result);
            return  result;
        });
}
