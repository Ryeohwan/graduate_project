var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//database settings
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'ryeo',
  password : 'todo',
  database : 'js_study'
});

connection.connect();

router.get('/', function(req, res){
  var msg;
  var errMsg = req.flash('error');
  if(errMsg)msg = errMsg;
  res.render('login.ejs',{'message' : msg});
});

//passport serialize
passport.serializeUser(function(user, done) {  // 세션을 저장해준다.
  console.log('passport session save:',user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('passport session get id', id);
  done(null, id);  // id 값만 전달해주겠다.
});

passport.use('local-login', new LocalStrategy({  // local join 이라는 stategy를 불러서 사용하는 것이다.
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  var query = connection.query('select * from user where email=?', [email], function(err,rows){
    if(err) return done(err);
    if(rows.length) {  // 로그인했는데 주소가 있으면 잘된거다!
      return done(null, {'email': email, 'id' : rows[0].UID})
    } else {
        return done(null, false, {'message': 'your login is not found'})
    }
  })
}));

// ajax 는 json 콜백을 줘야 한다.
router.post('/', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info){
    if(err) res.status(500).json(err);
    if(!user) return res.status(401).json(info.message); // info 는 추가 메세지를 전송해 준다.

    req.logIn(user, function(err){  // serialize로 보내준다.
      if (err) {return next(err);}
      return res.json(user);
    });
  })(req, res, next);
})


module.exports = router;
