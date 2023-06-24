const Product = require('../../models/product.model');
const Reviews = require('../../models/reviews.model');
exports.getAllProducts = async (req, res) =>{
    try {
        const getProducts = await Product.find();
        res.status(200).json(getProducts);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Get All Product'});  
    }
};


exports.getProduct = async (req, res) =>{
    try {
        const getProduct = await Product.findById(req.params.id);
        const ratingProduct = await Reviews.find({product:getProduct});
        const totalRating = ratingProduct.reduce((totalRating, rating) => totalRating + rating.rating , 0);
        const averageRatingProduct = totalRating / ratingProduct.length;
        
        if(!getProduct)
            res.status(400).json({message:'Product is not found...'});
        res.status(200).json({product_id: getProduct._id,title:getProduct.title, description: getProduct.description, images: getProduct.images, price: getProduct.price, quantity: getProduct.quantity, rating: averageRatingProduct});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Get Product Details'});  
    }
};