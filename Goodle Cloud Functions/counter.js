// Open a file in a given bucket,
// read it, add 1, write it back,
// and return the new number

exports.counter = function counter(req, res) {

  var gcs = require('@google-cloud/storage')({
    projectId: 'take-5-XXXXXX', // Replace with your projectId
  });

  const fs = require('fs');


  const bucketName = "wing-test-2";
  const counterFile = "counting.txt";

  var data = '';

  function getCounter(bucketName, counterFile, callback) {
    var wt1 = gcs.bucket(bucketName);
    var remoteFile = wt1.file(counterFile);
    var rstream = remoteFile.createReadStream();
    rstream.setEncoding('utf8')
      .on('error', function(err) {
        console.log(err);
        callback(err);
      })
      .on('response', function(res) {})
      .on('data', function(chunk) {
        data += chunk;
      })
      .on('end', function() {
        let count = parseInt(data);
        callback(null, count);
      })
  }

  function setCounter(bucketName, counterFile, n) {
    var wt1 = gcs.bucket(bucketName);
    var remoteFile = wt1.file(counterFile);
    var wstream = remoteFile.createWriteStream();
    wstream.setEncoding('utf8');
    wstream.write("" + n);
    wstream.end();
  }


  getCounter(bucketName, counterFile, (err, n) => {
    if (!err) {
      console.log("n=", n);
      console.log("n+1=", n + 1);
      setCounter(bucketName, counterFile, n + 1);
      res.status(200).send(JSON.stringify({
        counter: n
      }));
    } else {
      console.log(err);
    }
  });
}