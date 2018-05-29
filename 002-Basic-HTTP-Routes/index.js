const http = require('http');
const url = require('url');
const responseCreator = require('./responseCreator');
const convertQueryStringToJSON = require('./queryParameterProcessor');

const people = require('./data.json');
const peopleSchema = Object.keys(people[0]);


http.createServer(function (request, response) {
  const {pathname,query} = url.parse(request.url);
  const queryParameter = convertQueryStringToJSON(query);
  //check for the non people
  if(pathname !== '/people'){
    response = responseCreator(response, 404, []);
    response.end();
  }
  else{
    //means we got people
    const keysToQuery = Object.keys(queryParameter);
    let filteredData = people;
    keysToQuery.forEach((queryField) => {
      filteredData = peopleSchema.indexOf(queryField) === -1 ? 
      filteredData : filteredData.filter((data) => data[queryField].includes(queryParameter[queryField]));
      return filteredData;
    })
    responseCreator(response, 200 , filteredData);
    response.end();
  }

}).listen(7000);