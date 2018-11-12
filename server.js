const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const cookieParser = require('cookie-parser');
const route = require('express').Router();
const route1 = require('express').Router();
const route2 = require('express').Router();
const path=require('path');
const session = require('express-session');
const methodOverride = require("method-override");
const flash = require('connect-flash');
// create express app
const app = express();

app.set('view engine', 'pug')
const newPath  = path.join(__dirname, "./app/view");
app.set("views", newPath );
app.use(morgan('dev'));
//for method override i.e use put delete etc
app.use(methodOverride("_method"))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

morganBody(app);
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

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

//use sessions for tracking logins
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
  }));

  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.userId) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.userId && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

// define a simple route
app.get('/',sessionChecker, (req, res) => {
    res.redirect('/logIn');
});

// Require Notes routes
/* require('./app/routes/note.routes.js')(app); */
//app.use('/notes',route);
// Require Notes routes
//require('./app/routes/note.routes.js')(route);


app.use('/persons',route1);
require('./app/routes/person.routes.js')(route1);


//route for user auth
app.use('/',route2);
route2.use(flash());
route2.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});
require('./app/routes/user.routes.js')(route2);

// listen for requests
app.listen(3006, () => {
    console.log("Server is listening on port 3006");
});