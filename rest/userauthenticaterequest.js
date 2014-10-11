/**
 * Created by stone on 11.10.2014.
 */
var User = require('./../app/models/user');
require('date-utils');
var tokenRequest = function (req, res) {
    var username = req.params.user_id;
    var query = User.findOne({ 'username': username});
    query.select('username secret token validUntil');
    query.exec(function (err, person) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        var parsedDate = new Date(person.validUntil);
        if ('Invalid Date' == x || parsedDate.isAfter(new Date())) {
            res.json({ message: 'send the as base64 [token]+[yoursecret]',
                token: person.token });
        } else {
            res.json({message: 'youre logged in', tokenValidUntil: parsedDate});
        }
    });
};

module.exports = tokenRequest;