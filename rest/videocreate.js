/**
 * Created by stone on 11.10.2014.
 */
var uuid = require('node-uuid');
var formidable = require("formidable");
var Video = require('./../app/models/video');
var aws = require('./../app/services/aws');
var fs = require('fs');
var util = require('util');
var videocreate = function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var video = new Video();

    function updateMatchingProperties(name, value) {
        if(!value){return;}
        for (var property in video) {
            if (property === name  ) {
                video[property] = value;
            }
        }
    }

    form.on('progress', function (bytesReceived, bytesExpected) {
        console.log('Progress so far: ' + (100 * (bytesReceived / bytesExpected)) + "% from "+bytesExpected);
    });
    form.on('field', function (name, value) {
        console.log('onField ' + name + ' with value: ' + value);
        updateMatchingProperties(name, value);
    });
    form.on('file', function (name, file) {
        console.log('onFile ' + name);
        var uniqueFilename = uuid.v4();
        var filePath =file.path;
        var fileExtenison = '.mov'; // TODO fix this when time and sleep are your friends!
        if(name==='thumbnail'){
            fileExtenison = '.jpg';
        }
        uniqueFilename += fileExtenison;
        console.log('path: '+filePath+' name: '+file.name);
        var url =  aws(uniqueFilename, filePath);
        console.log("file.name on s3:" +url);
        updateMatchingProperties(name, url);
    });
    form.on('error', function (name, file) {
        console.log('onFile ' + name);
        console.log(file);
        res.end();
    });
    form.on('end', function () {
        console.log('end');
        console.log(video);
        video.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
        });
        res.write('Received upload!\n\n');
        res.end();
    });
    form.parse(req, function (err, fields, files) {
        console.log('parse.....');
        //     res.writeHead(200, {'content-type': 'text/plain'});

     //   res.end(util.inspect(files));
        //   res.end(util.inspect(files));
    });
};
module.exports = videocreate;