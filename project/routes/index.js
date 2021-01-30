const express = require('express');
const {connect} = require('../model');
//const { post } = require('./users');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const client = connect();
  res.render('index');
});

module.exports = router;
