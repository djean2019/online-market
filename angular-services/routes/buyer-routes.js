var express = require("express");
var router = express.Router();

const buyerController = require("../controllers/buyer-controller");

router.post("/buyer/:buyerId/:productId", buyerController.addToCart);
router.get("/buyer/:buyerId/cart", buyerController.getCart);
router.delete("/buyer/cart/:buyerId", buyerController.deleteCart);
router.post("/buyer/cart/:buyerId/:productId", buyerController.removeFromCart);

// router.post('buyer/orders/:buyerId', buyerController.createOrder);
// router.get('buyer/orders/:orderId', buyerController.getOrderById);
// router.get('buyer/orders/:buyerId', buyerController.listOrder);
// router.delete('buyer/orders/:orderId', buyerController.deleteOrderById);

module.exports = router;
