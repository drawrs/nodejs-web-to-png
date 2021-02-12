var http = require('http');
var url = require('url');
var fs = require('fs');
const puppeteer = require('puppeteer');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'image/png' });
    var q = url.parse(req.url, true).query;
    var encodedUrl = q.encodedUrl;

    var decoded = new Buffer.from("" + encodedUrl, 'base64').toString('ascii');
    console.log(decoded);
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: 1500,
        height: 1500,
        deviceScaleFactor: 1,
      });

      await page.goto(decoded);
      await page.screenshot({ path: 'example.png' });
      await browser.close();
      var img = fs.readFileSync('example.png');
      res.end(img, 'binary');

      // res.end();
    })();

}).listen(8080);