//ADDS MIDDLEWARES.
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var bcrypt = require("bcrypt-nodejs");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');
var util = require("util");
var fs = require("fs");

var loggedInUser;

//CONNECTS MONGODB.
mongoose.connect('mongodb://localhost/loginusers', (err) => {
  if (err) {
    console.log("Error: Check if mongod is running!!");
    console.log(err);
    throw err;
  }
  console.log("Connected to MongoDB");
});

//CREATES SCHEMA AND MODEL FOR LOGIN USERS.
var LoginUsersSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    required: true
  }
});
var LoginUser = mongoose.model('LoginUser', LoginUsersSchema);

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
  if (req.session.admin) {
    res.sendfile(path.join(__dirname + '/client/index.html'))
  } else
    res.redirect('/login');
};

// -------------SCORE------------
// SENDING SCORE
app.post("/submitScore", function(req, res) {
  if(!req.body.score) {
    res.send({error:"No score value was submitted"});
    return;
  }
  var score = parseInt(req.body.score);
  LoginUser.findOne({ username: loggedInUser }, function(err, user) {
    if (err) 
      throw err;
    user.score = score;
    // save the user
    user.save(function(err) {
      if (err) throw err;
      console.log("User successfully updated!");
    });
    res.send({success:true});
  });
});

// GETTING SCORE
app.post("/highScores", function(req, res) {
  LoginUser.find({},function(err, result) {
    if (err) {
      console.log("Failed to find scores: " + err);
      res.send({error:"Internal Server Error"});
      return;
    }
    console.log("HOLA: " + result.username);
    var dbScores = [];
    for(var i = 0; i < 3; i++){
      dbScores.push(result[i].score);
    }
    dbScores.sort(function(a, b) { return b - a});
    for(var i = 0; i < result.length; i++){
      console.log("score: ", dbScores[i]);
    }
    res.send({success: true, dbScores: dbScores});
  });
});
//COMPARES POST VARIABLES USING bodyParser WITH REGISTERED USERS TO KNOW IF THE LOG IS CORRECT. IF ITS TRUE, CHANGES SESSION VARIABLES.
app.post('/login', function(req, res) {
  var json = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var aux = req.body.email;
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
app.post('/register', function(req, res) {
  var obj = require('./users.json');
  obj[req.body.email] = bcrypt.hashSync(req.body.password);
  fs.writeFile('./users.json', JSON.stringify(obj, "", 4), function(err) {
    console.log(err);
  });
  loggedInUser = req.body.username;
  // Writting in super mongodb
  var loginuser = new LoginUser({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    score: 0,
    date: Date.now()
  });
  loginuser.save(function(err, doc) {
    if (err) throw err; 
    console.log('User saved successfully!');
  });
  res.sendfile(path.join(__dirname + '/client/login-register-pass.html'))
});

//CHANGES PASSWORD IN USERS.JSON FILE.
app.post('/changepassword', function(req, res) {
  var json = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var obj = require('./users.json');
  obj[req.body.email] = bcrypt.hashSync(req.body.newpassword);
  if (req.body.email = json &&
    bcrypt.compareSync(req.body.oldpassword, json[req.body.email])) {
    fs.writeFile('./users.json', JSON.stringify(obj, "", 4), function(err) {
      console.log(err);
    })
    res.redirect('/login')
  } else {
    res.redirect('/changepassword')
  }
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

app.get('/logout', function(req, res) {
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