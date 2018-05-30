var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {

  const {pathname,query} = url.parse(request.url);
  console.log(query);
  //variable list_query is used to store queries in an array, if there are multiple queries
  var list_query=query.split("&");
  var results=[];
  var object=data;
  var key_value=[];
  for(var query_loop=0;query_loop<list_query.length;query_loop++)
      {
            if(list_query[query_loop].includes("=%27")==true)
            {
              key_value[query_loop]=list_query[query_loop].split("=%27");
              key_value[query_loop][1]=key_value[query_loop][1].slice(0,-3);
              object = object.filter(function (task) {
                if(task[key_value[query_loop][0]]!='unknown'&&task[key_value[query_loop][0]]!='n/a')
                return task[key_value[query_loop][0]].includes(key_value[query_loop][1]);
            });
            }
            else
            if(list_query[query_loop].includes("%3E")==true)
            {
              key_value[query_loop]=list_query[query_loop].split("%3E");
                object=object.filter(object=>parseInt(object[key_value[query_loop][0]])>parseInt(key_value[query_loop][1]));    
            }
            else
            if(list_query[query_loop].includes("%3C")==true)
            {
              key_value[query_loop]=list_query[query_loop].split("%3C");
                object=object.filter(object=>parseInt(object[key_value[query_loop][0]])<parseInt(key_value[query_loop][1]));
            }
            else
            if(list_query[query_loop].includes("=")==true)
            {
              key_value[query_loop]=list_query[query_loop].split("=");
                object=object.filter(object=>parseInt(object[key_value[query_loop][0]])==parseInt(key_value[query_loop][1]));    
            }
          }
  console.log('\nTotal recordds found are '+object.length);
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  var object = object.map(
    obj =>{
      y={};
      for(var loop=0;loop<key_value.length;loop++)
      {
          y.name=obj.name;
          y[key_value[loop][0]]=obj[key_value[loop][0]];
      }
      return y;
    }) 
  if(object.length==0)
  {
  response.writeHead(404, {
    'Content-type': 'text/plain'
  });
    response.end('Error 404  \n Requested Data isn\'t found');
  }  
  response.writeHead(200, {
    'Content-type': 'text/plain'});
  response.write(JSON.stringify(object,null,'\t '));
 response.end();
}).listen(7000);