const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  uid : {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  product : [{
    type : Schema.Types.ObjectId,
    ref : 'product'
  }],
  time : {
    type : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model('cart', cartSchema);