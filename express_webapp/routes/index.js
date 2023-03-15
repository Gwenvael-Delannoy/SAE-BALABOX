var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;
var eleve_dao =  require('../models/dao/dataBase').eleve_dao;
var Eleve = require('../models/eleve');
var WebSocket = require('ws');
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

  var role = 4 //(appel api);
  //dechiffrement du JWT TOKEN avec la clé public

  var ideCon= req.body.SIdentifiant;
  var pwd = req.body.Spwd;
  var messageError = '';
  var wss ;
  console.log("ok");
  if(role == 4 ||role == 5 ){
    var nomEleve = req.body.SNomEleve;
    var prenomEleve = req.body.SPrenomEleve;
    var classeEleve = req.body.SClasseEleve;

        // Connexion au websocket pour l eleve
        wss = new WebSocket('ws://localhost:3001');
        console.log("ok2");
        wss.onopen = function () {
          console.log('Connexion websocket établie pour l eleve.');
        };
    
        wss.onerror = function (error) {
          console.log('Erreur websocket : ', error);
        };
    
        wss.onclose = function () {
          console.log('Déconnexion websocket pour l eleve.');
        };


  }else if(role == 2 ||role == 3) {
    // Connexion au websocket pour le professeur
    wss = new WebSocket('ws://localhost:3002');
    console.log("ok3");
    wss.onopen = function () {
      console.log('Connexion websocket établie pour le professeur.');
    };

    wss.onerror = function (error) {
      console.log('Erreur websocket : ', error);
    };

    wss.onclose = function () {
      console.log('Déconnexion websocket pour le professeur.');
    };
  }

  //savoir sur quel bouton on a cliqué en renvoyant le nom du bouton
  if(req.body.btn == 'BtConnexion'){
    
    // Appeler la méthode de recherche de session
    
    session_dao.FindByIdCon(ideCon, function(err,rows) {
      if (err ) {
        messageError ='Connexion a la base de donnée impossible'
        res.render('index', { message: messageError });
      }
      else{
        var session = rows;

        if(session == null || session == undefined || session == ''){
          messageError = 'Identifiant incorrect ou inexistant';
          res.render('index', { message: messageError });
        }
        else{

          if(session[0].mdp == pwd){
            messageError = 'Connexion réussie';    
            //en fonction de se qu'on recupere dans le process.env

            

            if( role == 4 || role == 5){

              //check si l'eleve existe deja dans la base de donnée
              eleve_dao.findByName(nomEleve, function(err,rows) {
                if (err ) {
                  messageError ='Connexion a la base de donnée impossible'
                }
                else{
                  var eleve_req = rows;
                  var prenomEleveBdd = '';
          
                  //recupere le prenom de l'eleve de la base de donnée si il existe 
                  if(eleve_req.length != 0){
                    prenomEleveBdd = eleve_req[0].prenom;
                  }
                  //check si l'eleve existe deja dans la base de donnée ou non meme s'il a le meme nom mais pas le meme prenom*
                  if(eleve_req.length == 0 && prenomEleveBdd != prenomEleve){
                    //si l'eleve n'existe pas on l'ajoute dans la base de donnée
                    var eleve = new Eleve();
                    //(nom, prenom, sexe, classe, total_points, equipe){
                    eleve.init(nomEleve,prenomEleve,"homme",classeEleve,0,1);
                    eleve_dao.insert(eleve, function(err,rows) {
                      if (err ) {
                        messageError =err;
                        console.log(messageError);
                      }
                      else{
                        console.log('nouveau eleve cree');

                      }
                    });
                  }
                  console.log("ok5");
                  // Envoi d'un message vers le serveur WebSocket de l'élève
                  wss.send(JSON.stringify({
                    type: 'info_eleve',
                    nom: nomEleve,
                    prenom: prenomEleve,
                    classe: classeEleve,
                    session: session[0].id_session
                  }));
                }
              });
            }
              
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
            res.render('index', { message: messageError });
          }
        }
      }
    });
  }
  else if(req.body.btn == 'BtAccesProf'){
    res.redirect('/listeSession');
  }
});
module.exports = router;
