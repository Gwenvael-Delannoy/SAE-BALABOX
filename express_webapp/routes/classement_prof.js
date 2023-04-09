var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
var Eleve = require('../models/eleve');
var matchSession = [];
let classement;
var wss ;

var id_session ='';
var type_sport ='';


wss = new WebSocket('ws://localhost:3001');
wss.onopen = function () {
  console.log('Connexion websocket du classement reussie');
};

wss.onerror = function (error) {
  console.log('Connexion websocket du classement error :  ', error);
};

wss.onclose = function () {
  console.log('Déconnexion websocket du classement');
};


/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {
    id_session = req.query.idsession;
    type_sport = req.query.type;
    classement = {};

    match_dao.findAllMatchSes(id_session, function(err,rows) {
      if (err ) {
          messageError ='Session inexistante,merci de revenir en arriere et ressayer';
          res.render('error',{message : messageError});
      }
      else{
          matchSession = rows;

          if(matchSession.length != 0){
              var k;
              var nbMatchFait =1;
              var nbMatchTotal = matchSession.length;
              
              if(type_sport == 'tournoi individuel'){
                for(k = 0; k < matchSession.length; k++){
                  
                  var id_match = matchSession[k].id_match;
                  match_dao.findMatch_ElevesByMatch(id_match, function(err,rows) {
                      
                      if (err ) {
                          messageError ='Connexion à la base de donnée impossible';
                          res.render('error',{message : messageError});
                      }
                      else{
                          let points = {};

                          points[0] = rows[0].gagnant;
                          points[1] = rows[1].gagnant;
                  
                          var compteur = 0;//compteur pour savoir si on a parcouru nos deux eleves de ce match

                          for(var i = 0; i < rows.length; i++){

                              var id_eleveMatch= rows[i].leleve;

                              eleve_dao.findByKey(id_eleveMatch, function(err,rows) {
                                  if (err ) {
                                      messageError ='Connexion à la base de donnée impossible';
                                      res.render('error',{message : messageError});
                                  }
                                  else{
                                      if(rows.length != 0){              
                                          if(classement[rows[0].id_eleve]!= undefined && classement[rows[0].id_eleve] != null && classement[rows[0].id_eleve] != ''){
                                              eleve_info = classement[rows[0].id_eleve];
                                              eleve_info[3] += points[compteur];  
                                              eleve_info[4] += 1;
                                              classement[rows[0].id_eleve] = eleve_info;


                                              //divier par 2 car on a 2 eleve par match donc on compte 2 fois un match , et une fois arrivé au bout du compte de match total on envoie la donnée au websocket
                                              if((nbMatchFait/2) == nbMatchTotal){
                                          
                                                  wss.send(JSON.stringify({
                                                      type: 'classement',
                                                      session: id_session,
                                                      classement:JSON.stringify(classement),
                                                  }));
                                                  res.render('classement_prof',{type:type_sport , idSession:id_session , message:''});
                                              }
                                              
                                          } else {
                                              eleve_info = [];
                                              eleve_info[0] = rows[0].id_eleve;
                                              eleve_info[1] = rows[0].nom;
                                              eleve_info[2] = rows[0].prenom;
                                              eleve_info[3] = points[compteur];  
                                              eleve_info[4] = 1;
                                              classement[rows[0].id_eleve] = eleve_info;
                                              classementBis = classement;

                                              if((nbMatchFait/2) == nbMatchTotal){
                                                  console.log('classement : ' + JSON.stringify(classement));
                                                  wss.send(JSON.stringify({
                                                      type: 'classement',
                                                      session: id_session,
                                                      classement:JSON.stringify(classement),
                                                  }));
                                                  res.render('classement_prof',{type:type_sport , idSession:id_session , message:''});
                                              }
                                              
                                          }
                                          compteur++;
                                          nbMatchFait++;
                                      }
                                      else{
                                          messageError ='Eleve non existant dans la base de données,merci de revenir en arriere et ressayer';
                                          res.render('error',{message : messageError});
                                      }
                                  }
                              });
                          }
                      }
                  });
                }
              }
              else if(type_sport == 'tournoi equipe'){
                res.render('classement_prof',{type:type_sport , idSession:id_session , message:''});
              }
              else{
                messageError ='Page de classement non disponible, merci de revenir en arriere et ressayer';
                res.render('error',{message : messageError});
              }                  
          }else {
            message = "Aucun match dans cette session";
            res.render('classement_prof',{type:type_sport , idSession:id_session,message:message});
          }
      }
  });
});
router.post('/', function(req, res, next) {
    
    var sport ='';
    if(type_sport =='tournoi equipe'){
        sport = req.query.sport;
    }
    if (req.body.action ==  'Gestion des equipes'){
      res.redirect('/gestionEquipe?idsession='+id_session+'&type='+type_sport);
    }
    else if (req.body.action ==  'Retour'){
      res.redirect('/listeSession');
    }
});

module.exports = router;