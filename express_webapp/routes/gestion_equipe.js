var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var equipe_dao =  require('../models/dao/dataBase').equipe_dao;
var sport_dao = require('../models/dao/dataBase').sport_dao;
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
//import api 
//var api = require_once(_ROOT_.'/config.php');


/* GET error page. */
router.get('/', function(req, res, next) {
  var ws = new WebSocket('ws://localhost:3002');
  var idSession = req.query.idsession;
  var type = req.query.type;
  console.log(type)
  res.render('gestion_equipe',{idSession : idSession, type : type});
  
});

router.post('/', function(req, res, next) {

      // Récupérer les données envoyées par le formulaire
        var nom_equipe = req.body.nom;
        var elevesEquipe = req.body.membres;
        console.log(nom_equipe);
    
    // Envoyer une réponse au client
    res.status(200).json({ message: 'Équipe ajoutée avec succès.' });
});
  module.exports = router;