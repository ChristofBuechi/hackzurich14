/**
 * Created by stone on 10.10.2014.
 * configure our application and create routes
 */

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var Video = require('./app/models/video');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var createFakeDataArray = function(){
    var array = []
    var video = new Video();
    video.username = "bender";
    video.thumbnail = "thumbnail URL";
    video.video = "video URL";
    video.creationDate = 1234;
    video.sizeInKb = 1024;
    video.lengthInSeconds = 15;
    array.push(video);
    array.push(
        {
            "username": "bender",
            "thumbnail": "thumbnail URL",
            "video": "video URL",
            creationDate: 123124213,
            sizeInKb: 1024,
            lengthInSeconds: 15});
    return array;
}

mongoose.connect('mongodb://8c2bd0d9-c8ab-4eb0-a7be-b71e7a86b1e8:a7d23327-eac7-4edb-adb7-ae690a7960ac@100.64.2.101:10074/db'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.route('/video')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {

        var video = new Video(); 		// create a new instance of the Bear model
        console.log('create video called with req:');
        console.log(req);
        // save the bear and check for errors
        video.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'video Uploaded!' });
        });

    });
router.route('/videos/latest')
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        var array = createFakeDataArray();

        res.json(array);
    });

router.route('videos/top').get(function(req,res){
    var array = createFakeDataArray();
    res.json(array);
})

router.route('videos/:user_id').get(function(req,res){
    Video.findById(req.params.user_id, function(err, videos) {
        if (err){res.send(err);}

        res.json(videos);
    });
})
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


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);