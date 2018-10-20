const express = require('express');
const bodyParser = require('body-parser');
const route = require('express').Router();
const route1 = require('express').Router();
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// Require Notes routes
/* require('./app/routes/note.routes.js')(app); */
app.use('/notes',route);
// Require Notes routes
require('./app/routes/note.routes.js')(route);


app.use('/persons',route1);
require('./app/routes/person.routes.js')(route1);
// listen for requests
app.listen(3006, () => {
    console.log("Server is listening on port 3006");
});