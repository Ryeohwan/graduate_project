var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-Parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  // 인코딩은 아스키형태를 다른 형태로 치환해서 보내는 것이다. 처리가 쉽다.
var router = require('./router/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');  // 메세지를 쉽게 전달해주는 것


app.set('view engine','ejs');
app.listen(3000,function(){
  console.log('start express server on port 3000');
});

// express session github
app.use(session({
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true,
 // cookie: { secure: true } //if use this req.flash doesn't work
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
 // I have to call this from index
app.use(router);
