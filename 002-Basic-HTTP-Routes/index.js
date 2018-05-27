var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {
  
  

  const {pathname,query} = url.parse(request.url);

  var query_list= query.split('&');
  var filter_query;

  console.log("pathname:", pathname);
  console.log("queryParameters:", query);
  console.log("query-list:",query_list);

  if(query_list.length==1){    

    if(query_list[0].includes('name')){
      
      var q_parameter=query_list[0].slice(8,-3);

      
      filter_query=data.filter( data => 
      data['name'].includes(q_parameter)).map( data => data.name);

    }

    else if(query_list[0].includes('mass')){

      var value = query_list[0].slice(7);
      var value = parseInt(value);

//      console.log(value);

      if( query_list[0].includes('%3E')){

        filter_query = data.filter( data => data['mass'] > value).map( data => {
          y={};
          y.name = data.name;
          y.mass = data.mass;
          return y;
        });

       
        
      }

      if( query_list[0].includes('%3C')){

        filter_query = data.filter( data => data['mass'] < value).map( data => {
          y={};
          y.name = data.name;
          y.mass = data.mass;
          return y;
        });

        
        
      }
    }
    
  }

  else if(query_list.length=2){
    var q_name=query_list[0].slice(8,-3);
    var value = query_list[1].slice(7);
    var value = parseInt(value);

    if(query_list[1].includes('%3E')){
      filter_query= data.filter( data => data['name'].includes(q_name) && data['mass']>value).map( data => {
        y={};
        y.name=data.name;
        y.mass=data.mass;
        return y;
      });
    }

    if(query_list[1].includes('%3C')){
      filter_query= data.filter( data => data['name'].includes(q_name) && data['mass']<value).map( data => {
        y={};
        y.name=data.name;
        y.mass=data.mass;
        return y;
      });
      
    }
  }

  console.log("\n",filter_query);

  if(filter_query.length>0){
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  response.write(' Status returned: 200');
  response.end();
}
else{
  response.writeHead(400, {
    'Content-type': 'text/plain'
  });
  response.write('Error 404');
  response.end();
}
  

}).listen(7000);
