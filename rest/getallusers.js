/**
 * Created by stone on 11.10.2014.
 */
var Video = require('./../app/models/video');


var getallusers = function (req, res) {

    Video.distinct('username', function (err, usernames) {
        res.json(usernames);
    })

};
module.exports = getallusers;

