var express = require('express');
var router = express.Router();

const orderController = require('../controllers/order-controller');

router.post('/orders/:buyerId', orderController.createOrder);
router.get('/orders/:orderId', orderController.getById);
router.get('/orders/buyer/:buyerId', orderController.list);
router.delete('/orders/:orderId', orderController.cancelById);
router.post("/orders/buyer/review/:orderId", orderController.review);

module.exports = router;
