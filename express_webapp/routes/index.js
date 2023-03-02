var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;
var eleve_dao =  require('../models/dao/dataBase').eleve_dao;
var eleve = require('../models/eleve');
//import api 
//var api = require_once(_ROOT_.'/config.php');


/* Recuperer la page d'accueuil. */
router.get('/', function(req, res, next) {

  var message ='';
  var professeur ='';
  //requeter l'api avec /authentified et on recuepre le role et on regarde si s'est un professer ou non
  /**
   var role = (appel api);
   //dechiffrement du JWT TOKEN avec la clé public

   if(role =='False'){
    message = 'Vous n avez pas accès à se service , merci de vous connecter avant'.
   }else if(role == 2 ||role == 3 ){
    professeur = 'professeur';
   }
   */
  res.render('index',{ message: message, professeur : professeur });
});

router.post('/', function(req, res, next) {

  var ideCon= req.body.SIdentifiant;
  var pwd = req.body.Spwd;
  var nomEleve = req.body.SNomEleve;
  var prenomEleve = req.body.SPrenomEleve;
  var classeEleve = req.body.SClasseEleve;
  var messageError = '';


  //savoir sur quel bouton on a cliqué en renvoyant le nom du bouton
  if(req.body.btn == 'BtConnexion'){
    
    // Appeler la méthode de recherche de session
    
    session_dao.FindByIdCon(ideCon, function(err,rows) {
      if (err ) {
        messageError ='Connexion a la base de donnée impossible'
      }
      else{
        var session = rows;

        if(session == null || session == undefined || session == ''){
          messageError = 'Identifiant incorrect ou inexistant';
        }
        else{

          if(session[0].mdp == pwd){
            messageError = 'Connexion réussie';    
            //en fonction de se qu'on recupere dans le process.env
    
            //si c'est un eleve
            // creer une object eleve et mettre les informations recupere dans le process.env
            /**
             INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (0,0,1);   
             INSERT INTO Match_Eleve(un_match , leleve) VALUES (1,1);
             */
    
            //si c'est un professeur
            // ne fait rien car on a deja les informations dans la session
    
            //renvoie la page en fonction du type de session
            if(session[0].type_session == 'tournoi equipe'){
              res.redirect('/classement_equipe?ses='+ session[0].id_session);
            }else if(session[0].type_session == 'resultat'){
              res.redirect('/resultat?idSport=' + session[0].le_sport + '&ses=' + session[0].id_session);
            }else if(session[0].type_session == 'tournoi individuel' ){
              res.redirect('/classement_eleve?ses=' + session[0].id_session);
            }
          }
          else{
            messageError = 'Mot de passe incorrect';
          }
        }
        res.render('index', { message: messageError });
        console.log('Bouton connexion cliqué');
      }
    });
  }
  else if(req.body.btn == 'BtAccesProf'){
    res.redirect('/listeSession');
  }
});
module.exports = router;
