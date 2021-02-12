var http = require('http');
const puppeteer = require('puppeteer');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Hello coy");
    res.end(response);
    
});
server.listen();
