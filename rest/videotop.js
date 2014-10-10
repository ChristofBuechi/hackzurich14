/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');
var videotop = function(req,res){
    var array = [];
    var video = new Video();
    video.username = "bender";
    video.thumbnail = "thumbnail URL";
    video.video = "video URL";
    video.creationDate = 1234;
    video.sizeInKb = 1024;
    video.lengthInSeconds = 15;
    array.push(video);
    array.push({
        "username": "bender",
        "thumbnail": "thumbnail URL",
        "video": "video URL",
        creationDate: 123124213,
        sizeInKb: 1024,
        lengthInSeconds: 15});
    res.json(array);
};
module.exports = videotop;