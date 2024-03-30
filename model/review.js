const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    uid : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    review : String,
    time : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('review', reviewSchema);