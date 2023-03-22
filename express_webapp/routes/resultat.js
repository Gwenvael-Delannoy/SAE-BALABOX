var express = require('express');
const resultat = require('../models/dao/resultat_dao');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var acrosport_dao = require('../models/dao/dataBase').acrosport_dao;
var figure_dao = require('../models/dao/dataBase').figure_dao;
var voie_dao = require('../models/dao/dataBase').voie_dao;
var natation_dao = require('../models/dao/dataBase').natation_dao;
var escalade_dao = require('../models/dao/dataBase').escalade_dao;
var musculation_dao = require('../models/dao/dataBase').musculation_dao;
var step_dao = require('../models/dao/dataBase').step_dao;


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
        res.render('resultat', {sport : nom_sport,id_sport : idsport,message : '', afficher : '', session : session});
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

            //insertion dans la base de donnée

            //envoyer les données au professeur
            envoieDonneesProf({sport : nom_sport, session : session ,nom_figure : nom_figure,description : description ,point : point});

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
    //spliter la_voie à partir du | et récupèrer le premier élément
    var nom_voie = la_voie.split('|')[0];
    var deg_diffi = la_voie.split('|')[1];
    var assureur = req.body.assureur;
    var complementaire = req.body.complementaire;

    voie_dao.findByNom(nom_voie, function(err,rows) {
      if(err){
        res.render('error',{message : err});
      }
      else{
        var voie = rows;
        if(voie.length == 0){
          res.render('error',{message : 'voie non existante'});
        }
        else{
          message= 'Données envoyées';
          res.render('resultat',{sport: nom_sport ,message : message, afficher : '' , session : session});

          //insertion dans la base de donnée
            
          //envoyer les données au professeur
          envoieDonneesProf({sport : nom_sport, session : session ,la_voie :nom_voie ,deg_diffi : deg_diffi ,assureur : assureur , complementaire : complementaire});
        }
      }
    });
  }
  else if(nom_sport == 'Natation'){
    //insertion dans la base de donnée
    res.render('resultat',{sport: nom_sport ,message : 'insertion dans la base de donnée', afficher : '' , session : session});

    //envoyer les données au professeur
    envoieDonneesProf({sport : nom_sport, id_sport : id_sport, session : session});

  }
  else if(nom_sport == 'Musculation'){
    //insertion dans la base de donnée
    res.render('resultat',{sport: nom_sport ,message : 'insertion dans la base de donnée', afficher : '' , session : session});

    //envoyer les données au professeur
    envoieDonneesProf({sport : nom_sport, id_sport : id_sport, session : session});

  }
  else if(nom_sport == 'Step'){
    //insertion dans la base de donnée
    res.render('resultat',{sport: nom_sport ,message : 'insertion dans la base de donnée', afficher : '' , session : session});
    
    //envoyer les données au professeur
    envoieDonneesProf({sport : nom_sport, id_sport : id_sport, session : session});

  }
  else{
    res.render('error',{message : 'Sport non reconnu'});

  }

});

function envoieDonneesProf(donnees) {
  var WebSocket = require('ws');
  var wss;

  // Connexion au websocket du professeur
  wss = new WebSocket('ws://localhost:3002');
  wss.on('open', function open() {
    wss.send(JSON.stringify({type: 'resultat', data: donnees}));
  });
}
module.exports = router;



