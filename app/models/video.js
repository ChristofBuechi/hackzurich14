/**
 * Created by stone on 10.10.2014.
 */
// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    clientsideid:String,
    username: String,
    thumbnail: String,
    video: String,
    creationDate: { type: Date, default: Date.now },
    sizeInKb: Number,
    lengthInSeconds: Number,
    views: Number
});

module.exports = mongoose.model('Video', VideoSchema);