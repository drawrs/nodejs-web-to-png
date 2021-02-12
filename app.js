var express = require('express')
var http = require('http')
var url = require('url')
var fs = require('fs')
const puppeteer = require('puppeteer')

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  var q = url.parse(request.url, true).query;
  var encodedUrl = q.encodedUrl;

  var decoded = new Buffer.from("" + encodedUrl, 'base64').toString('ascii');
  console.log(decoded);

  var currentPath = process.cwd();
  console.log(currentPath);
  
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1500,
      height: 1500,
      deviceScaleFactor: 1,
    });

    await page.goto(decoded);
    await page.screenshot({ path: 'example2.png' });
    await browser.close();
    console.log("im here");

    var filepath = currentPath + '/example2.png'
    response.sendFile(filepath);

  })();

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})