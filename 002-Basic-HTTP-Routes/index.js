var http = require('http');
var url = require('url');
var data = require('./data.json');
var datanew=data;
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
  
  var arr1=[]; var k=0;
  var arr2=[]; var l=0;

  if(pathname=='/people')
  if(query!=null )
  {
  var list=query.split("&");
  //console.log(list);
  var len=list.length;
  //console.log(list.length);
  var i;
  
  for(i=0;i<len;i++)
  {
      if(list[i].indexOf("=")!=-1 && list[i].indexOf("%27")!=-1)
      {
          var ans=list[i].split('%27');
          console.log(ans);
      //response.write(ans[1]);
      var temp=ans[0].slice(0,-1);
      console.log(temp);
      var par1=ans[1];
      console.log(par1);
      var j;
      for(j=0;j<data.length;j++)
      { // JSON.stringify(obj);
        // console.log(data[j][temp]);
          if(data[j][temp].includes(par1))
          {  // console.log("yay");
              //var d=JSON.stringify(data[j]);
              //response.write(data[j][temp]+'\n');
              arr1[k++]=data[j];
          }
      }
      if(len==1)
      { for(let f=0;f<arr1.length;f++)
        response.write(JSON.stringify(arr1[f],null,'\t')+'\n');
      }
      }
      /*else if(list[i].includes("="))
      {
        var ans=list[i].split("=");
        var temp=ans[0];
        console.log(temp);
        var par=ans[1];
        console.log(par);
        var j;
        for( j=0;j<data.length;j++)
        {
          if(data[j][temp]==par)
          {  //console.log(data[j][temp]);
           // response.write(data[j].name+'\n');
            arr2[l++]=data[j];
          }
        }

      }*/
      else if(list[i].includes("gt"))
      {
         var ans=list[i].split("=");
         var temp=ans[0];
         console.log(temp);
         var par=ans[1];
         
         par=par.slice(par.indexOf(":")+1,-1);
         console.log(par);
         var j;
         par=parseInt(par);
         for(j=0;j<data.length;j++)
         {
           if(data[j][temp]>par)
           { 
             //console.log(data[j][temp]);
            // response.write(data[j].name+'\n');
            arr2[l++]=data[j];
           }
         }
         if(len==1)
         { for(let f=0;f<arr2.length;f++)
           response.write(JSON.stringify(arr2[f],null,'\t')+'\n');
         }
      }
      else if(list[i].includes("lt"))
      {
        var ans=list[i].split("=");
        var temp=ans[0];
        console.log(temp);
        var par=ans[1];
        par=par.slice(par.indexOf(":")+1,-1);
        console.log(par);
        var j;
        par=parseInt(par);
        for(j=0;j<data.length;j++)
        {
          if(data[j][temp]<par)
          { 
            //console.log(data[j][temp]);
            //response.write(data[j].name+'\n');
            arr2[l++]=data[j];
          }
        }
        if(len==1)
        { for(let f=0;f<arr2.length;f++)
          response.write(JSON.stringify(arr2[f],null,'\t')+'\n');
        }
      }
      response.write('\n')
    }
    var s=0;
    for(k=0;k<arr1.length;k++)
    {
      for(l=0;l<arr2.length;l++)
      { 
        if(arr1[k].name==arr2[l].name)
       { s=1; response.write(JSON.stringify(arr1[k],null,'\t')+'\n');}
      }
    }
    
    }   
  /* if(s==0)
   {
     response.writeHead(404,{'Content-type': 'text/JSON'});
     response.end();
   }*/
   response.end();
  }).listen(7000);