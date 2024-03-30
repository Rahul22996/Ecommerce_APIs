const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name : String,
  image : String,
  description : String,
  price : String,
  category : {
    type : Schema.Types.ObjectId,
    ref : 'category'
  },
  company : {
    type : Schema.Types.ObjectId,
    ref : 'company'
  },
  reviews : [{
    type : Schema.Types.ObjectId,
    ref : 'review'
  }],
  rating : Number
});

module.exports = mongoose.model('product', productSchema);