/**
 * Created by stone on 11.10.2014.
 */
var formidable = require("formidable");
var Video = require('./../app/models/video');
var util = require('util');
var videocreate = function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var video = new Video();
    function updateMatchingProperties(name, value) {
        for (var property in video) {
            if (property === name) {
                video[property] = value;
            }
        }
    }

    form.on('progress', function (bytesReceived, bytesExpected) {
        console.log('Progress so far: ' + (100 * (bytesReceived / bytesExpected)) + "%");
    });
    form.on('field', function (name, value) {
        console.log('onField ' + name + ' with value: ' + value);
        updateMatchingProperties(name, value);
    });
    form.on('file', function (name, file) {
        console.log('onFile ' + name);
    });
    form.on('error', function (name, file) {
        console.log('onFile ' + name);
        res.end();
    });
    form.on('end', function () {
        console.log(video);
        video.save(function (err) {
            if (err) {
                res.send(err);
            }
        });
    });
    form.parse(req,function(err, fields, files) {
        console.log('parse.....');
   //     res.writeHead(200, {'content-type': 'text/plain'});
        res.write('Received upload:\n\n');
     //   res.end(util.inspect(files));
    });
};
module.exports = videocreate;