var express = require('express');
var router = express.Router();


/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {

  res.render('resultat_prof');
});

router.post('/', function(req, res, next) {
  if (req.body.action ==  'Retour'){
    res.redirect('/listeSession');
  }
});

module.exports = router;