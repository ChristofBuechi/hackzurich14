/**
 * Created by christof on 11.10.14.
 */

var BUCKET_NAME = 'foovie';

var fs = require('fs');

var aws = require('aws-sdk');
aws.config.loadFromPath('./config_aws.json');

var s3 = new aws.S3();


var uploadVideo = function (remoteFilename, fileName) {
    var fileBuffer = fs.readFileSync(fileName);
    var metaData = getContentTypeByFile(fileName);
    console.log('AWS uploader received order: remoteFilename: '+remoteFilename+" fileName: "+fileName);
    s3.putObject({
        ACL: 'public-read',
        Bucket: BUCKET_NAME,
        Key: remoteFilename,
        Body: fileBuffer,
        ContentType: metaData
    }, function (error, response) {
        console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
        fs.unlink(fileName, function (err) {
            if (err) throw err;
            console.log('successfully deleted: '+ fileName);
        });
    });

    return "https://s3-us-west-2.amazonaws.com/" + BUCKET_NAME + "/" + remoteFilename;
};

function getContentTypeByFile(fileName) {
    var rc = 'application/octet-stream';
    var fileNameLowerCase = fileName.toLowerCase();

    if (fileNameLowerCase.indexOf('.html') >= 0) rc = 'text/html';
    else if (fileNameLowerCase.indexOf('.css') >= 0) rc = 'text/css';
    else if (fileNameLowerCase.indexOf('.json') >= 0) rc = 'application/json';
    else if (fileNameLowerCase.indexOf('.js') >= 0) rc = 'application/x-javascript';
    else if (fileNameLowerCase.indexOf('.png') >= 0) rc = 'image/png';
    else if (fileNameLowerCase.indexOf('.jpg') >= 0) rc = 'image/jpg';
    else if (fileNameLowerCase.indexOf('.mp4') >= 0) rc = 'video/mp4';

    return rc;
}

module.exports = uploadVideo;