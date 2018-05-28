var http = require('http');
var url = require('url');
var data = require('./data.json');
var array = [];
var flag=false;
http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  
  //response.end();
  



  const {pathname,query} = url.parse(request.url);
  console.log(data[0].name);
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  
  if(pathname=="/people"){
    if (query.indexOf("name") >=0 && !(query.indexOf("mass")>=0))
    {

      var i;
      var a=query.indexOf("%22");
      var b=query.indexOf("%22",a+1);
      
      var s=query.slice(a+3,b);
      for(i=0;i<data.length;i++)
      
      {
         var ap=data[i].name;
         if(ap.indexOf(s)>=0){
           flag=true;
           array.push(data[i]);
         }
      }
     
    }
    else if(query.indexOf("mass")>=0 && !(query.indexOf("name") >=0))
    {
      var i;
      var s=query.slice(7);
      
      if(query.includes("%3E"))
      {
        
        for(i=0;i<data.length;i++)
      
      {
         var ap=data[i].mass;
         
         if(parseInt(ap)>parseInt(s) &&  ap!="unknown")
         {
           flag=true;
           array.push(data[i]);
         }
      }
      }
      else if(query.includes("%3C"))
      {
        for(i=0;i<data.length;i++)
      
      {
         var ap=data[i].mass;
         
         if(parseInt(ap)<parseInt(s) && ap!="unknown")
         {
           flag=true;
           array.push(data[i]);
         }
      }
      }
      
    }
    else if(query.indexOf("name") >=0 && query.indexOf("mass")>=0)
    {
      
      var i;
      var a=query.indexOf("%22");
      var b=query.indexOf("%22",a+1);
      
      var s=query.slice(a+3,b);

      if(query.indexOf("%3E")>=0)
      {
        var c=query.indexOf("%3E");
        var d;
        if(query.indexOf("name")<query.indexOf("mass"))
        {
          d=query.slice(c+3);
          
        }
        else{
          var e = query.indexOf("&");
          d= query.slice(c+3,e);
        }
     
        for(i=0;i<data.length;i++)
      
       {
         var ap=data[i].name;
         if(ap.indexOf(s)>=0 && parseInt(data[i].mass)>parseInt(d)){
           flag=true;
           array.push(data[i]);
         }
       }


      }
      if(query.indexOf("%3C")>=0)
      {
        var c=query.indexOf("%3C");
        var d;
        if(query.indexOf("name")<query.indexOf("mass"))
        {
          d=query.slice(c+3);
         
        }
        else{
          var e = query.indexOf("&");
          d= query.slice(c+3,e);
        }
       
        for(i=0;i<data.length;i++)
      
       {
         var ap=data[i].name;
         if(ap.indexOf(s)>=0 && parseInt(data[i].mass)<parseInt(d)){
           flag=true;
           array.push(data[i]);
         }
       }

      }
      
    }
  }

  
  if(flag==false){
    
    response.writeHead(400, {
      'Content-type': 'text/plain'
      
    });
    console.log("sdf");
    response.write('400 Error\n');
    response.end();
  }
  
  else{
  response.writeHead(200,{
    'Content-type':'text/plain'
  });
  response.write('Hello Node JS Server Response\n');
  response.write('200\n');
  
  flag=0;
  var ii;
  for(ii=0;ii<array.length;ii++){
    response.write(array[ii].name+ "-"+array[ii].mass+"\n");
  }
  array=[];
  response.end();
}
}).listen(7000);
