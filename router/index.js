var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var main = require('./main/main');
var email = require('./email/email');
var join = require('./join/index');
var login = require('./login/index');
var logout = require('./logout/index');
var movie = require('./movie/index');

router.get('/',function(req, res){ // 루트로 들어와 //여기로 리다이렉트를 하자
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use('/main', main); // 메인에 대한 라우터는 이걸 써라
router.use('/email', email); // email 로 url 오면 이걸로 처리
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);
router.use('/movie', movie);

module.exports = router;
