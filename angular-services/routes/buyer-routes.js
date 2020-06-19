var express = require('express');
var router = express.Router();

const buyerController = require('../controllers/buyer-controller');

router.post('/buyer/:buyerId/:productId', buyerController.addToCart);
router.get('/buyer/:buyerId/cart', buyerController.getCart);
router.post('/buyer/cart/:buyerId', buyerController.deleteCart);
router.post('/buyer/cart/:buyerId/:productId', buyerController.removeFromCart);

module.exports = router;
