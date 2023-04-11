var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var acrosport_dao = require('../models/dao/dataBase').acrosport_dao;
var figure_dao = require('../models/dao/dataBase').figure_dao;
var voie_dao = require('../models/dao/dataBase').voie_dao;
var natation_dao = require('../models/dao/dataBase').natation_dao;
var escalade_dao = require('../models/dao/dataBase').escalade_dao;
var musculation_dao = require('../models/dao/dataBase').musculation_dao;
var step_dao = require('../models/dao/dataBase').step_dao;
var resultat_dao = require('../models/dao/dataBase').resultat_dao;
var eleve_dao = require('../models/dao/dataBase').eleve_dao;

var id_session ;
var nom_sport = '';

/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {
  var id_sport = req.query.sport;
  id_session = req.query.idsession;

  sport_dao.findByKey(id_sport, function(err, row) {
    nom_sport = row[0].nom_sport;

    if (err) res.render("error", {message: err});
    else{
      resultat_dao.findBySession(id_session, function(err, rows) {
        if(err){
          res.render("error", {message: err});
        }
        else{
          if(rows.length == 0){
            res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:'Auncun résultat pour cette session'});
          }else{
            for(i = 0; i < rows.length; i++){
              var tmp =[];
              var id_eleve=rows[i].unEleve;
              var id_resultat = rows[i].id_resultat;
              var resultatEncours = rows[i];
              eleve_dao.findByKey(id_eleve, function(err, row) {
                if(err){
                  res.render("error", {message: err});
                }else{
                  tmp[0] = row[0].nom;
                  tmp[1] = row[0].prenom;
                  tmp[2] = row[0].classe;
                  if(nom_sport == "Course"){
                    tmp[3] = resultatEncours.temps;
                    tmp[4] = resultatEncours.distance;
                    tmp[5] = resultatEncours.freq_card;
                    tmp[6] = resultatEncours.complementaire;
  
                    
                    envoieDonneesProf({
                      sport : nom_sport,                
                      nom : tmp[0],
                      prenom : tmp[1],
                      classe : tmp[2],
                      session : id_session,
                      temps : tmp[3],
                      distance : tmp[4],
                      freq_card : tmp[5],
                      complementaire : tmp[6],
                    });
                    res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:''});
                  }
                  else if (nom_sport == "Musculation"){
  
                    musculation_dao.findByKey(id_resultat, function(err, rowsiiiii) {
                      if(err){
                        res.render("error", {message: err});
                      }else{
                        tmp[3]=resultatEncours.temps;
                        tmp[4]=rowsiiiii.series;
                        tmp[5]=rowsiiiii.nb_reps;
                        tmp[6]=rowsiiiii.intensite;
                        tmp[7]=rowsiiiii.charge;
                        tmp[8]=rowsiiiii.ressenti;
                        tmp[9]=rowsiiiii.muscle_travailler;
  
                        envoieDonneesProf({
                          sport : nom_sport,                
                          nom : info_eleveProfConnecte[0],
                          prenom : info_eleveProfConnecte[1],
                          classe : info_eleveProfConnecte[2],
                          session : info_eleveProfConnecte[3],
                          nom_muscle : tmp[9],
                          nb_series : tmp[4],
                          nb_repetitions : tmp[5],
                          intensite : tmp[6],
                          poids : tmp[7],
                          temps_pause: tmp[3],
                          ressenti : tmp[8],
                        });
                        res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:''});
                      }
                    });
                  }
                  else if (nom_sport == "Acrosport"){
  
                    acrosport_dao.findByKey(id_resultat, function(err, rowsiiii) {
                      if(err){
                        res.render("error", {message: err});
                      }
                      else{
                        tmp[3]=rowsiiii[0].total_point;
                        tmp[4]='';
  
                        figure_dao.findByAcro(id_resultat, function(err, rowss){
                          if(err){
                            res.render("error", {message: err});
                          }
                          else{
                            var tmp2=[];
                            if(rowss.length == 0){
                              tmp2[0] = "Aucune figure";
                            }
                            else {
                              for(j = 0; j < rowss.length; j++){
                                var id_figure = rowss[j].laFigure;
                                console.log(id_figure);
                                figure_dao.findByKey(id_figure, function(err, rowsss) {
                                  if(err){
                                    res.render("error", {message: err});
                                  }
                                  else{
                                    tmp2.push (rowsss[0].nom + " | " + rowsss[0].point);
                                  }
                                });
                              }
                            }
                            envoieDonneesProf({
                              sport : nom_sport,                
                              nom : tmp[0],
                              prenom : tmp[1],
                              classe : tmp[2],
                              session : id_session,
                              total_point : tmp[3],
                              figures : tmp2,
                            });
                            res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:''});
                          }
                        });
                      }
                    });
                  }
                  else if (nom_sport == "Escalade"){
  
                    escalade_dao.findByKey(id_resultat, function(err, rowdd) {
                      if(err){
                        res.render("error", {message: err});
                      }
                      else{
                        tmp[3]=resultatEncours.temps;
                        tmp[4]=resultatEncours.complementaire;
                        tmp[5]=rowdd[0].assureur;

  
                        escalade_dao.findVoieByEscalade(id_resultat, function(err, rowss){
                          if(err){
                            res.render("error", {message: err});
                          }
                          else{
                            var id_voie = rowss[0].laVoie;
                            voie_dao.findByKey(id_voie, function(err, rowsss) {
                              if(err){
                                res.render("error", {message: err});
                              }
                              else{
  
                                tmp[6]=rowsss[0].nom_voie;
                                tmp[7]=rowsss[0].deg_diffi;
                                console.log(tmp);
                                envoieDonneesProf({
                                  sport : nom_sport,                
                                  nom : tmp[0],
                                  prenom : tmp[1],
                                  classe : tmp[2],
                                  session : id_session,
                                  la_voie : tmp[6],
                                  deg_diffi : tmp[7],
                                  assureur : tmp[5],
                                  temps: tmp[3],
                                  complementaire : tmp[4]
      
                                });
                                res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:''});
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                  else if(non_sport == "Natation"){
  
                    tmp[3]=resultatEncours.temps;
                    tmp[4]=resultatEncours.distance;
                    tmp[5]=resultatEncours.complementaire;
                    
  
                    natation_dao.findByKey(id_resultat, function(err, rowsii) {
                      if(err){
                        res.render("error", {message: err});
                      }else{
                        tmp[6]=rowsii.plongeons;
                        tmp[7]=rowsii.style_nage;
                        tmp[8]=rowsii.nom_bassin;
  
                        envoieDonneesProf({
                          sport : nom_sport,                
                          nom : tmp[0],
                          prenom : tmp[1],
                          classe : tmp[2],
                          session : id_session,
                          nom_bassin : tmp[8],
                          style_nage : tmp[7],
                          distance : tmp[4],
                          temps:tmp[3],
                          nbPlongeons : tmp[6],
                          complementaire : tmp[5],
                        });
                        res.render('resultat_prof',{idSession:id_session,nom,message:''});
                      }
                    });
                  }else if(nom_sport == "Step"){
  
                    tmp[3]=resultatEncours.temps;
                    tmp[4]=resultatEncours.freq_card
  
                    step_dao.findByKey(id_resultat, function(err, rowsiii) {
                      if(err){
                        res.render("error", {message: err});
                      }else{
                        tmp[5]=rowsiii.type_mobilite;
                        tmp[6]=rowsiii.ressenti;
                        tmp[7]=rowsiii.paramIndv;
                        tmp[8]=rowsiii.bilanPerso;
                        tmp[9]=rowsiii.perspective;
  
  
                        envoieDonneesProf({
                          sport : nom_sport,                
                          nom : tmp[0],
                          prenom : tmp[1],
                          classe : tmp[2],
                          session : id_session,
                          type_mobilite : tmp[5],
                          temps :  tmp[3],
                          freq_cardiaque :  tmp[4],
                          paramIndv :  tmp[7],
                          ressenti :  tmp[6],
                          bilanPerso :  tmp[8],
                          perspective :  tmp[9],
                        });
                        res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:''});
                      }
                    });
                  }
                  else{
                    res.render("error", {message: "Sport non reconnu"});
                  }
                }
              });
            }
          }
        }
      });
    }
  });
});

router.post('/', function(req, res, next) {
  if (req.body.action ==  'Retour'){
    res.redirect('/listeSession');
  }
});
function envoieDonneesProf(donnees) {
  var WebSocket = require('ws');
  var wss;
  // Connexion au websocket du professeur
  wss = new WebSocket('ws://localhost:3001');
  wss.on('open', function open() {
    wss.send(JSON.stringify({type: 'resultat_eleve',nom_sport : nom_sport ,session : id_session,data: donnees}));
  });
}
module.exports = router;