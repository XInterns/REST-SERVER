var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {

  const {pathname,query} = url.parse(request.url);

  //variable list_query is used to store queries in an array, if there are multiple queries
  var list_query=query.split("&");

  console.log("\nTotal queries are "+list_query.length);

  var results=[];

      //This section works, when there are multiple queries in same link
      
      //variable data_loop is used to iterate over all the records in data(JSON) file
      
      for(var data_loop=0;data_loop<data.length;data_loop++)
      {

        /*
        In this section we will, for each existing record, check wheather it satisfy all the 
        query condtions
        */
        var flag=1;           
        var sign;
        var key_value=[];
        var name_of_character=data[data_loop].name;
          for(var query_loop=0;query_loop<list_query.length&&flag==1;query_loop++)
          {
          
          if(list_query[query_loop].includes("=%27")==true)
          {
            key_value[query_loop]=list_query[query_loop].split("=%27");
            key_value[query_loop][1]=key_value[query_loop][1].slice(0,-3);
            sign=2;
          }
          else
          if(list_query[query_loop].includes("%3E")==true)
          {
            key_value[query_loop]=list_query[query_loop].split("%3E");
              sign=1;
          }
          else
          if(list_query[query_loop].includes("%3C")==true)
          {
            key_value[query_loop]=list_query[query_loop].split("%3C");
              sign=-1;
          }
          else
          if(list_query[query_loop].includes("=")==true)
          {
            key_value[query_loop]=list_query[query_loop].split("=");
              sign=0;
          }
          switch(sign)
              {
                case 2:
                  if((data[data_loop][key_value[query_loop][0]])=="n/a"||(data[data_loop][key_value[query_loop][0]])=="unknown")
                    flag=0;
                  else
                    if((data[data_loop][key_value[query_loop][0]]).includes(key_value[query_loop][1])==false)
                        flag=0;
                    break;
                case 1:
                   var val1=data[data_loop][key_value[query_loop][0]];
                    var val2=key_value[query_loop][1];
                    val1=parseInt(val1);
                    val2=parseInt(val2);
                  if(isNaN(val1)||isNaN(val2))
                    {
                    console.log("NaN found");
                    flag=0;
                    }
                    if((val1)<=(val2))
                        flag=0;
                    break;
                case -1:
                   var val1=data[data_loop][key_value[query_loop][0]];
                    var val2=key_value[query_loop][1];
                    val1=parseInt(val1);
                    val2=parseInt(val2);
			
                      if(isNaN(val1)||isNaN(val2))
                        {
                        console.log("NaN found");
                        flag=0;
                        }
                    if((val1)>=(val2))
                        flag=0;
                    break;
                case 0:
                    
                    var val1=data[data_loop][key_value[query_loop][0]];
                    var val2=key_value[1];
                    val1=parseInt(val1);
                    val2=parseInt(val2);
			
                      if(isNaN(val1)||isNaN(val2))
                        {
                        console.log("NaN found");
                        flag=0;
                        }
                    if((val1)!=(val2))
                        flag=0;
                      break;
              } 
          }
          if(flag==1)
            results.push(data_loop);
      }
  
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  if(results.length==0)
  {
  response.writeHead(404, {
    'Content-type': 'text/plain'
  });
    response.write('Error 404  \n Requested Data isn\'t found');
    response.end();
  }  
  response.writeHead(200, {
    'Content-type': 'text/plain'});

  for(var count_response=0;count_response<results.length;count_response++)
  response.write(data[results[count_response]].name+'\n');
  response.end();

}).listen(7000);
