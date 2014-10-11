/**
 * Created by stone on 11.10.2014.
 */
var User = require('./../app/models/user');
var createUser = function (req, res) {

        var user = new User(); 		// create a new instance of the Bear model
        console.log('create user called with req:');
        console.log(req);
        user.username = req.body.username;
        user.secret = req.body.secret;
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
        });
        res.json({ message: 'user created!' });
    }
    ;
module.exports = createUser;