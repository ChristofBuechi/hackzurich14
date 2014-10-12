/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');


var getallusers = function (req, res) {
    var query = Video.find();
    query.select('username');
    query.exec(function (err, person) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(person);
    });
};
module.exports = getallusers;

