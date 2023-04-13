var express = require('express');
var router = express.Router();
var figure_dao = require('../models/dao/dataBase').figure_dao;
var Figure = require('../models/figure');


/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {
  var message = req.query.message;
  if (message == undefined){
    message = "";
  }
  figure_dao.findAll(function(err, figures){
    if (err) throw err;
    else{
      res.render('gestion_figure',{figures : figures , message : message});
    }
  });
});
router.post('/', function(req, res, next) {
    
  var id_figure =  req.body.id_figure;

  if (req.body.action ==  'Retour'){
      res.redirect('/listeSession');
  }
  else if (req.body.action ==  'Ajouter'){
      res.redirect('/gestionFigure_ajout');
  }
  else if (req.body.action ==  'Modifier'){
      res.redirect('/gestionFigure_modif?id_figure='+id_figure);
  }
}); 

module.exports = router;
