var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var acrosport_dao = require('../models/dao/dataBase').acrosport_dao;
var figure_dao = require('../models/dao/dataBase').figure_dao;
var voie_dao = require('../models/dao/dataBase').voie_dao;

/* Recuperer la page qui permet la saisie des resultats sportifs en faisant la differenciation pour chaque sport. */
router.get('/', function(req, res, next) {
  
  var idsport = req.query.idSport;
  var session = req.query.ses;
  var nombreFigure ='';
  var afficher ='';
  if(req.query.nombreFigure !== undefined || req.query.afficher !== undefined ){
    nombreFigure = req.query.nombreFigure;
    afficher = req.query.afficher;
  }

  sport_dao.findByKey(idsport, function(err,rows) {
    if (err ) {
      messageError ='Connexion à la base de donnée impossible';
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
            res.render('resultat', {sport : nom_sport,  id_sport : idsport,figures : data , message : '', afficher : afficher , session : session , nombreFigure : nombreFigure});
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
            res.render('resultat', {sport : nom_sport,id_sport : idsport, voies : data , message : '', session : session});
          }
        });
      }
      else{
        res.render('resultat', {sport : nom_sport,message : '', afficher : '', session : session});
      }
    }
  }); 
});

router.post('/', function(req, res, next) {
  var nom_sport = req.body.sport;
  var id_sport = req.body.id_sport;
  var session = req.body.session;

  
  if(nom_sport == 'Acrosport'){

    if(req.body.action == 'Envoyer'){
      var nom_figure = req.body.figure;
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
            message= 'figure existante , id : ' + figure[0].id_figure;
            res.render('resultat',{sport: nom_sport ,message : message});
          }
        }
      });
    }
    else if(req.body.action == 'Remplir'){
      var nombreFigure = req.body.nombreFigure;
      console.log(nombreFigure);
      var figurestab = [];
      console.log(req.body.figures);
      if (req.body.figures || typeof req.body.figures !== 'undefined'){
        figurestab = req.body.figures.split(',');
      }
      res.redirect('/resultat?ses='+session+'&nombreFigure='+nombreFigure + '&afficher=oui' + '&idSport='+id_sport);
    }
    else if(req.body.action == 'Retour'){
      res.redirect('/resultat?ses='+session+'&idSport='+id_sport+'&nom_sport='+nom_sport);
    }
  }
  else if( nom_sport == 'Escalade'){

    var la_voie = req.body.voie;
    console.log(session);
    //spliter la_voie à partir du | et récupèrer le premier élément
    var nom_voie = la_voie.split('|')[0];
    var deg_diffi = la_voie.split('|')[1];
    var assureur = req.body.assureur;

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
          message= 'voie existante , id : ' + voie[0].id_voie;
          res.render('resultat',{sport: nom_sport ,message : message, afficher : '' , session : session});
        }
      }
    });
  }
  else{
    res.render('resultat',{sport: nom_sport ,message : 'Valeur non envoyée !' , afficher : '' , session : session});
  }
});
module.exports = router;

