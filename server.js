/**
 * Created by stone on 10.10.2014.
 * configure our application and create routes
 */

// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var path = require('path');
var Video = require('./app/models/video');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoConnectionconf = process.env.MONGODBCONNCONF;

mongoose.connect(mongoConnectionconf); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var video_latest = require('./rest/videolatest');
var video_top = require('./rest/videotop');
var videoByUserId = require('./rest/videobyuserid');
var video_create = require('./rest/videocreate');
var user_create = require('./rest/usercreate');
var listallusers = require('./rest/getallusers');
var userauthenticateRequest = require('./rest/userauthenticaterequest');
var userauthenticateResponse = require('./rest/userauthenticateresponse');
var video_view = require('./rest/videoview');
var router = express.Router(); 				// get an instance of the express Router
// create a video (accessed at POST http://localhost:8080/api/video)
router.route('/video').post(video_create);
router.route('/video/view').post(video_view);
// get all the bears (accessed at GET http://localhost:8080/api/video/latest)
router.route('/videos/latest').get(video_latest);
router.route('/videos/top').get(video_top);
router.route('/videos/:user_id').get(videoByUserId);
router.route('/user').post(user_create);
router.route('/users').get(listallusers);
router.route('/user/authenticate/:user_name').get(userauthenticateRequest);
router.route('/user/authenticate/:user_name').get(userauthenticateResponse);
/*        Video.find(function(err, bears) {

 res.json(videos);
 });
 */


// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/app/index.html');
});
app.use(express.static(path.join(__dirname, 'public/app'))); //  "public" off of current is root

// app.use('/main/',express.static(__dirname+'/public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// globald
foovie = {};
foovie.util = {};
foovie.util.parseDate = function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
}