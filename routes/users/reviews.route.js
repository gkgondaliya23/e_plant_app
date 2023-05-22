const routes = require('express').Router();
const { addToReview, getReviews } = require('../../controllers/users/reviews.controller');

routes.post('/:userId', addToReview);

routes.get('/:userId', getReviews);

module.exports = routes;