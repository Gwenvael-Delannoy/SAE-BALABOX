var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var idsport = req.query.idSport;

  sport_dao.findByKey(idsport, function(err,rows) {
    if (err ) {
      messageError ='Connexion a la base de donnée impossible';
    }
    else{
      var sport = rows;
      var nom_sport = sport[0].nom_sport;
      console.log(nom_sport);
      res.render('resultat', {sport : nom_sport});
    }
  }); 
});

router.post('/', function(req, res, next) {
  res.render('resultat');
});

module.exports = router;