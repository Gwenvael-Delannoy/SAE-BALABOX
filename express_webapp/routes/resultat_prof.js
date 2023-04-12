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
            console.log("rows.length : " + rows.length);
            for(i = 0; i < rows.length; i++){
              var tmp =[];
              var k = i;
              var id_eleve=rows[i].unEleve;
              var resultatEncours = rows[i];
              console.log(resultatEncours);

              if(k == rows.length -1){
                res.render('resultat_prof',{idSession:id_session,nom_sport:nom_sport,message:''});
              }

              eleve_dao.findByKey(id_eleve, function(err, row) {
                console.log("id_resultat : " + resultatEncours.id_resultat);
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
                  }
                  else if (nom_sport == "Musculation"){
  
                    musculation_dao.findByKey(resultatEncours.id_resultat, function(err, rowsiiiii) {
                      if(err){
                        res.render("error", {message: err});
                      }else{
                        tmp[3]=resultatEncours.temps;
                        tmp[4]=rowsiiiii[0].series;
                        tmp[5]=rowsiiiii[0].nb_reps;
                        tmp[6]=rowsiiiii[0].intensite;
                        tmp[7]=rowsiiiii[0].charge;
                        tmp[8]=rowsiiiii[0].ressenti;
                        tmp[9]=rowsiiiii[0].muscle_travailler;
  
                        envoieDonneesProf({
                          sport : nom_sport,                
                          nom : tmp[0],
                          prenom : tmp[1],
                          classe : tmp[2],
                          session : id_session,
                          nom_muscle : tmp[9],
                          nb_series : tmp[4],
                          nb_repetitions : tmp[5],
                          intensite : tmp[6],
                          poids : tmp[7],
                          temps_pause: tmp[3],
                          ressenti : tmp[8],
                        });
                      }
                    });
                  }
                  else if (nom_sport == "Acrosport"){
  
                    acrosport_dao.findByKey(resultatEncours.id_resultat, function(err, rowsiiii) {
                      if(err){
                        res.render("error", {message: err});
                      }
                      else{
                        tmp[3]=rowsiiii[0].total_point;
                        tmp[4]='';
  
                        figure_dao.findByAcro(resultatEncours.id_resultat, function(err, rowss){
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
                                
                                figure_dao.findByKey(id_figure, function(err, rowsss) {
                                  if(err){
                                    res.render("error", {message: err});
                                  }
                                  else{
                                    tmp2.push (rowsss[0].nom + " | " + rowsss[0].point);
                                    if(tmp2.length == rowss.length){
                                      envoieDonneesProf({
                                        sport : nom_sport,                
                                        nom : tmp[0],
                                        prenom : tmp[1],
                                        classe : tmp[2],
                                        session : id_session,
                                        total_point : tmp[3],
                                        figures : tmp2,
                                      });
                                    }
                                  }
                                });
                              }
                            }
                          }
                        });
                      }
                    });
                  }
                  else if (nom_sport == "Escalade"){
                    console.log("id_resultat : " + resultatEncours.id_resultat);
  
                    escalade_dao.findByKey(resultatEncours.id_resultat, function(err, rowdd) {
                      if(err){
                        res.render("error", {message: err});
                      }
                      else{
                        tmp[3]=resultatEncours.temps;
                        tmp[4]=resultatEncours.complementaire;
                        tmp[5]=rowdd[0].assureur;

                        escalade_dao.findVoieByEscalade(resultatEncours.id_resultat, function(err, rowss){
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
                                console.log("ok3");
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
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                  else if(nom_sport == "Natation"){
  
                    tmp[3]=resultatEncours.temps;
                    tmp[4]=resultatEncours.distance;
                    tmp[5]=resultatEncours.complementaire;
                    
  
                    natation_dao.findByKey(resultatEncours.id_resultat, function(err, rowsii) {
                      if(err){
                        res.render("error", {message: err});
                      }else{
                        tmp[6]=rowsii[0].plongeons;
                        tmp[7]=rowsii[0].style_nage;
                        tmp[8]=rowsii[0].nom_bassin;
  
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
                      }
                    });
                  }else if(nom_sport == "Step"){
  
                    tmp[3]=resultatEncours.temps;
                    tmp[4]=resultatEncours.freq_card;
                    step_dao.findByKey(resultatEncours.id_resultat, function(err, rowsiii) {
                      if(err){
                        res.render("error", {message: err});
                      }else{
                        console.log(rowsiii[0]);
                        tmp[5]=rowsiii[0].type_mobilite;
                        tmp[6]=rowsiii[0].ressenti;
                        tmp[7]=rowsiii[0].param_indv;
                        tmp[8]=rowsiii[0].bilan_perso;
                        tmp[9]=rowsiii[0].perspective;
                        console.log(rowsiii[0].paramIndv);
                        console.log(rowsiii[0].bilanPerso);
  
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