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
  database : 'gradu'
});

connection.connect();

router.get('/', function(req, res){
  var msg;
  var errMsg = req.flash('error');
  if(errMsg)msg = errMsg;
  res.render('join.ejs',{'message' : msg});
});

// router.post('/', function(req, res){
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var password = body.password;  // post를 받아오는
//
//   // var query = connection.query('insert into user (email,name,pw) values ("'+ email +'", "'+ name +'", "'+ password +'")', function(err,rows){
//   //   if(err) {throw err;}
//   //   console.log('ok db inserted');
//   // })// sql문을 저 query 안에 넣어주면 된다.
//
//   var sql = {email: email, name: name, pw: password};
//   var query = connection.query('insert into user set ?', sql, function(err,rows){  // rows는 db에 넣고 나서 결과값이다.
//     if(err) {throw err;}
//     else
//       res.render('welcome.ejs',{'name': name, 'id': rows.insertId})
//   })  // 저 set 으로 간단하게 표현이 가능하고 sql로 json 을 이용할 수 있다.
// })

//passport serialize
passport.serializeUser(function(user, done) {  // 세션을 저장해준다.
  console.log('passport session save:',user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('passport session get id', id);
  done(null, id);  // id 값만 전달해주겠다.
});

passport.use('local-join', new LocalStrategy({  // local join 이라는 stategy를 불러서 사용하는 것이다.
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  var query = connection.query('select * from user where email=?', [email], function(err,rows){
    if(err) return done(err);
    if(rows.length){
      console.log('already existed user');
      return done(null, false, {message: 'your email is already used'}) // 하면 failureRedirect로 간다.
    } else{
      var sql = {email: email, pw: password};
      var query = connection.query('insert into user set ?', sql, function(err, rows){
        if(err) throw err
        return done(null, {'email': email, 'id' : rows.insertId});
      })
    }
  })
}));

// passport.use(new LocalStrategy(
//   function(username, password, done) { // done을 이용해서 비동기적으로 이용한다.
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); } // done 을 입력했을 때 비동기가 끝나는 것을 명시적으로 이용할 수 있다고 한다.
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

router.post('/', passport.authenticate('local-join',{
  successRedirect: '/main',
  failureRedirect: '/join', // 처리 결과가 여기로
  failureFlash: true
}));

module.exports = router;
