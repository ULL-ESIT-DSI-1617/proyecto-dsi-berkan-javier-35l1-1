//ADDS MIDDLEWARES.
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var bcrypt = require("bcrypt-nodejs");
var path = require('path');
var util = require("util");
var fs = require("fs");


//ENABLES MIDDLEWARES.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//SHOW SESSION INFORMATION.
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  console.log("session :  "+util.inspect(req.session));
  next();
});

//CREATES AUTHENTICATION FUNCTION IN WHICH IT IS MADE next() ONLY IF THE LOGIN IS CORRECT.
var auth = function(req, res, next) {
  if (req.session.admin)
    res.sendfile(path.join(__dirname + '/client/index.html'))
  else
    res.redirect('/login');
};

//COMPARES POST VARIABLES USING bodyParser WITH REGISTERED USERS TO KNOW IF THE LOG IS CORRECT. IF ITS TRUE, CHANGES SESSION VARIABLES.
app.post('/login', function(req, res) {
  var json = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  if (req.body.email = json &&
    bcrypt.compareSync(req.body.password, json[req.body.email])) {
    req.session.user = req.body.email;
    req.session.admin = true;
    res.redirect('/game')
  } else {
    res.redirect('/login')
  }
});

//WRITES NEW USERS IN USERS.JSON.
app.post('/register', function (req,res){
  var obj = require('./users.json');
  obj[req.body.email] = bcrypt.hashSync(req.body.password);
  fs.writeFile('./users.json', JSON.stringify(obj,"",4), function(err) {
    console.log(err);
  })
  res.sendfile(path.join(__dirname + '/client/login-register-pass.html'))
});

app.get('/', function(req, res) {
  res.redirect('/login')
});

app.get('/game',
    auth 
);

app.get('/login', function(req, res) {
  res.sendfile(path.join(__dirname + '/client/login-register-pass.html'))
});

//ENABLES STATIC DIRECTORY
app.use(express.static(path.join(__dirname, 'client')));

//ASSIGN PORT TO SERVER.
app.set('port', (process.env.PORT || 8090));
app.listen(app.get('port'), function() {
  console.log('App running at localhost', app.get('port'));
});