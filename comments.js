// Create web server
// Run: node comments.js
// Open browser and navigate to localhost:3000
// Post some comments and see the result

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  if (request.method == 'POST') {
    console.log("[200] " + request.method + " to " + request.url);
    var body = '';
    request.on('data', function (data) {
        body += data;
        console.log("Partial body: " + body);
    });
    request.on('end', function () {
        var post = qs.parse(body);
        console.log("Body: " + body);
        console.log("Name: " + post.name);
        console.log("Email: " + post.email);
        fs.appendFile('comments.txt', post.name + ', ' + post.email + '\n', function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    });
  }
  else {
    console.log("[405] " + request.method + " to " + request.url);
    response.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
    response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
  }
  fs.readFile('index.html', function(err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
});

// Listen on port 3000, IP defaults to