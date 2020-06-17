var express = require('express');
var router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/users', userController.list);
router.post('/users', userController.insert);

router.get('/users/:userId', userController.getById);
router.patch('/users/:userId', userController.patchById);
router.delete('/users/:userId', userController.removeById);

module.exports = router;
