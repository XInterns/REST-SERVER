var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  response.write('Hello Node JS Server Response\n');
  response.write('\n');
 

  const {pathname,query} = url.parse(request.url);
  console.log(data);
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  
  
   if((pathname=='/people'&& query.indexOf("mass")!=-1 && query.indexOf("name")!=-1))
   {  
     if(query.indexOf('n')<query.indexOf('m'))
    { 
     var i,j;
     
    if(query.includes("%3E"))
    {
       var pairs=query.split("%27");
     //var pair=query.split(pairs[1])
     var name1=pairs[1];
     /*for( j=0;j<pairs.length;j++)
      {
        var pair=pairs[1].split("");*/
      
      var pair=pairs[2].split("%3E");
        var mass1=parseInt(pair[1]);
      
        var c=0; var s=0;
        for(i=0;i<data.length;i++)
        { 
       
          if(data[i].mass>mass1 && data[i].name.includes(name1))
          {  c=1;
             if(s==0)
            {
            response.write("200"+'\n');
            s=1;
            }
          
            response.write(data[i].name+"  ");
            response.write(data[i].mass+'\n');
          }
        }
        
      }
    }  
      
      else if(query.includes("%3C"))
      {  
        var pairs=query.split("%27");
        //var pair=query.split(pairs[1])
         var name1=pairs[0];
         var pair=pairs[1].split("%3C");
         var mass1=parseInt(pair[1]);
          var i;
         var c=0; var s=0;
         for(i=0;i<data.length;i++)
         { 
        
           if(data[i].mass<mass1 && data[i].name.includes(name1))
           {  c=1;
              if(s==0)
             {
             response.write("200"+'\n');
             s=1;
             }
           
             response.write(data[i].name+"  ");
             response.write(data[i].mass+'\n');
           }
         }
         
       }
       else 
       {  
         var pairs=query.split("%27");
         //var pair=query.split(pairs[1])
          var name1=pairs[1];
          var pair=pairs[2].split("=");
          var mass1=parseInt(pair[1]);
        
          var c=0; var s=0;
          for(i=0;i<data.length;i++)
          { 
         
            if(data[i].mass==mass1 && data[i].name.includes(name1))
            {  c=1;
               if(s==0)
              {
              response.write("200"+'\n');
              s=1;
              }
            
              response.write(data[i].name+"  ");
              response.write(data[i].mass+'\n');
            }
          }
          
        }

      if(c==0)
      {  
        response.write("404"+'\n');
        response.write("NOT FOUND");
        //alert("NO VALUE");
      }
    

 else if(query.indexOf('n')>query.indexOf('m'))
 {
  if((pathname=='/people'&& query.indexOf("mass")!=-1 && query.indexOf("name")!=-1))
  {  var i,j;
     
    if(query.includes("%3E"))
    {
       var pairs=query.split("%27");
     //var pair=query.split(pairs[1])
     var name1=pairs[1];
     /*for( j=0;j<pairs.length;j++)
      {
        var pair=pairs[1].split("");*/
      
      var pair=pairs[0].split("%3E");
        
       var mass1=0; var inc=1;
       var j; var k=0;
      for(j=0;pair[1][j]!='&';j++)
       {    
            mass1[k++]=pair[1][j];
           //mass1=mass1*inc+pair[1][j];
            
            // inc=inc*10;
       }
       
        
        var c=0; var s=0;
        var f=mass1;
        mass1=parseInt(f);
        console.log(mass1);
       
        for(i=0;i<data.length;i++)
        { 
       
          if(data[i].mass>mass1 && data[i].name.includes(name1))
          {  c=1;
             if(s==0)
            {
            response.write("200"+'\n');
            s=1;
            }
          
            response.write(data[i].name+"  ");
            response.write(data[i].mass+'\n');
          }
        }
        
      }
    }  
      
      else if(query.includes("%3C"))
      {  
        var pairs=query.split("%27");
        //var pair=query.split(pairs[1])
         var name1=pairs[1];
         var pair=pairs[2].split("%3C");
         var mass1=parseInt(pair[1]);
       
         var c=0; var s=0;
         for(i=0;i<data.length;i++)
         { 
        
           if(data[i].mass<mass1 && data[i].name.includes(name1))
           {  c=1;
              if(s==0)
             {
             response.write("200"+'\n');
             s=1;
             }
           
             response.write(data[i].name+"  ");
             response.write(data[i].mass+'\n');
           }
         }
         
       }
       /*else 
       {  
         var pairs=query.split("%27");
         //var pair=query.split(pairs[1])
          var name1=pairs[1];
          var pair=pairs[2].split("=");
          var mass1=parseInt(pair[1]);
        
          var c=0; var s=0;
          for(i=0;i<data.length;i++)
          { 
         
            if(data[i].mass==mass1 && data[i].name.includes(name1))
            {  c=1;
               if(s==0)
              {
              response.write("200"+'\n');
              s=1;
              }
            
              response.write(data[i].name+"  ");
              response.write(data[i].mass+'\n');
            }
          }
          
        }*/

     /* if(c==0)
      {  
        response.write("404"+'\n');
        response.write("NOT FOUND");
        //alert("NO VALUE");
      }*/
 } 
}
    else if(pathname=="/people" && query.indexOf("name")!=-1)
    { 
     
      var pairs = query.split("%27");
      
      //for(int j=0;j<pairs.length;j++)
     // {
       // var pair=pairs[1].split("%22");
        
         var name1=pairs[1];
     // }
     var i;
     var j;
     var c=0; var s=0;
     for(i=0;i<data.length;i++)
      {  
         if(data[i].name.includes(name1))
         { c=1;
          if(s==0)
          {
            response.write("200"+'\n');
            s=1;
          }
           response.write(data[i].name+'\n');
         }
        // else{
          // console.log("error");
         //}
      
      }
      if(c==0)
      { 
        response.write("404"+'\n');
        response.write("NOT FOUND");
        // alert("NO VALUE");
      }
    }
    
   else if(pathname=="/people" && query.indexOf("mass")!=-1)
    {  var c=0;
      var pairs=query.split("%3E");
      //var pair=pairs[1].split("%22");
      var mass1=parseInt(pairs[1]);
      //var a=mass1[0];
     // a=a+mass1[1]*10;

      var i; var c=0; var s=0;
      for(i=0;i<data.length;i++)
      {   
        if(data[i].mass>=mass1)
        {
            c=1;
            //response.write("200"+'\n');
            if(s==0)
            {
              response.write("200"+'\n');
              s=1;
            }
            
          response.write(data[i].name+'\n');
        }
      }
      if(c==0)
      {
        response.write("404"+'\n');
        response.write("NOT FOUND");
        //alert("NO VALUE");
      }
    }
   
response.end();

}).listen(7000);