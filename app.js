var express = require('express')
var http = require('http')
var url = require('url')
var fs = require('fs')
const puppeteer = require('puppeteer')

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(request, response) {
  var q = url.parse(request.url, true).query;
  var encodedUrl = q.encodedUrl;

  var decoded = new Buffer.from("" + encodedUrl, 'base64').toString('ascii');
  console.log(decoded);

  var currentPath = process.cwd();
  console.log(currentPath);
  
  (async () => {
    const chromeOptions = {
        headless: true,
        defaultViewport: null,
        args: [
            "--no-sandbox"
        ],

    };
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1500,
      height: 1500,
      deviceScaleFactor: 1,
    });

    await page.goto(decoded, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'example2.jpeg', type: 'jpeg', quality: 60 });
    await browser.close();
    console.log("im here got it");

    var filepath = currentPath + '/example2.jpeg'
    response.sendFile(filepath);

  })();

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})