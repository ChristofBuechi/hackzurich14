/**
 * Created by stone on 11.10.2014.
 */
new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')

var User = require('./../app/models/user');
var useraauthresp = function (req, res) {
        var username = req.params.user_id;
        var proof = req.body.proof;
        var decodedProof = new Buffer(proof, 'base64').toString('ascii')
        var query = User.findOne({ 'username': req.params.user_id });
        query.select('username secret token validUntil');
        query.exec(function (err, person) {
            if (err) {
                console.error(err);
                res.send(err);
            }
            var _proof = token + secret;
            if (decodedProof === _proof) {
                var userId;
                var query = User.findOne({ 'username': req.params.user_id });
                query.select('username secret token validUntil');
                query.exec(function (err, person) {
                    if (err) {
                        console.error(err);
                        res.send(err);
                    }
                    userId = person._id;
                });
                User.findById(userId, function (err, user) {
                    if (err){ return handleError(err);}
                    var validUntil = new Date();
                    validUntil.setHours(validUntil.getHours() + 6);
                    user.tokenValidUntil = validUntil;
                    user.save(function (err) {
                        if (err) return handleError(err);

                    });
                });
            }
        });
    }
    ;
module.exports = useraauthresp;