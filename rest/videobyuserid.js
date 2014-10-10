/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');
var videobyuserid = function (req, res) {
    //fake
    var array = [];
    var video = new Video();
    video.username = req.params.user_id;
    video.thumbnail = "thumbnail URL";
    video.video = "video URL";
    video.creationDate = 1234;
    video.sizeInKb = 1024;
    video.lengthInSeconds = 15;
    array.push(video);
    array.push({
        "username": req.params.user_id,
        "thumbnail": "thumbnail URL",
        "video": "video URL",
        creationDate: 123124213,
        sizeInKb: 1024,
        lengthInSeconds: 15});
    res.json(array);
    return;
    // real implementation:
    Video.findById(req.params.user_id, function (err, videos) {

        if (err) {
            res.send(err);
        }
        res.json(videos);
    });
}
module.exports = videobyuserid;