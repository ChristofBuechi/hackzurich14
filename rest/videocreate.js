/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');
var videocreate = function (req, res) {

    var video = new Video(); 		// create a new instance of the Bear model
    console.log('create video called with req:');
    console.log(req);
    // save the bear and check for errors
    video.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'video Uploaded!' });
    });

};
module.exports = videocreate;