var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;
var eleve_dao =  require('../models/dao/dataBase').eleve_dao;
var sport_dao =  require('../models/dao/dataBase').sport_dao;
var Eleve = require('../models/eleve');
var WebSocket = require('ws');

//import api 
//var api = require_once(_ROOT_.'/config.php');
var role = -1;
var professeur ='Raul Adrien';//Raul Adrien

/* Recuperer la page d'accueuil. */
router.get('/', function(req, res, next) {

  var message ='';
  role = 2
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
  var nomEleve = '';
  var prenomEleve = '';
  var classeEleve='';
  var messageError = '';
  var wss ;
  
  if(role == 4 ||role == 5 ){
    nomEleve = req.body.SNomEleve;
    prenomEleve = req.body.SPrenomEleve;
    classeEleve = req.body.SClasseEleve;

    // Connexion au websocket pour l eleve
    wss = new WebSocket('ws://localhost:3001');
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

    nomEleve = "professeur";
    prenomEleve = "professeur";
    classeEleve = "pf";

    // Connexion au websocket pour le professeur
    wss = new WebSocket('ws://localhost:3002');
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

  // Appeler la méthode de recherche de session
    
  session_dao.FindByIdCon(ideCon, function(err,rows) {
    if (err ) {
      messageError ='Connexion a la base de donnée impossible'
      res.render('index', { message: messageError, professeur : professeur });
    }
    else{
      var session = rows;

      if(session == null || session == undefined || session == ''){
        messageError = 'Identifiant incorrect ou inexistant';
        res.render('index', { message: messageError, professeur : professeur });
      }
      else{
        

        //check si le mot de passe est correct
        if(session[0].mdp == pwd){

          //check si la session est en cours
          if(session[0].statut == 'en cours'){
            
            var type_ses = '';
            var id='';

            //recupere le type de la session
            sport_dao.findByKey(session[0].le_sport, function(err,rows) {
              if (err ) {
                messageError =err
                res.render('error', { message: messageError});
              }
              else{
                type_ses= rows[0].type_session;
            
                //check si l'eleve ou le professeur(connecté en tant qu'eleve pour pouvoir etre aussi dans la session si besoin) existe deja dans la base de donnée
                eleve_dao.findByName(nomEleve, function(err,rows) {
                  if (err ) {
                    messageError ='Connexion a la base de donnée impossible'
                  }
                  else{
                    var eleve_req = rows;
                    var prenomEleveBdd = '';
                    var nomEleveBdd = '';
                    var classeEleveBdd = '';
            
                    //recupere le prenom de l'eleve de la base de donnée si il existe 
                    if(eleve_req.length != 0){
                      existant = '';
                      for(var i = 0; i < eleve_req.length; i++){

                        prenomEleveBdd = eleve_req[i].prenom;
                        nomEleveBdd = eleve_req[i].nom;
                        classeEleveBdd = eleve_req[i].classe;

                        if(prenomEleveBdd == prenomEleve && nomEleveBdd == nomEleve && classeEleveBdd == classeEleve){
                          existant = true;
                          id = eleve_req[i].id_eleve;
                          console.log('eleve/professeur connecter en tant qu eleve deja existant');
                          break;
                        }
                        else{
                          existant = false;
                        }
                      };

                      if(existant == false){

                        //si l'eleve n'existe pas on l'ajoute dans la base de donnée
                        var eleve = new Eleve();
    
                        eleve.init(nomEleve,prenomEleve,"homme",classeEleve);
                        eleve_dao.insert(eleve, function(err,rows) {
                          if (err ) {
                            messageError =err;
                            console.log(messageError);
                          }
                          else{
                            console.log('nouveau eleve/professeur connecter en tant qu eleve cree ');
                            //recupere l'id de l'eleve inseré
                            id = rows.insertId;
                          }
                        });
                      }else if(existant == true){
                        id = eleve_req[0].id_eleve;
                      }

                      //renvoie la page en fonction du type de session
                      if(type_ses == 'tournoi equipe'){
                        res.redirect('/classement_equipe?ses='+ session[0].id_session + '&id_el=' + id);
                      }else if(type_ses == 'resultat'){
                        res.redirect('/resultat?idSport=' + session[0].le_sport + '&ses=' + session[0].id_session + '&nom=' + nomEleve + '&prenom=' + prenomEleve + '&classe=' + classeEleve);
                      }else if(type_ses == 'tournoi individuel' ){
                        res.redirect('/classement_eleve?ses=' + session[0].id_session + '&id_el=' + id);
                      }

                    }else {
                        
                      //si l'eleve n'existe pas on l'ajoute dans la base de donnée
                      var eleve = new Eleve();
  
                      eleve.init(nomEleve,prenomEleve,"homme",classeEleve);
                      eleve_dao.insert(eleve, function(err,rows) {
                        if (err ) {
                          messageError =err;
                          console.log(messageError);
                        }
                        else{
                          console.log('nouveau eleve/professeur connecter en tant qu eleve cree ');
                          //recupere l'id de l'eleve inseré
                          id = rows.insertId;

                          //renvoie la page en fonction du type de session
                          if(type_ses == 'tournoi equipe'){
                            res.redirect('/classement_equipe?ses='+ session[0].id_session + '&id_el=' + id);
                          }else if(type_ses == 'resultat'){
                            res.redirect('/resultat?idSport=' + session[0].le_sport + '&ses=' + session[0].id_session + '&nom=' + nomEleve + '&prenom=' + prenomEleve + '&classe=' + classeEleve);
                          }else if(type_ses == 'tournoi individuel' ){
                            res.redirect('/classement_eleve?ses=' + session[0].id_session + '&id_el=' + id);
                          }
                        }
                      });
                    }
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
            });
          }
          else{
            messageError = 'Session terminée';
            res.render('index', { message: messageError, professeur : professeur });
          }
        }else{
          messageError = 'Mot de passe incorrect';
          res.render('index', { message: messageError, professeur : professeur });
        }
      }
    }
  });
});
module.exports = router;
