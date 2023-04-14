var express = require('express');
const session = require('express-session');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;
var resultat_dao =  require('../models/dao/dataBase').resultat_dao;
var sport_dao = require('../models/dao/dataBase').sport_dao;
var musculation_dao = require('../models/dao/dataBase').musculation_dao;
var natation_dao = require('../models/dao/dataBase').natation_dao;
var step_dao = require('../models/dao/dataBase').step_dao;
var acrosport_dao = require('../models/dao/dataBase').acrosport_dao;
var escalade_dao = require('../models/dao/dataBase').escalade_dao;
var match_dao = require('../models/dao/dataBase').match_dao;

//import api 
//var api = require_once(_ROOT_.'/config.php');
var nom_prof;

/* Recuperer la page qui liste toutes les session créer par le professeur connecté . */
router.get('/', function(req, res, next) {
  if(req.query.prof){
    nom_prof = req.query.prof;
  } else {
    res.redirect("/?message=Vous n'avez pas accès à cette page, merci de vous connecter avant");
  }
  

  //requeter l'api avec /authentified et on recuepre le role et on regarde si s'est un professer ou non
  /**
   var role = (appel api);
   //dechiffrement du JWT TOKEN avec la clé public

   if(role =='False' || role == 4 ||role == 5){
    message = 'Vous n avez pas accès à se service , merci de vous connecter avant'.
   }else if(role ==1 || role == 2 ||role == 3 ){ 
    nom_prof = (resultat de l'appel api);
   }
   */
  session_dao.FindSessionProfSport(nom_prof,function(err,rows) {
    if (err ) {
      res.render("error", {message: err});
    }
    else{
      res.render('listeSession',{session : rows});
    }
  });
});

router.post('/', function(req, res, next) {
  if(req.body.action == 'add') {
    res.redirect('/crSession?prof='+nom_prof+'');

  }

  var id = req.body.id;

  session_dao.findByKey(id, function(err, row) {
    if (err) res.render("error", {message: err});
    else {
      
      var id_sport = row[0].le_sport;
      var type_session='';

      sport_dao.findByKey(id_sport, function(err, row) {
        if (err) res.render("error", {message: err});
        else {
          type_session = row[0].type_session;
 
          if(req.body.action == 'update') {
            res.redirect('/updateSession?prof='+nom_prof+'&idSession=' + id+'');
        
          } else if(req.body.action == 'view') {

            if(type_session == "resultat") {
              res.redirect('resultat_prof?idsession=' + id +'&sport=' + id_sport+'&prof=' +nom_prof);
            } else if(type_session == "tournoi equipe") {
              res.redirect('classement_prof?idsession=' + id + '&type=tournoi equipe' + '&sport=' + id_sport+'&prof=' +nom_prof);
            }else if(type_session == "tournoi individuel") {
              res.redirect('classement_prof?idsession=' + id + '&type=tournoi individuel&prof=' +nom_prof);
            }
        
          } else {

            if(type_session == "resultat") {
              sport_dao.findByKey(id_sport, function(err, row) {
                var nom_sport = row[0].nom_sport;

                if (err) res.render("error", {message: err});
                else{
                  if (nom_sport == "Musculation"){
                    resultat_dao.findBySession(id, function(err, rows) {
                      if (err) res.render("error", {message: err});
                      else{

                        var nbRows = rows.length;

                        if(nbRows == 0){
                          session_dao.delete(id, function(err, row) {
                            if (err) {
                              res.render("error", {message: err});
                            } else {
                              res.redirect('listeSession?prof='+nom_prof+'');
                            }
                          });
                        }

                        rows.forEach(function(row, index) {

                          var id_resultat = row.id_resultat;
                  
                          musculation_dao.delete(id_resultat, function(err, row) {
                            if (err) res.render("error", {message: err});
                            else {
                              var i = index;
                              resultat_dao.delete(id_resultat, function(err, row) {
                                if (err) res.render("error", {message: err});
                                else {
                                  
                                  if(i == nbRows-1){
                                    session_dao.delete(id, function(err, row) {
                                      if (err) {
                                        res.render("error", {message: err});
                                      } else {
                                        res.redirect('listeSession?prof='+nom_prof+'');
                                      }
                                    });
                                  }
                                }
                              });
                            }
                          });
                        });
                      }
                    });
                  } else if (nom_sport == "Natation"){
                    resultat_dao.findBySession(id, function(err, rows) {
                      if (err) res.render("error", {message: err});
                      else{
                        var nbRows = rows.length;

                        if(nbRows == 0){
                          session_dao.delete(id, function(err, row) {
                            if (err) {
                              res.render("error", {message: err});
                            } else {
                              res.redirect('listeSession?prof='+nom_prof+'');
                            }
                          });
                        }

                        rows.forEach(function(row, index) {

                          var id_resultat = row.id_resultat;
                          natation_dao.delete(id_resultat, function(err, row) {
                            if (err) res.render("error", {message: err});
                            else {
                              var i = index;
                              resultat_dao.delete(id_resultat, function(err, row) {
                                if (err) res.render("error", {message: err});
                                else {
                                  if(i == nbRows-1){
                                    session_dao.delete(id, function(err, row) {
                                      if (err) {
                                          res.render("error", {message: err});
                                      } else {
                                          res.redirect('listeSession?prof='+nom_prof+'');
                                      }
                                    });
                                  }
                                }
                              });
                            }
                          });
                        });
                      }
                    });
                  } else if (nom_sport == "Step") {

                    resultat_dao.findBySession(id, function(err, rows) {
                      if (err) res.render("error", {message: err});
                      else{
                        var nbRows = rows.length;

                        if(nbRows == 0){
                          session_dao.delete(id, function(err, row) {
                            if (err) {
                              res.render("error", {message: err});
                            } else {
                              res.redirect('listeSession?prof='+nom_prof+'');
                            }
                          });
                        }
                  
                        rows.forEach(function(row, index) {

                          var id_resultat = row.id_resultat;
                  
                          step_dao.delete(id_resultat, function(err, row) {
                            if (err) res.render("error", {message: err});
                            else {
                              var i = index;
                              resultat_dao.delete(id_resultat, function(err, row) {
                                if (err) res.render("error", {message: err});
                                else {
                                  
                                  if(i == nbRows-1){
                                    session_dao.delete(id, function(err, row) {
                                      if (err) {
                                        res.render("error", {message: err});
                                      } else {
                                        res.redirect('listeSession?prof='+nom_prof+'');
                                      }
                                    });
                                  }
                                }
                              });
                            }
                          });
                        });
                      }
                    });
                  } else if (nom_sport == "Acrosport") {
                    resultat_dao.findBySession(id, function(err, rows) {
                      if (err) res.render("error", {message: err});
                      else{
                        var nbRows = rows.length;

                        if(nbRows == 0){
                          session_dao.delete(id, function(err, row) {
                            if (err) {
                              res.render("error", {message: err});
                            } else {
                              res.redirect('listeSession?prof='+nom_prof+'');
                            }
                          });
                        }
                  
                        rows.forEach(function(row, index) {

                          var id_resultat = row.id_resultat;

                  
                          acrosport_dao.deleteFigure_acrosport(id_resultat, function(err, row) {
                            if (err) res.render("error", {message: err});
                            else {
                              var i = index;
                              acrosport_dao.delete(id_resultat, function(err, row) {
                                if (err) res.render("error", {message: err});
                                else {
                                  resultat_dao.delete(id_resultat, function(err, row) {
                                    if (err) res.render("error", {message: err});
                                    else {
                                      
                                      if(i == nbRows-1){
                                        session_dao.delete(id, function(err, row) {
                                          if (err) {
                                            res.render("error", {message: err});
                                          } else {
                                            res.redirect('listeSession?prof='+nom_prof+'');
                                          }
                                        });
                                      }
                                    }
                                  });
                                }
                              });
                            }
                          });
                        });
                      }
                    });
                  } else if (nom_sport == "Escalade") {

                    resultat_dao.findBySession(id, function(err, rows) {
                      if (err) res.render("error", {message: err});
                      else{
                        var nbRows = rows.length;

                        if(nbRows == 0){
                          session_dao.delete(id, function(err, row) {
                            if (err) {
                              res.render("error", {message: err});
                            } else {
                              res.redirect('listeSession?prof='+nom_prof+'');
                            }
                          });
                        }
                  
                        rows.forEach(function(row, index) {

                          var id_resultat = row.id_resultat;

                  
                          escalade_dao.deleteEscalade_voie(id_resultat, function(err, row) {
                            if (err) res.render("error", {message: err});
                            else {
                              var i = index;
                              escalade_dao.delete(id_resultat, function(err, row) {
                                if (err) res.render("error", {message: err});
                                else {
                                  resultat_dao.delete(id_resultat, function(err, row) {
                                    if (err) res.render("error", {message: err});
                                    else {
                                      
                                      if(i == nbRows-1){
                                        session_dao.delete(id, function(err, row) {
                                          if (err) {
                                            res.render("error", {message: err});
                                          } else {
                                            res.redirect('listeSession?prof='+nom_prof+'');
                                          }
                                        });
                                      }
                                    }
                                  });
                                }
                              });
                            }
                          });
                        });
                      }
                    });
                  } else  if (nom_sport == "Course") {
                    resultat_dao.findBySession(id, function(err, rows) {
                      if (err) res.render("error", {message: err});
                      else{
                        var nbRows = rows.length;

                        if(nbRows == 0){
                          session_dao.delete(id, function(err, row) {
                            if (err) {
                              res.render("error", {message: err});
                            } else {
                              res.redirect('listeSession?prof='+nom_prof+'');
                            }
                          });
                        }
                  
                        rows.forEach(function(row, index) {

                          var id_resultat = row.id_resultat;
                          
                          
                          resultat_dao.delete(id_resultat, function(err, row) {
                            if (err) res.render("error", {message: err});
                            else {
                              var i = index;
                              if(i == nbRows-1){
                                session_dao.delete(id, function(err, row) {
                                  if (err) {
                                    res.render("error", {message: err});
                                  } else {
                                    res.redirect('listeSession?prof='+nom_prof+'');
                                  }
                                });
                              }
                            }
                          });
                        });
                      }
                    });
                  }
                }
              });
            } else if(type_session == "tournoi equipe") {

              console.log("tournoi equipe");
                
              match_dao.findBySession(id, function(err, rows) {
                if(err){
                  session_dao.delete(id, function(err, row) {
                    if (err) {
                      res.render("error", {message: err});
                    } else {
                      res.redirect('listeSession?prof='+nom_prof+'');
                    }
                  });
                }
                else{
                  var nbRows = rows.length;

                  if(nbRows == 0){
                    session_dao.delete(id, function(err, row) {
                      if (err) {
                        res.render("error", {message: err});
                      } else {
                        res.redirect('listeSession?prof='+nom_prof+'');
                      }
                    });
                  }
            
                  rows.forEach(function(row, index) {

                    var id_match = row.id_match;

                    match_dao.deleteMatch_Equipe(id_match, function(err, row) {

                      if (err) res.render("error", {message: err});
                      else {
                        var i = index;
                        
                        match_dao.delete(id_match, function(err, row) {
                          if (err) res.render("error", {message: err});
                          else {
                            if(i == nbRows-1){
                              session_dao.delete(id, function(err, row) {
                                if (err) {
                                  res.render("error", {message: err});
                                } else {
                                  res.redirect('listeSession?prof='+nom_prof+'');
                                }
                              });
                            }
                          }
                        });
                      }
                    });
            
                  });
                }
              });
            } else {

              console.log("tournoi eleve");

              match_dao.findBySession(id, function(err, rows) {
                if (err) {
                  res.render("error", {message: err});
                }
                else{
                  var nbRows = rows.length;

                  if(nbRows == 0){
                    session_dao.delete(id, function(err, row) {
                      if (err) {
                        res.render("error", {message: err});
                      } else {
                        res.redirect('listeSession?prof='+nom_prof+'');
                      }
                    });
                  }
            
                  rows.forEach(function(row, index) {

                    var id_match = row.id_match;

                    match_dao.deleteMatch_Eleve(id_match, function(err, row) {

                      if (err) res.render("error", {message: err});
                      else {
                        var i = index;
                        
                        match_dao.delete(id_match, function(err, row) {
                          if (err) res.render("error", {message: err});
                          else {
                            if(i == nbRows-1){
                              session_dao.delete(id, function(err, row) {
                                if (err) {
                                  res.render("error", {message: err});
                                } else {
                                  res.redirect('listeSession?prof='+nom_prof+'');
                                }
                              });
                            }
                          }
                        });
                      }
                    });
                  });
                }
              });
            }
          }
        }
      });
    }
  });
});

module.exports = router;