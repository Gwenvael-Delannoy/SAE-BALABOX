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
  var idSession = req.query.idsession;
  var type = req.query.type;
  console.log(type)
  equipe_dao.findEquipeSession(idSession, function(err,rows) {
    if (err ) {
        messageError ='Session inexistante,merci de revenir en arriere et ressayer';
        res.render('error',{message : messageError});
    }
    else{
      var idEquipes = [];
      for(var i = 0; i < rows.length; i++){
        idEquipes.push(rows[i].id_equipe);
      }
      res.render('gestion_equipe',{idSession : idSession, type : type, equipes : idEquipes});
    }
  });
  
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