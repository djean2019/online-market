var express = require('express');
var router = express.Router();

const sellerController = require('../controllers/seller-controller');

// router.post('/seller/products', sellerController.insert);
router.get('/seller/:sellerId/products', sellerController.listBySeller);
router.get('/seller/products/:productId', sellerController.getById);
router.patch('/seller/products/:productId', sellerController.patchById);
router.delete('/seller/products/:productId', sellerController.removeById);

module.exports = router;
