const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    profile_image: {
        type: String,
        required: false,
      },
    mobile_no: {
        type: Number,
        default: null,
    },
    google_id: {
        type: String,
        default: null,
    },
    address: {
        city: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        country: {
          type: String,
          default: null,
        },
        zip_code: {
            type: Number,
            default: null,
        },
      },
},
{
    versionKey: false,
    id: false,
});

userSchema.virtual("user_id").get(function () {
    return this._id.toHexString();
  });
  
userSchema.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model('User', userSchema);