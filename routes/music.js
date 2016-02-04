var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // console.log(res);
  console.log(req.body);
  res.render('music');
});

module.exports = router;
