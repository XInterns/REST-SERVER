
// explain about this what is the use / benefit for the dotenv
const welcomeMessage = require('./welcome-message');
require('dotenv').config();
const express = require('express');
const { version } = require('./package.json');

const app = express();
const people = require('./people');
const logger = require('morgan');

/**
 * Some usefull stuff
 */
app.use(logger('combined'));
app.use(express.static(`${__dirname}/public`));


/**
 * MySQL Server Connection
 */
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Passw0rd@123',
  database : 'interns',
});

connection.connect()

app.set('sql-connection', connection);

/**
 * AKA Routes
 */
app.use('/people', people);

// without env route
// app.listen(3000, () => console.log('Interns app listening on port 3000'));

// with env route
app.listen(process.env.PORT, () => console.log(welcomeMessage(version, process.env.PORT)));
