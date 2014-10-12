/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');
var videotop = function (req, res) {

    Video.where('views').gte(1).sort('views').exec(
        function (err, videos) {
            if (err) {
                console.error(err);
                res.send(err);
            }

            res.json(videos.reverse());
        }
    )
    ;
};
module.exports = videotop;