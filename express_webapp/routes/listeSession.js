var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('session');
});

router.post('/', function(req, res, next) {

  console.log("test");
  res.render('session');
  
});

module.exports = router;