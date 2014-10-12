/**
 * Created by stone on 11.10.2014.
 */
var uuid = require('node-uuid');
var Video = require('./../app/models/video');
var viewRegister = function (req, res) {
    var videoId = req.body.videoId;
    Video.findById(videoId, function (err, video) {
        if (err) {
            console.error(err);
            return;
        }
        if (!video) {
            return;
        }
        if (isNaN(video.views)) {
            video.views = 1;
        } else {
            video.views++;
        }
        video.save();
        console.log('viewed video: ' + videoId +" total views: "+video.views);
        res.json(video);
    });
};
module.exports = viewRegister;