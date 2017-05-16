//ADDS MIDDLEWARES.
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var bcrypt = require("bcrypt-nodejs");
var mongoose = require('mongoose');
var path = require('path');
var util = require("util");
var fs = require("fs");

//CONNECTS MONGODB.
mongoose.connect('mongodb://localhost/test', (err)=> {
  if(err) {
    console.log("Error: Check if mongod is running!!");
    console.log(err);
    throw err;
  }
  console.log("Connected to MongoDB");
});

//CREATES SCHEMA AND MODEL FOR USERS LOGS.
var UsersLogSchema = mongoose.Schema({
   email: {type: String, required: true},
   username: {type: String, required: true},
   password: {type: String, required: true}
});
var UsersLogModel = mongoose.model('UsersLog', UsersLogSchema);

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

//CHANGES PASSWORD IN USERS.JSON FILE.
app.post('/changepassword', function (req,res){
  var json = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var obj = require('./users.json');
  obj[req.body.email] = bcrypt.hashSync(req.body.newpassword);
  if(req.body.email=json  &&
                bcrypt.compareSync(req.body.oldpassword, json[req.body.email])) {
    fs.writeFile('./users.json', JSON.stringify(obj,"",4), function(err) { console.log(err);
    })
    res.redirect('/login')
  } else {
    res.redirect('/changepassword')
  }
});

app.post('/logout', function (req,res){
  res.redirect('/login')
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

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.sendfile(path.join(__dirname + '/client/login-register-pass.html'))
});

//ENABLES STATIC DIRECTORY
app.use(express.static(path.join(__dirname, 'client')));

//ASSIGN PORT TO SERVER.
app.set('port', (process.env.PORT || 8090));
app.listen(app.get('port'), function() {
  console.log('App running at localhost', app.get('port'));
});
