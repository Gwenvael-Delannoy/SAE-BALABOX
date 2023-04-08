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


/* Recuperer la page qui liste toutes les session créer par le professeur connecté . */
router.get('/', function(req, res, next) {
  session_dao.FindSessionProfSport("Raul Adrien",function(err,rows) {
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
    res.redirect('crSession');

  }

  var id = req.body.id;

  session_dao.findByKey(id, function(err, row) {
    if (err) res.render("error", {message: err});
    else {
      var id_sport = row[0].le_sport;
      var type_session = row[0].type_session;      

      if(req.body.action == 'update') {
        res.redirect('crSession');
    
      } else if(req.body.action == 'view') {
        //res.redirect('/resultat?ses='+id+'&idSport='+id_sport+'');
        res.redirect('/gestionEquipe?idSession='+id+'&idSport='+id_sport+'');
    
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
                          res.redirect('listeSession');
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
                                    res.redirect('listeSession');
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
                          res.redirect('listeSession');
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
                                      res.redirect('listeSession');
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
                          res.redirect('listeSession');
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
                                    res.redirect('listeSession');
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
                          res.redirect('listeSession');
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
                                        res.redirect('listeSession');
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
                          res.redirect('listeSession');
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
                                        res.redirect('listeSession');
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
                          res.redirect('listeSession');
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
                                res.redirect('listeSession');
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
                  res.redirect('listeSession');
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
                    res.redirect('listeSession');
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
                              res.redirect('listeSession');
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
                    res.redirect('listeSession');
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
                              res.redirect('listeSession');
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
});

module.exports = router;