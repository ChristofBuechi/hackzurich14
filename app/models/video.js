/**
 * Created by stone on 10.10.2014.
 */
// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    username: String,
    thumbnail: String,
    videoUrl: String,
    creationDate: { type: Date, default: Date.now },
    sizeInKb: Number,
    lengthInSeconds: Number
});

module.exports = mongoose.model('Video', VideoSchema);