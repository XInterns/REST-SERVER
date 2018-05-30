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
<<<<<<< HEAD
    if (query.indexOf("name=") >=0 && !(query.indexOf("mass")>=0))
    {

      var i;
      var a=query.indexOf("%22");
      var b=query.indexOf("%22",a+1);
      
      var s=query.slice(a+3,b);
=======
    if (query.indexOf("name") >=0 && !(query.indexOf("mass")>=0))
    {

      var i;
      var s=query.slice(8,-3);
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
      for(i=0;i<data.length;i++)
      
      {
         var ap=data[i].name;
         if(ap.indexOf(s)>=0){
           flag=true;
<<<<<<< HEAD
           array.push(data[i]);
=======
           array.push(ap);
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
         }
      }
     
    }
<<<<<<< HEAD
    else if(query.indexOf("mass>")>=0 ||query.indexOf("mass<")>=0&& !(query.indexOf("name=") >=0))
=======
    else if(query.indexOf("mass")>=0 && !(query.indexOf("name") >=0))
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
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
<<<<<<< HEAD
           array.push(data[i]);
=======
           array.push(data[i].name);
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
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
<<<<<<< HEAD
           array.push(data[i]);
=======
           array.push(data[i].name);
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
         }
      }
      }
      
    }
<<<<<<< HEAD
    else if(query.indexOf("name=") >=0 && (query.indexOf("mass>")>=0|| query.indexOf("mass<")>=0))
=======
    else if(query.indexOf("name") >=0 && query.indexOf("mass")>=0)
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
    {
      
      var i;
      var a=query.indexOf("%22");
      var b=query.indexOf("%22",a+1);
      
      var s=query.slice(a+3,b);

      if(query.indexOf("%3E")>=0)
      {
        var c=query.indexOf("%3E");
        var d;
<<<<<<< HEAD
        if(query.indexOf("name=")<query.indexOf("mass"))
=======
        if(query.indexOf("name")<query.indexOf("mass"))
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
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
<<<<<<< HEAD
           array.push(data[i]);
=======
           array.push(ap);
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
         }
       }


      }
      if(query.indexOf("%3C")>=0)
      {
        var c=query.indexOf("%3C");
        var d;
<<<<<<< HEAD
        if(query.indexOf("name=")<query.indexOf("mass"))
=======
        if(query.indexOf("name")<query.indexOf("mass"))
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
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
<<<<<<< HEAD
           array.push(data[i]);
=======
           array.push(ap);
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
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
<<<<<<< HEAD
    'Content-type':'application/json'
  });
=======
    'Content-type':'text/plain'
  });
  response.write('Hello Node JS Server Response\n');
>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
  response.write('200\n');
  
  flag=0;
  var ii;
  for(ii=0;ii<array.length;ii++){
<<<<<<< HEAD
    response.write(JSON.stringify(array[ii])+"\n");
    
  }
  
  array=[];
  response.end();
}

}).listen(7000);
=======
    response.write(array[ii]+ "\n");
  }
  response.end();
}
}).listen(7000);


>>>>>>> e0719ca9fefefa4e427e4193b271413b30c5444f
