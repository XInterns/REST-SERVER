var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {
  
  
  const {pathname,query} = url.parse(request.url);
  
  //spliting the query
  var and=query.split("&");
  console.log(and);

  //slicing and storing value into variable
  var q1=and[0];
  console.log(q1);
  var qu1=q1.slice(8,-3);
  console.log(qu1);

  var q2=and[1];
  console.log(q2);
  var qu2=q2.slice(7,-3);
  console.log(qu2);

  //using filter and checking condition
  var fi = data.filter(isa);

  function isa(value) {
  
    if((value.name.indexOf(qu1) > -1)&&(value.mass > qu2))
    {
      return value.name;
    }
  }

  //using map to display only name and mass
  var out = fi.map(fi => 
  {
    y={};
  
    y.name=fi.name;
    y.mass=fi.mass;

    return y;
  })

  //printing final result on terminal
  console.log(out);
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  

  if(out.length<=0)
  {
    response.writeHead(404, {
      'Content-type': 'text/plain'
    });
    
    response.write('Error:200');
    
  }
  else
  {
    response.writeHead(200, {
      'Content-type': 'text/plain'
    });
    
    response.write('Status:200');
    
  }
  response.end();

}).listen(7000);