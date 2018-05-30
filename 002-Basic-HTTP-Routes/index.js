var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {  
  

  const {pathname,query} = url.parse(request.url);

  var query_list= query.split('&');
  var filter_query=data;
  var p_name = new Array();

  console.log("pathname:", pathname);
  console.log("queryParameters:", query);
  console.log("query-list:",query_list);

  for(j=0;j<query_list.length;j++){

    var q;

    if(query_list[j].includes('=')){
      q=query_list[j].split('=');
      //console.log(q);
      if( q[1].includes('%22') || q[1].includes('%27')){
      q[1] = q[1].slice(3,-3);
      
      filter_query = filter_query.filter( x => x[q[0]].includes(q[1]))   
      p_name.push(q[0]);
      }
      else{
        filter_query = filter_query.filter( x => x[q[0]]==parseInt(q[1]));
        p_name.push(q[0]);

      }      

    }
    else if(query_list[j].includes('%3E')){
      q = query_list[j].split('%3E');
      console.log(q);
      filter_query = filter_query.filter( x => x[q[0]]>parseInt(q[1]));
      p_name.push(q[0]);

      
    }

    else if(query_list[j].includes('%3C')){
      q = query_list[j].split('%3C');
      console.log(q);
      filter_query = filter_query.filter( x => x[q[0]]<parseInt(q[1]));   
      p_name.push(q[0]);
  
    }
   
  }

   filter_query = filter_query.map(  filter_query => {
     y={};
     
     // y['name'] = filter_query['name'];
     for(i =0;i<p_name.length;i++){
       y[p_name[i]] = filter_query[p_name[i]];

     }     
      return y;
     
   });

   console.log(filter_query);

   if(filter_query.length>0){
    response.writeHead(200, {
      'Content-type': 'text/plain'
    });
    response.write(' Status returned: 200\n');

    response.write("The Object returned are: "+JSON.stringify(filter_query,null,'\t'));
    
   }
   else{
     response.writeHead(404);
     response.write("Error 404: Data not found");
   }

response.end();  

}).listen(7000);