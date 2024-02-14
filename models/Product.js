const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  picture: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Invalid URL format for picture',
    },
  },
  description: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  category: {
    type: String,
    enum: ['makeup', 'skincare', 'haircare'],
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
