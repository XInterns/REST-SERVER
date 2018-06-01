const sampleMiddleware = (req, res, next) => {
  console.log('LOGGED');
  next();
};

/* *
  * create an error handler for error
  * create a route specific for error
  * */


module.exports = sampleMiddleware;
