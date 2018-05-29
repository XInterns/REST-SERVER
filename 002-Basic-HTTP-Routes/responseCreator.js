
const responseCreator = (response, statusCode, data, headers = {}) => {
    const defaultHeader = {
      'Content-type': 'application/json'
    };
    const userHeaders = Object.assign(defaultHeader, headers);
    response.writeHead(statusCode, userHeaders);
    typeof data === 'object' ? response.write(JSON.stringify(data)) :response.write(data);
    return response;
  }

  module.exports = responseCreator;