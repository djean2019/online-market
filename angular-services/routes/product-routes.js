var express = require('express');
var router = express.Router();

const productController = require('../controllers/product-controller');

router.get('/home', productController.list);
router.post('/seller/products', productController.insert);
router.get('/seller/:sellerId/products', productController.listBySeller);
router.patch('/seller/products/:productId', productController.patchById);
router.delete('/seller/products/:productId', productController.removeById);

router.post('/buyer/:buyerId/:productId', productController.addToCart);
router.get('/buyer/:buyerId/cart', productController.getCart);
router.post('/buyer/:buyerId', productController.deleteCart);

module.exports = router;
