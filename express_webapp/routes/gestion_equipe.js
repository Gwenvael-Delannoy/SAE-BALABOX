var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var equipe_dao =  require('../models/dao/dataBase').equipe_dao;
var sport_dao = require('../models/dao/dataBase').sport_dao;
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var match = require('../models/match');
var Equipe = require('../models/Equipe');



/* GET error page. */
router.get('/', function(req, res, next) {
  var idSession = req.query.idsession;
  var type = req.query.type;
  equipe_dao.findAll(function(err,rows1) {
    if (err ) {
        messageError ='Session inexistante,merci de revenir en arriere et ressayer';
        res.render('error',{message : messageError});
    }
    else{
      var equipes = [];
      

      equipe_dao.findAllEquipeEleve(function(err,rows2) {
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
          res.render('gestion_equipe',{idSession : idSession, type : type, equipes : equipes});
        }
      });
    }
  });
  
});

router.post('/', function(req, res, next) {
  var statut = req.body.statut;

  if(statut == "newEquipe"){
    var idSession = req.body.idSession;

    var equipe = new Equipe();
    equipe.init(0,0);
    equipe_dao.insert(equipe, function(err) {
      if (err ) {
          messageError ='Session inexistante,merci de revenir en arriere et ressayer';
          res.render('error',{message : messageError});
      }
      else{
        console.log("equipe inseree");
        equipe_dao.findAll(function(err,rows) {
          if(err){
            messageError ='Session inexistante,merci de revenir en arriere et ressayer';
            res.render('error',{message : messageError});
          }else{
            equipe_dao.findAll(function(err,rows1) {
              if (err ) {
                  messageError ='Session inexistante,merci de revenir en arriere et ressayer';
                  res.render('error',{message : messageError});
              }
              else{
                var equipes = [];
                
          
                equipe_dao.findAllEquipeEleve(function(err,rows2) {
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
                    res.render('gestion_equipe',{idSession : idSession, type : "tournoi equipe", equipes : equipes});
                  }
                });
              }
            });
          }
        });
      }
    });

  }else if(statut == "ajoutEleve"){
    var nomEleve = req.body.mySelect;
    console.log(nomEleve)
    var idEquipe = req.body.idEquipe;
    if(nomEleve == undefined){
      messageError ='Vous devez selectionner un eleve';
      res.render('error',{message : messageError});
    } else{

      var nom = nomEleve.split(" ");
      var nom = nom[0];
      eleve_dao.findByName(nom, function(err,rows) {
        if (err ) {
            messageError ='Session inexistante,merci de revenir en arriere et ressayer';
            res.render('error',{message : messageError});
        }
        else{
          console.log(rows);
          var idEleve = rows[0].id_eleve;
          equipe_dao.insertEleveEquipe(idEleve, idEquipe, function(err) {
            if (err ) {
                messageError ='Session inexistante,merci de revenir en arriere et ressayer';
                res.render('error',{message : messageError});
            }
            else{
              console.log("eleve insere");
              equipe_dao.findAll(function(err,rows1) {
                if (err ) {
                    messageError ='Session inexistante,merci de revenir en arriere et ressayer';
                    res.render('error',{message : messageError});
                }
                else{
                  var equipes = [];
                  
            
                  equipe_dao.findAllEquipeEleve(function(err,rows2) {
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
                      res.render('gestion_equipe',{idSession : idSession, type : "tournoi equipe", equipes : equipes});
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }

});

module.exports = router;