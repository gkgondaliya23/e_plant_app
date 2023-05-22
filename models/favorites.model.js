const mongoose = require('mongoose');


const favoriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

},
{
    versionKey: false,
    id: false
});

favoriteSchema.virtual("favorite_id").get(function () {
    return this._id.toHexString();
  });
  
favoriteSchema.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model('Favorites', favoriteSchema);