const express = require('express');
const {connect} = require('../model');

const router = express.Router();

//회원가입
router.get('/signup', (req, res, next) =>{ // signup => app.js에서 라우팅한 users/signup
  res.render("user/signup"); // view폴더에 user/signup 랜더링
});

router.post("/signup", (req,res,next) => {
  const client = connect();
  let body = req.body;
  client.query("SELECT * FROM users WHERE account = ?", [body.account], (err1, data) => {
    if(data.length == 0){
      if(body.account.length < 10 && body.password.length < 10){
        client.query("INSERT INTO users (account, name, password, confirmPassword, createdDate) VALUES (?,?,?,?,now())",
        [body.account, body.name, body.password, body.confirmPassword], (err2) => {
          if(!err2){
          res.redirect("/users/login");
          }
        });
      }
      else{
        res.send('<script type="text/javascript">alert("아이디와 비밀번호는 10글자 미만으로 입력해주세요.");location.href="/users/signup";</script>')
      }
    }
    else{
      res.send('<script type="text/javascript">alert("아이디가 존재합니다");</script>')
    }
  });
});


//로그인
router.get('/login', (req, res, next) =>{
  res.render("user/login");
});


router.post("/login", (req,res,next) =>{
  const client = connect();
  let body = req.body;
  client.query("SELECT * FROM users WHERE account = ?", [body.account], (err, rows) => {
   if(!err && (rows[0] !== undefined)){
     if(rows[0].password == body.password){
       res.render("index");
     }
     else{
       res.send('<script type="text/javascript">alert("비밀번호를 확인하세요");location.href="/users/login";</script>');
     }
   }
   else if(!err && rows[0] == undefined){
    res.send('<script type="text/javascript">alert("존재하지 않는 아이디입니다.");location.href="/users/login";</script>');
   }
   else{
     throw err;
   }
  });
});


module.exports = router;