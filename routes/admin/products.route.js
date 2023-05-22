const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts, getProduct, updateProduct, removeProduct} = require('../../controllers/admin/product.controller')

router.post('/products', createProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', removeProduct);

module.exports = router;