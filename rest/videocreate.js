/**
 * Created by stone on 11.10.2014.
 */
var formidable = require("formidable");
var Video = require('./../app/models/video');
var aws = require('./../app/services/aws');
var fs = require('fs');
var util = require('util');
var videocreate = function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var video = new Video();
    var filesToDelete=[]
    function updateMatchingProperties(name, value) {
        for (var property in video) {
            if (property === name) {
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
        console.log('path: '+file.path+' name: '+file.name);
        var url =  aws(name, file.path);
        updateMatchingProperties(file.name, url);
        filesToDelete.push(file);
    });
    form.on('error', function (name, file) {
        console.log('onFile ' + name);
        console.log(file.path);
        res.end();
    });
    form.on('end', function () {
        console.log('end');
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
        filesToDelete.forEach(function(file){
            fs.unlink(file, function (err) {
                if (err) throw err;
                console.log('successfully deleted: '+ file);
            });
        })
    });
};
module.exports = videocreate;