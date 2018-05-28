var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) 
{
  if(!request.url.includes("/people"))
  { 
        response.writeHead(404);
        response.write("Status:404 Not Found");
  }
  else
  {
        response.writeHead(200, {'Content-type': 'text/plain'});
        response.write("Status:200 OK");
      
        const {pathname,query} = url.parse(request.url);
        var qlist=query.split('&') //list of queries
        console.log(qlist)
        console.log("pathname", pathname);
        console.log("queryParameters", query)
        var param   //name of parameter
        var value   //value of parameter
        var pos     //position of value
        var ans={}
      
        for(var i=0; i<qlist.length;i++)
        {
          if(qlist[i].includes('%27')||qlist[i].includes('%22'))   //character string
          {
            param=qlist[i].slice(0,qlist[i].indexOf('='))
            //console.log(param)
            pos=qlist[i].indexOf('%')+3
            value=qlist[i].slice(pos,-3)
            //console.log(value)
            data=data.filter(x => x[param].includes(value))
            //console.log(data.map(x => x.name))
          }
          else if(qlist[i].includes('%3E'))  //comparasion string greater than
          {
            param=qlist[i].slice(0,qlist[i].indexOf('%3E'))
            //console.log(param)
            pos=qlist[i].indexOf('%')+3
            value=qlist[i].slice(pos)
            //console.log(value)
            data=data.filter(x => x[param]>Number(value))
            //console.log(data.map(x => x.name))
          }
          else if(qlist[i].includes('%3C'))   //comparasion string less than
          {
            param=qlist[i].slice(0,qlist[i].indexOf('%3C'))
            //console.log(param)
            pos=qlist[i].indexOf('%')+3
            value=qlist[i].slice(pos)
            //console.log(value)
            data=data.filter(x => x[param]<Number(value))
            //console.log(data.map(x => x.name))
          }
          else if(qlist[i].includes('='))   //comparasion string equal to
          {
            param=qlist[i].slice(0,qlist[i].indexOf('='))
            //console.log(param)
            pos=qlist[i].indexOf('=')+1
            value=qlist[i].slice(pos)
            //console.log(value)
            data=data.filter(x => x[param]=Number(value))
            //console.log(data.map(x => x.name))
          }
        }
        ans=data.map(x => x.name) 
        console.log("Required Records are:"+ans)
      }
      response.end();  
}).listen(7000);