var express = require('express');
var router = express.Router();

const adminController = require('../controllers/admin-controller');

router.post('/admin/:userId', adminController.approuveUser);

module.exports = router;
