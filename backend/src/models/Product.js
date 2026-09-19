const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      default: ''
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);
productSchema.index({ vendor: 1 });
productSchema.index({ category: 1 });
productSchema.index({ active: 1 });

module.exports = mongoose.model('Product', productSchema);