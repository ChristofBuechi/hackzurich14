/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');
var latest = function (req, res) {
    var query = Video.find({ });
    query.select('username thumbnail video creationDate sizeInKb lengthInSeconds views');
    query.exec(function (err, videos) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(videos.reverse());
    });
}
module.exports = latest;