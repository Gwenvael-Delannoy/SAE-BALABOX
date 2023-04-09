var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var equipe_dao =  require('../models/dao/dataBase').equipe_dao;
var sport_dao = require('../models/dao/dataBase').sport_dao;
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var session_dao = require('../models/dao/dataBase').session_dao;



/* GET error page. */
router.get('/', function(req, res, next) {
  var idSession = req.query.idsession;
  var type = req.query.type;
  console.log(type)
  equipe_dao.findEquipeSession(idSession, function(err,rows1) {
    if (err ) {
        messageError ='Session inexistante,merci de revenir en arriere et ressayer';
        res.render('error',{message : messageError});
    }
    else{
      var equipes = [];
      

      equipe_dao.findAllEquipeEleve( function(err,rows2) {
        if (err ) {
            messageError ='Session inexistante,merci de revenir en arriere et ressayer';
            res.render('error',{message : messageError});
        }
        else{
          for(var i = 0; i < rows1.length; i++){
            var eleves = [];
              for(var j = 0; j < rows2.length; j++){
                if(rows1[i].id_equipe == rows2[j].id_equipe){
                  eleves.push({id_eleve : rows2[j].id_eleve, nom : rows2[j].nom, prenom : rows2[j].prenom});
                }
              }
              equipes.push({id_equipe : rows1[i].id_equipe, eleves : eleves});
          }
          for(var i = 0; i < equipes.length; i++){
            var id = equipes[i].id_equipe;
            for(var j = 0; j < equipes.length; j++){
              if(id == equipes[j].id_equipe && i != j){
                equipes.splice(j);
              }
            }
          }
          // console.log(equipes);
          res.render('gestion_equipe',{idSession : idSession, type : type, equipes : equipes});
        }
      });
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