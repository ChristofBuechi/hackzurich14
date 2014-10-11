/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');
var videobyuserid = function (req, res) {
    var query = Video.find({ 'username': req.params.user_id });
    query.select('clientsideid username thumbnail videoUrl creationDate sizeInKb lengthInSeconds');
    query.exec(function (err, person) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(person);
    });
};
module.exports = videobyuserid;