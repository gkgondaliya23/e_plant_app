const express = require('express');
const router = express.Router();
const {getAllProducts, getProduct} = require('../../controllers/users/product.controller')

router.get('/', getAllProducts);

router.get('/products/:id', getProduct);

module.exports = router;