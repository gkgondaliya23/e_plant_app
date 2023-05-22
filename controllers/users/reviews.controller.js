const Reviews = require('../../models/reviews.model');

exports.addToReview = async (req, res) => {
    try {
        const { product, rating, desc } = req.body;
        const reviews = new Reviews({
            user: req.params.userId,
            product,
            rating,
            desc
        });

        await reviews.save();

        res.status(200).json({ reviews, message: 'Added items review' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to Add items review' });
    }
};


exports.getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find({user: req.params.userId});
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to view item reviews' });
    }
};