const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name : String,
  image : String
});

module.exports = mongoose.model('company', companySchema);