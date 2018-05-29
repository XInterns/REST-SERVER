var http = require('http');
var url = require('url');
var data = require('./data.json');  //database file

http.createServer(function (request, response) {
  const {pathname,query} = url.parse(request.url);

  var query_list= query.split('&'); //separate the joined queries
  var filter_query=data;

  console.log("pathname:", pathname);
  console.log("queryParameters:", query);
  console.log("query-list:",query_list);

   var l=query_list.length;
   var i=0;
   while(i<l)
   {
    if(query_list[i].includes('='))
    {
         var con_list=query_list[i].split('='); //separating the name and the value
         var first = con_list[0];
         //console.log("conlist1="+con_list[1]);

         if(con_list[1].includes('%22')|con_list[1].includes('%27'))
         { // if the value to be checked is a string
             // console.log("Entered if");
         second=  con_list[1].slice(3,-3); //just taking a value
         }
         else second=con_list[1];
         console.log(first);   //name
         console.log(second);  //a    
          filter_query=filter_query.filter( x =>x[first].includes(second));

    } 

      else if(query_list[i].includes('%3E')) // means >
    {
      var con_list=query_list[i].split('%3E'); //separating the name and the value
         var first = con_list[0];
         second=  con_list[1].slice(-3); //just taking a value
         console.log(first);   //name
       var value = parseInt(second); //the value to be found

       console.log(value);
        filter_query = filter_query.filter( x => x[first] > value) ;
   
      }
    if( query_list[i].includes('%3C'))  // <
      {  //means <
          var con_list=query_list[i].split('%3C'); //separating the name and the value
         var first = con_list[0];
         second=  con_list[1].slice(-3); //just taking a value
         console.log(first);   //name
        // console.log(second);  //a
          var value = parseInt(second); //the value to be found

          console.log(value);
         filter_query = filter_query.filter(x => x[first] < value).map; /*( x => {
          y={};
          y.name = x.name;
          y.mass = x.mass;
          return y;
        });        */
      }
    i++; 
    }
    var result= filter_query.map( x => {
      y={};
      y.name = x.name;
      y.mass = x.mass;
      y.height= x.height;
  /*    response.write("Answer :"+y.prototype.toString(y.name));*/
      return y;
    });        
  console.log("\n",result);
  if(filter_query.length>0){  //if there is some output
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  response.write(' Status returned: 200 ->Successful');
  //response.write("Answer :"+y.prototype.toString(y.name));
  response.end();
}
else{
  response.writeHead(400, {  //if no matching data is found
    'Content-type': 'text/plain'
  });
  response.write('Error 404 ->Data not found');
  response.end();
}
}).listen(2000);
