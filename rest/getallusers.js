/**
 * Created by stone on 11.10.2014.
 */
var User = require('./../app/models/user');


var getallusers = function (req, res) {
    var query = User.find();
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

