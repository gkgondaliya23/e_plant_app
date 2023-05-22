const Product = require('../../models/product.model');
const Cart = require('../../models/cart.model');
const Order = require('../../models/order.model');


exports.creatOrder = async (req, res) => {
    try {
        const { user } = req.body;
        const cartItems = await Cart.find({ user: user }).populate('product');

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'User does not have any items in cart' });
        }

        const orderItems = cartItems.map(cartItem => ({
            product: cartItem.product._id,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
        }));

        const totalAmount = orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);

        const newOrder = await Order.create({
            user,
            items: orderItems,
            totalAmount,
        });

        await Cart.deleteMany({ user: user });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

exports.getOrder = async(req, res) =>{
    try {
        const getOrder = await Order.find({user: req.params.userId});

        res.status(200).json(getOrder);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to show order' });
    }
};

exports.cancelOrder = async (req, res) =>{
    try {
        const cancelOrder = await Order.findByIdAndDelete(req.body.order_id);

        res.status(200).json({cancelOrder, message: 'Cancel Ordered'});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to cancel order' });
    }
};