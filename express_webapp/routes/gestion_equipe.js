var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var equipe_dao =  require('../models/dao/dataBase').equipe_dao;
var sport_dao = require('../models/dao/dataBase').sport_dao;
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
//import api 
//var api = require_once(_ROOT_.'/config.php');


/* GET error page. */
router.get('/', function(req, res, next) {
  var professeur ='';
  var idSession = req.query.idSession;
  var idSport = req.query.idSport;
  var ws = new WebSocket('ws://localhost:3002');
  //requeter l'api avec /authentified et on recuepre le role et on regarde si s'est un professer ou non
  /**
   var role = (appel api);
   //dechiffrement du JWT TOKEN avec la clé public

   if(role =='False'){
    message = 'Vous n avez pas accès à se service , merci de vous connecter avant'.
   }else if(role == 2 ||role == 3 ){
    professeur = 'professeur';
   }*/   


   sport_dao.findByKey(idSport,function(err, rows){
    if(err){
      error = err;
      res.render('error', {message: error});
    }
    else{
      if(rows.length == 0){
        error = 'Aucun sport trouvé , merci de ressayer';
        res.render('error', {message: error});
      }
      else{
        if(rows[0].type_session == 'tournoi equipe'){
          //recuperer les equipes de la session
          equipe_dao.findEquipeSession(idSession,function(err, rows){
            if(err){
              error = err;
              res.render('error', {message: error});
            }
            else{
              for (var i = 0; i < rows.length; i++) {
                console.log("okkkk");

                eleve_dao.findEleveByEquipe(rows[i].id_equipe,function(err, rows){
                  if(err){
                    error = err;
                    res.render('error',{message:error})
                  }
                  else{
                    ws.send(JSON.stringify({
                      type: 'equipe_session',
                      id_equipe: rows[i].id_equipe,  
                      nb_joueurs: rows[i].nb_joueurs,
                      lesEleves:rows,
                      total: rows[i].total,
                      id_session: idSession
                    }));
                  }
                });
              } 
              res.render('gestion_equipe', {idSession: idSession, professeur: professeur});
            }
          });
        }
        else{
          error = 'Accès refuser , ceux-ci est une sesssion qui ne contient pas de tournoi en equipe';
          res.render('error', {message: error});
        }
      }
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