var express = require('express');
var router = express.Router();


/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {

  res.render('foot');
});

module.exports = router;