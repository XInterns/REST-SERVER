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

              console.log("\nDone till here");
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
          console.log('\nLoop is runnning for '+query_loop+' times');
          }
  console.log('\nTotal recordds found are '+object.length);
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  if(object.length==0)
  {
  response.writeHead(404, {
    'Content-type': 'text/plain'
  });
    response.write('Error 404  \n Requested Data isn\'t found');
    response.end();
  }  
  response.writeHead(200, {
    'Content-type': 'text/plain'});

  for(var count_response=0;count_response<object.length;count_response++)
  {
    response.write("\n\nRecord "+(count_response+1)+'\n');
    response.write('Name :-'+object[count_response].name);
    for(var count_query=0;count_query<list_query.length;count_query++)
    {
      if(key_value[count_query][0]!='name')
      response.write('\n'+key_value[count_query][0]+' :- '+object[count_response][key_value[count_query][0]]+'\t');
     }
  }
 response.end();
}).listen(7000);