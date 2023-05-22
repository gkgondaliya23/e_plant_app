const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  },
    {
        versionKey: false,
        id: false,
    });

cartSchema.virtual("cart_id").get(function () {
    return this._id.toHexString();
});

cartSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model('Cart', cartSchema);