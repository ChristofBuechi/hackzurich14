/**
 * Created by christof on 11.10.14.
 */

var BUCKET_NAME = 'foovie';

var fs = require('fs');

var aws = require('aws-sdk');
aws.config.loadFromPath('./AwsConfig.json');

var s3 = new aws.S3();


var uploadVideo = function (remoteFilename, fileName) {
    var fileBuffer = fs.readFileSync(fileName);
    var metaData = getContentTypeByFile(fileName);

    s3.putObject({
        ACL: 'public-read',
        Bucket: BUCKET_NAME,
        Key: remoteFilename,
        Body: fileBuffer,
        ContentType: metaData
    }, function (error, response) {
        console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
        console.log(arguments);
    });

    return "https://s3-us-west-2.amazonaws.com/" + BUCKET_NAME + "/" + fileName;
};

module.exports = uploadVideo;