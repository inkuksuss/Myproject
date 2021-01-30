const express = require('express');
const {connect} = require('../model');

const router = express.Router();

router.post('/create', (req, res, next) => { // Create
  const client = connect();
  let body = req.body;
  if((body.title.length > 0) && (body.description.length > 0)){
    client.query("INSERT INTO boards (title, description, createdDate, updatedDate) VALUES(?,?,NOW(),NOW())",
    [body.title, body.description], (error) => {
      if(error){
        console.log(error);
      }
      res.redirect('/board/read');
    })
  }
  else if((body.title.length == 0) || (body.description.length == 0)){
    res.send('<script type="text/javascript">alert("제목과 본문을 입력해주세요.");location.href="/board/read";</script>');
  }
})

router.get('/read', (req, res, next) => { // Read
  const client = connect();
  client.query("SELECT * FROM boards", (error, results) => {
    if(error) console.log(error);
    else{
      let posts = results;
      res.render('board', {posts});
    }
  }) 
});


router.get('/update/:id', (req, res, next) =>{ //update
  const client =connect();
  let params =req.params
  client.query("SELECT * FROM boards WHERE id = ?", [params.id], (error,results) => {
    let post = results[0]
    res.render('boardUpdate', {post});
  });
})

router.post('/update_process', (req, res, next) => { 
  const client = connect();
  let body = req.body;
  console.log(body);
  client.query("UPDATE boards SET title = ?, description = ?, updatedDate = NOW() WHERE id = ?", 
  [body.title, body.description, body.id], (err) => {
    if(err){
      console.log(err);
    }
    res.redirect('/board/read');
  });
})

router.post('/delete', (req, res, next) => { // Delete
  const client = connect();
  let body = req.body;
  client.query("DELETE FROM boards WHERE id = ?", [body.id], (error) => {
    if(error){
      throw error;
    }
    res.redirect("/board/read");
  })
})

module.exports = router;