const { escapeXML } = require('ejs');
const Favorite = require('../../models/favorites.model');
const Product = require('../../models/product.model');

exports.addToFavorite = async (req, res) => {
    try {
        const { product } = req.body;

        const products = await Favorite.findOne({product: product});

        if (!products) {
            let favoriteItems = new Favorite({
                user: req.params.userId,
                product: products
            });
            await favoriteItems.save();
        }
        else{
            return res.status(200).json({message:'Already Exists...'});
        }

        res.status(200).json({ favorite_id: favoriteItems._id, user: favoriteItems.user, product: favoriteItems.product.product_id, message: 'Added to Favorite list' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add in favorite list' });
    }
};

exports.getAllFavorites = async (req, res) => {
    try {
        const products = await Favorite.find({user: req.params.userId});

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add in favorite list' });
    }
};

exports.removeFavorites = async (req, res) => {
    try {
        const products = await Favorite.findOneAndRemove({product: req.body.product});

        res.status(200).json({message: 'Removed items to favorites list'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add in favorite list' });
    }
};