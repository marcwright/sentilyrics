var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/results', function(req, res, next) {
  var users = ["marc", "maren", "diesel"];
  res.render('music', { users: users });
});

module.exports = router;
