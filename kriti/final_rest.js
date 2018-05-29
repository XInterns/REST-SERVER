var http = require('http');
var url = require('url');
var data1 = require('./data.json');

http.createServer(function (request, response) {


const {pathname,query} = url.parse(request.url);
var data=data1;

//spliting the query
var and=query.split("&");
console.log(and); 

//slicing and storing value into variable
var f=[];
var g=[];
var sign=[];
for(i=0;i<and.length;i++)
{
 
  var q=and[i];
  //console.log(q);
     if(q.includes("="))
  {
    var qu=q.split("=");
    //var na=qu[1].slice(3,-3);
    f.push(qu[1]);
    g.push(qu[0]);
   // console.log(f);
   sign.push(0);
  }
  else
  if(q.includes("%3E"))
  {
    var qu=q.split("%3E");
    f.push(qu[1]);
    g.push(qu[0]);
    sign.push(1);

   // console.log(f);
  }
  else
  if(q.includes("%3C"))
  {
    var qu=q.split("%3C");
    f.push(qu[1]);
    g.push(qu[0]);
    sign.push(-1);
  }
 
}
console.log(f);
console.log(g);
var sf, di;


for(j=0;j<f.length;j++)
  {
 
     data = data.filter(isa);      
     function isa(value)
     {
   
      var ai=g[j];
     //console.log(value[ai]);
     if(f[j].includes("%27")||f[j].includes("%22"))
     {
         st=f[j].slice(3,-3);
   
         if(value[ai].indexOf(st) != -1)
          {
              return value[ai];      
          }
       
     }
     else{
         
         di=parseInt(f[j]);
         if(sign[j]==1){
         if(value[ai] > di)
          {
              //console.log('\n sign is '+sign[j]);
              //console.log('\n'+)
              return value[ai];
          }
        }else
        if(sign[j]==-1)
          if(value[ai] < di)
          {
              return value[ai];
          }
     }
  }
}


//using map to display only name and mass
var out = data.map(fi =>
{
  y={};
/*
  y.name=fi.name;
  y.mass=fi.mass;
  y.height=fi.height;
  */
  for(var loop=0;loop<g.length;loop++)
  {
      y.name=fi.name;
      y[g[loop]]=fi[g[loop]];
  }
  return y;
}) 

//printing final result on terminal
console.log(out);
//console.log(fi);
console.log("pathname", pathname);
console.log("queryParameters", query);
if(out.length<=0)
{
  response.writeHead(404, {
    'Content-type': 'text/plain'
  });
 
  response.write('Error:200');
 
}
else
{
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });

  response.write('\nStatus:200\n');
  for(var print_loop=0;print_loop<out.length;print_loop++)
  {
      response.write('\n\n\n\nRecord '+(print_loop+1));
      for(var print_query=0;print_query<f.length;print_query++)
      {
         response.write('\n'+g[print_query]+'  '+out[print_loop][g[print_query]]);
      }


  }
  
 
}
response.end();
}).listen(7000);