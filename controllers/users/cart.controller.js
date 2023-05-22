const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');


exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const products = await Product.findById(product);

        if (!products) {
            return res.status(404).json({ message: 'Product not found' });
        }


        let cart = new Cart({
            user: req.params.userId,
            product: products.product_id,
            quantity
        });

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to Create Cart' });
    }
};


exports.getUserAllCart = async (req, res) => {
    try {
        const userCart = await Cart.find({ user: req.params.userId });

        if (!userCart) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        res.status(200).json(userCart);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to User Cart' });
    }
};

exports.updateUserCart = async (req, res) => {
    try {
        const userCart = await Cart.findById(req.body.cart_id);

        if (!userCart) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        const userCartUpdate = await Cart.findByIdAndUpdate(userCart, {
            $set: req.body
        },
            {
                upsert: true,
                new: true
            });

        await userCartUpdate.save();
        res.status(200).json({ userCartUpdate, message: 'Update items form User Cart' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update cart' });
    }
};

exports.removeUserCart = async (req, res) => {
    try {
        const userCartRemove = await Cart.findByIdAndDelete(req.body.cart_id);

        if (!userCartRemove) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        res.status(200).json({ userCartRemove, message: 'Remove items form User Cart' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to remove cart' });
    }
};