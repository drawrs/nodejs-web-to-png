var express = require('express')
var http = require('http')
var url = require('url')
var fs = require('fs')

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  var q = url.parse(request.url, true).query;
  var encodedUrl = q.encodedUrl;

  var decoded = new Buffer.from("" + encodedUrl, 'base64').toString('ascii');
  console.log(decoded);
  // response.send('Hello World! ' + decoded)
  var currentPath = process.cwd();
  console.log(currentPath);
  var filepath = currentPath + '/example.png'
  response.sendFile(filepath);

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})