var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var acrosport_dao = require('../models/dao/dataBase').acrosport_dao;
var figure_dao = require('../models/dao/dataBase').figure_dao;
var voie_dao = require('../models/dao/dataBase').voie_dao;

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

      if(nom_sport == 'Acrosport'){
        figure_dao.findAll(function(err,rows) {
          if(err){
            res.render('error',{message : err});
          }
          else{
            var figures = rows;
            const data = figures.map(figures => figures.nom + " |" + figures.description + " |" + figures.point);
            res.render('resultat', {sport : nom_sport,figures : data , message : ''});
          }
        });
      }
      else if(nom_sport == 'Escalade'){
        voie_dao.findAll(function(err,rows) {
          if(err){
            res.render('error',{message : err});
          }
          else{
            var voies = rows;
            const data = voies.map(voies => voies.nom_voie + '|' + voies.deg_diffi);
            res.render('resultat', {sport : nom_sport, voies : data , message : ''});
          }
        });
      }
      else{
        res.render('resultat', {sport : nom_sport,message : ''});
      }
    }
  }); 
});

router.post('/', function(req, res, next) {
  var nom_sport = req.body.sport;
  console.log(nom_sport);
  if(nom_sport == 'Acrosport'){
    var nom_figure = req.body.nom_figure;
    var description = req.body.description;
    var point = req.body.point;
    figure_dao.findByNom(nom_figure, function(err,rows) {
      if(err){
        res.render('error',{message : err});
      }
      else{
        var figure = rows;
        if(figure.length == 0){
          console.log('figure non existante');
        }
        else{
          console.log('figure existante , id : ' + figure[0].id_figure);
        }
      }
    });
  }
  else if( nom_sport == 'Escalade'){
    var nom_voie = req.body.nom_voie;
    var deg_diffi = req.body.deg_diffi;
    voie_dao.findByNom(nom_voie, function(err,rows) {
      if(err){
        res.render('error',{message : err});
      }
      else{
        var voie = rows;
        if(voie.length == 0){
          console.log('voie non existante');
        }
        else{
          console.log('voie existante , id : ' + voie[0].id_voie);
        }
      }
    });
  }
  else{
    res.render('resultat',{sport: nom_sport ,message : 'Valeur non envoyée !'});
  }
});

module.exports = router;