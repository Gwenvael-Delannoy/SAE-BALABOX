var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('resultat');
});

router.post('/', function(req, res, next) {
  res.render('resultat');
});

module.exports = router;