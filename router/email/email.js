var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.post('/form', function(req, res){
  console.log(req.body.email);
  res.render('email.ejs',{'email': req.body.email});  // 템플릿 엔진 ejs를 사용하였다. express view engine 으로 검색해서 하면 된다. pug
});

// render 는 응답값을 줄 때 데이터랑 html과 결합된 상태로 클라이언트에 내려주겠다.

router.post('/ajax', function(req, res){
  var email = req.body.email;
  var responseData = {};  // json형태로 주기 위해 오브젝트형태로 초기

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


// query 알려야 한다. db접속위해 connection 객체사용 query 메소드 사
  var query = connection.query('select name from user where email="' + email + '"' , function(err, rows){
    if(err) throw err;
    if(rows[0]){ //첫번째 데이터
      responseData.result = 'ok'; //log rpws[0]하면 오브젝트형태로 나오기
      responseData.name = rows[0].name; //.name 으로 써주는거다
    } else {
      responseData.result = 'none';
      responseData.name = " ";
    }
    res.json(responseData);  // 비동기로 처리되기에 callback안에서 responce
  })
});

module.exports = router;
