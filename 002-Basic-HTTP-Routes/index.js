var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {  
  

  const {pathname,query} = url.parse(request.url);

  var query_list= query.split('&');
  var filter_query=data;

  console.log("pathname:", pathname);
  console.log("queryParameters:", query);
  console.log("query-list:",query_list);

  for(j=0;j<query_list.length;j++){

    var q;

    if(query_list[j].includes('=')){
      q=query_list[j].split('=');
      console.log(q);
      if( q[1].includes('%22') || q[1].includes('%27')){
      q[1] = q[1].slice(3,-3);
      
      filter_query = filter_query.filter( x => x[q[0]].includes(q[1]))   

      }
      else{
        filter_query = filter_query.filter( x => x[q[0]]==parseInt(q[1]));
      }      

    }
    else if(query_list[j].includes('%3E')){
      q = query_list[j].split('%3E');
      console.log(q);
      filter_query = filter_query.filter( x => x[q[0]]>parseInt(q[1]));
      
    }

    else if(query_list[j].includes('%3C')){
      q = query_list[j].split('%3C');
      console.log(q);
      filter_query = filter_query.filter( x => x[q[0]]<parseInt(q[1]));     
    }
   
  }

   filter_query=filter_query.map(  filter_query => {
     y={};
     
     y.name = filter_query.name;
     y.height = filter_query.height;
     y.mass = filter_query.mass;
     y.hair_color = filter_query.hair_color;
     y.skin_color = filter_query.skin_color;
     y.eye_color = filter_query.eye_color;
     y.gender = filter_query.gender;
     
      return y;
     
   });

   console.log(filter_query);

   if(filter_query.length>0){
    response.writeHead(200, {
      'Content-type': 'text/plain'
    });
    response.write(' Status returned: 200');
   }
   else{
     response.writeHead(404);
     response.write("Error 404");
   }

response.end();  

}).listen(7000);