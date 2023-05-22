const express = require('express');
const router = express.Router();
const { creatOrder, getOrder,cancelOrder } = require('../../controllers/users/orders.controller');

router.post('/orders', creatOrder);

router.get('/orders/:userId', getOrder);

router.delete('/orders', cancelOrder);

module.exports = router;