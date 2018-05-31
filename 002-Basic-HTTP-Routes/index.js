var http = require('http');
var url = require('url');
var data = require('./data.json');
http.createServer(function (request, response) {   

  const {pathname,query} = url.parse(request.url);

  var query_list= query.split('&');
  var filter_query=data;

  for(j=0;j<query_list.length;j++){

    query_list[j]= decodeURI(query_list[j]);

    var q;
    q=query_list[j].split('=');
    var offset;
    if(query_list[j].includes('="') || query_list[j].includes("='")){
      q[1] = q[1].slice(1,-1);      
      filter_query = filter_query.filter( x => x[q[0]].includes(q[1]))           
    }    

    else{
        q[1] = JSON.parse(q[1]);
        if( q[1].lt != null && q[1].gt != null){
            filter_query = filter_query.filter( x => x[q[0]]<parseInt(q[1].lt) && x[q[0]]>parseInt(q[1].gt));
        }
        else if( q[1].lt == null){
            filter_query = filter_query.filter( x =>  x[q[0]]>parseInt(q[1].gt));
        }
        else{
            filter_query = filter_query.filter( x =>  x[q[0]]<parseInt(q[1].lt));
        }
    }  
  }
   if(filter_query.length>0){
    response.writeHead(200, {
      'Content-type': 'application/json'
    });
       response.write(JSON.stringify(filter_query,null,'\t'));    
   }
   else{
    response.writeHead(404, {
      'Content-type': 'application/json'
    });     
     response.write(JSON.stringify(filter_query,null,'\t'));
   }
response.end();  
}).listen(7000);