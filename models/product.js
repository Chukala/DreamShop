const mongoose = require('mongoose');
// putting databaseschemas in a model module

const productSchema = mongoose.Schema({
    title: {
      type: String,
      unique: true,
      required: true
    },
    ptn: {
      type: Number,
      unique: true,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    cat: {
      type: String,
      enum: ["dresses","shirts", "shoes", "suits"]
    }, 
    price: {
      type: Number,
      required: true
    },
    desc: {
      type: String,
      required: true
  }
  });
  
module.exports = mongoose.model("Product", productSchema);
