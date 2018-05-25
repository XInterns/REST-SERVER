var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  response.write('Hello Node JS Server Response');
  response.end();

  const {pathname,query} = url.parse(request.url);
  console.log(data);
  console.log("pathname", pathname);
  console.log("queryParameters", query);

}).listen(7000);