var express = require('express');
var app = express();
var router = express.Router();
var path = require('path'); // 상대경로를 쓰기 위해서 path 사용
// router.get('/',function(req, res){ // 루트로 들어와 //여기로 리다이렉트를 하자
//     res.sendFile(__dirname+"/public/main.html" );
// });

// main page 는 login이 될 때만 (즉 세션 정보가 있을때만) 접근이 가능하게 하자.
router.get('/',function(req, res){ // 루트로 들어와 //여기로 리다이렉트를 하자
    var id = req.user;
    //res.sendFile(path.join(__dirname, "../../public/main.html"));
    res.render('main.ejs',{'id' : id});
});

module.exports = router;
