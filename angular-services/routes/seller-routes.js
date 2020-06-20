var express = require("express");
var router = express.Router();

const sellerController = require("../controllers/seller-controller");

router.post("/seller/products", sellerController.insert);
router.get("/seller/:sellerId/products", sellerController.listBySeller);
router.get("/seller/products/:productId", sellerController.getById);
router.put("/seller/editProducts/:productId", sellerController.patchById);
router.delete("/seller/deleteProducts/:productId", sellerController.removeById);

router.post("/seller/:sellerId/orders/:orderId", sellerController.changeOrderStatus);
router.get("/seller/orders/:sellerId", sellerController.getOrders);

module.exports = router;
