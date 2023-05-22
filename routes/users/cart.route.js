const express = require('express');
const router = express.Router();
const {addToCart, getUserAllCart, updateUserCart, removeUserCart} = require('../../controllers/users/cart.controller');

router.post('/:userId', addToCart);

router.get('/:userId', getUserAllCart);

router.put('/:userId', updateUserCart);

router.delete('/:userId', removeUserCart);

module.exports = router;