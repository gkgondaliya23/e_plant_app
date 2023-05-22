const express = require('express');
const {addToFavorite, getAllFavorites, removeFavorites} = require('../../controllers/users/favorite.controller');
const routes = express.Router();

routes.post('/:userId', addToFavorite);

routes.get('/:userId',getAllFavorites);

routes.delete('/:userId', removeFavorites);

module.exports = routes;