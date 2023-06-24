const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: [{
        type: String,
        required: true,
    }],
    share_link: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    care_data: {
        water: {
            type: String,
        },
        fertilizer: {
            type: String,
        },
    },

}, 
{
    versionKey: false,
    id: false,
});

productSchema.virtual("product_id").get(function () {
    return this._id.toHexString();
  });
  
productSchema.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model('Product', productSchema);