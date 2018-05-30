var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {
  const {pathname,query} = url.parse(request.url);
  var list_query=query.split("&");
  var object=data;
  var key_value;
  var obj;
  var string;
  for(var query_loop=0;query_loop<list_query.length;query_loop++)
      {
            if(list_query[query_loop].includes("=%27")==true)
            {
              key_value=list_query[query_loop].split("=");
              string=decodeURI(key_value[1]);
              string=string.slice(1,-1);
              object = object.filter(function (task) {
                if(task[key_value[0]]!='unknown'&&task[key_value[0]]!='n/a'){
                  return task[key_value[0]].includes(string);
                }
            });
            }
            else
            {
              key_value=list_query[query_loop].split("=");
              string=decodeURI(key_value[1]);
              var y=JSON.parse(string);
             if(key_value[1].includes("lt")==true&&key_value[1].includes("gt")==true)
                object=object.filter(object=>((parseInt(object[key_value[0]])<parseInt(y.lt))&&(parseInt(object[key_value[0]])>parseInt(y.gt))));  
              else 
                if(key_value[1].includes("gt"))
                  object=object.filter(obj=>parseInt(obj[key_value[0]])>parseInt(y.gt));    
                else
                  object=object.filter(obj=>(parseInt(obj[key_value[0]])<parseInt(y.lt)));    
            }
          }      
  console.log("pathname", pathname);
  console.log("queryParameters", query); 
  if(object.length==0)
  {
    console.log('\nInside this');
  response.writeHead(404, {
    'Content-type': 'text/JSON'
  });
    response.end();
  }
  else{
  response.writeHead(200, {
    'Content-type': 'text/JSON'});
  response.write(JSON.stringify(object,null,'\t '));
 response.end();
  }
}).listen(7000);