var express = require('express');
var router = express.Router();

/* Recuperer la page de classement des equipes. */
router.get('/', function(req, res, next) {
  res.render('classement_equipe');
});

module.exports = router;