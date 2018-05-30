var http = require('http');
var url = require('url');
var data = require('./data.json');

http.createServer(function (request, response) 
{
  if(!request.url.includes("/people"))
  { 
        response.writeHead(404);
        response.write('Status Code:'+response.statusCode.toString());
  }
  else
  {
        response.writeHead(200, {'Content-type': 'text/json'});
        response.write('Status Code:'+response.statusCode.toString());
      
        const {pathname,query} = url.parse(request.url);
        var qlist=query.split('&') //list of queries
        console.log(qlist)
        console.log("pathname", pathname);
        console.log("queryParameters", query)
        var param=[]   //name of parameter
        var value={}  //value[i] of parameter
        var pos     //position of value[i]
        var ans={}
      
        for(var i=0; i<qlist.length;i++)
        {
          if(qlist[i].includes('%27')||qlist[i].includes('%22'))   //character string comparision
          {
            param[i]=qlist[i].slice(0,qlist[i].indexOf('='))
            //console.log(param[i])
            pos=qlist[i].indexOf('%')+3
            value[i]=qlist[i].slice(pos,-3)
            //console.log(value[i])
            data=data.filter(x => x[param[i]].includes(value[i]))
            //console.log(data.map(x => x.name))
          }
          else if(qlist[i].includes('%3E'))  //comparision string greater than
          {
            param[i]=qlist[i].slice(0,qlist[i].indexOf('%3E'))
            //console.log(param[i])
            pos=qlist[i].indexOf('%')+3
            value[i]=qlist[i].slice(pos)
            //console.log(value[i])
            data=data.filter(x => x[param[i]]>Number(value[i]))
            //console.log(data.map(x => x.name))
          }
          else if(qlist[i].includes('%3C'))   //comparision string less than
          {
            param[i]=qlist[i].slice(0,qlist[i].indexOf('%3C'))
            //console.log(param[i])
            pos=qlist[i].indexOf('%')+3
            value[i]=qlist[i].slice(pos)
            //console.log(value[i])
            data=data.filter(x => x[param[i]]<Number(value[i]))
            //console.log(data.map(x => x.name))
          }
          else if(qlist[i].includes('='))   //comparision string equal to
          {
            param[i]=qlist[i].slice(0,qlist[i].indexOf('='))
            //console.log(param[i])
            pos=qlist[i].indexOf('=')+1
            value[i]=qlist[i].slice(pos)
            //console.log(value[i])
            data=data.filter(x => x[param[i]]=Number(value[i]))
            //console.log(data.map(x => x.name))
          }
        }
        ans=data.map( x =>{
          y={}
          for(var i=0;i<param.length;i++)
          {
            y[param[i]]=x[param[i]]
          }
          return y
        }) 
        console.log(ans)
        response.write("\n\nRequired Records are: "+JSON.stringify(ans))
      }
      response.end();  
}).listen(7000);