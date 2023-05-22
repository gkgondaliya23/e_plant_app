const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Placed', 'Shipped', 'Delivered'],
        default: 'Placed'
      }

},
{
    versionKey: false,
    id: false,
}
);

orderSchema.virtual("order_id").get(function () {
    return this._id.toHexString();
  });
  
orderSchema.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model('Order', orderSchema);