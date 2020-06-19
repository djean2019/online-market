const Product = require("../models/product-model").productModel;
const Order = require("../models/order-model").orderModel;
const ResponseApi = require("../models/response");
const mongoose = require("mongoose");

exports.insert = (req, res, next) => {
  Product.create(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id });
    })
    .catch((err) => {
      res.status(501).send({ errMsg: err });
    });
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errMsg: err });
    });
};

exports.patchById = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      for (let i in req.body) product[i] = req.body[i];
      return product.save();
    })
    .catch((err) => {
      res.status(204).send({});
    });
};

exports.removeById = (req, res, next) => {
  const prod = Order.find({"items.productId":mongoose.Types.ObjectId(req.params.productId)});
  console.log("The product: ",prod);

  if(prod.length===0){
    Product.findByIdAndDelete(req.params.productId)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errMsg: err });
        });
  } else{
    res.status(401).send({
      errors: { "Cannot delete this product": ["is ordered."] },
    }); 
  }
};

exports.listBySeller = (req, res, next) => {
  Product.aggregate([{ $match: { userId: mongoose.Types.ObjectId(req.params.sellerId) } }])
    .then((result) => {
      res.status(200).send(new ResponseApi(200, "success", result));
    })
    .catch((err) => {
      res.status(500).send(new ResponseApi(500, "error", err));
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({"items.sellerId":req.params.sellerId})
  .then(result => {
      res.status(200).send(result);
  })
  .catch(err => {
    res.status(500).send({errMsg : err});
  })
};

exports.changeOrderStatus = (req, res, next) => {
  const orderStauts = Order.updateOne(
    {_id: mongoose.Types.ObjectId(req.params.orderId)}, {$set: {status:req.body.status}}
  )
  .then(result => {
      res.status(200).send(new ResponseApi(200, 'success', result));
  })
  .catch(err => {
      res.status(500).send(new ResponseApi(500, 'error', err));
  });
  console.log("Change status: ", orderStauts);
}
