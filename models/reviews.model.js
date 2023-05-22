const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        default: 1,
    },
    desc: {
        type: String,
    },

},
    {
        versionKey: false,
        id: false,
    });

reviewSchema.virtual("review_id").get(function () {
    return this._id.toHexString();
});

reviewSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model('Reviews', reviewSchema);