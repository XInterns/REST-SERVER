var http = require('http');
var url = require('url');
var data = require('./data.json');  //database file
var temp;
http.createServer(function (request, response) {     //inline declaration of function
  const {pathname,query} = url.parse(request.url);
  console.log("DECODED QUERY- "+query); //decoded query
  var query_list= query.split('&'); //separate the joined queries
  var result=data;
  var a=query_list.length;
  var pairs;   //key-value pairs
  var q;   //stores the individual queries
  for(var i=0;i<a;i++)
  {   if((query_list[i].includes("=%27")) || (query_list[i].includes("=%22")))  // if it includes =" or ='
      {
          pairs=query_list[i].split("=");   //eg name="a"
          q=decodeURI(pairs[1]).slice(1,-1);    //decoding the value portion   //reomoving the inverted commas
          result=result.filter(function (wor) {
            if(wor[pairs[0]]!='unknown' && wor[pairs[0]]!='n/a'){  //if there is a value
              return wor[pairs[0]].includes(q);
            }
      });
     }
    else{
        pairs=query_list[i].split("=");
        q=decodeURI(pairs[1]) ;
        var o=JSON.parse(q);
        if(pairs[1].includes("lt")==true&&pairs[1].includes("gt")==true)
                result=result.filter(result=>((parseInt(result[pairs[0]])<parseInt(o.lt))&&(parseInt(result[pairs[0]])>parseInt(o.gt))));  
              else 
                if(pairs[1].includes("gt"))
                  result=result.filter(temp=>parseInt(temp[pairs[0]])>parseInt(o.gt));    
                else
                  result=result.filter(temp=>(parseInt(temp[pairs[0]])<parseInt(o.lt)));    
 }
}   // console.log("pathname", pathname); console.log("queryParameters", query); 
     if(result.length==0)  // if data isnt found
     { response.writeHead(404, {   //error code
       'Content-type': 'application/JSON'});
       response.end();
     }
     else{
     response.writeHead(200, { 'Content-type': 'application/JSON'});    //search successful 
     response.write(JSON.stringify(result,null,'\t '));  //displaying the result
    response.end();
     }
   }).listen(7000);
