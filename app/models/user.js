/**
 * Created by stone on 10.10.2014.
 */
// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    secret: String
});

module.exports = mongoose.model('User', UserSchema);