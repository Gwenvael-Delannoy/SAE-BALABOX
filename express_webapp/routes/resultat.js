var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var acrosport_dao = require('../models/dao/dataBase').acrosport_dao;
var acrosport = require('../models/acrosport');
const Escalade = require('../models/escalade');
var figure_dao = require('../models/dao/dataBase').figure_dao;
var voie_dao = require('../models/dao/dataBase').voie_dao;
var natation_dao = require('../models/dao/dataBase').natation_dao;
var escalade_dao = require('../models/dao/dataBase').escalade_dao;
var musculation_dao = require('../models/dao/dataBase').musculation_dao;
var step_dao = require('../models/dao/dataBase').step_dao;
var resultat_dao = require('../models/dao/dataBase').resultat_dao;
var resultat = require('../models/resultat');
const Natation = require('../models/natation');
const Musculation = require('../models/musculation');
const Step = require('../models/step');
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
//var api = require_once(_ROOT_.'/config.php');

var info_eleveProfConnecte = []; //id de l'eleve ou du professeur connecté
var nom_sport = '';
var id_sport = '';

/* Recuperer la page qui permet la saisie des resultats sportifs en faisant la differenciation pour chaque sport. */
router.get('/', function(req, res, next) {

  //requeter l'api avec /authentified et on recuepre le role de la personne connectée
  /**
   var role = (appel api);
   //dechiffrement du JWT TOKEN avec la clé public

   if(role =='False'){
    message = 'Vous n avez pas accès à se service , merci de vous connecter avant'.
   }else{

   }*/
  
  id_sport = req.query.idSport;

  if(req.query.nom !== undefined && req.query.prenom !== undefined && req.query.classe !== undefined){
    info_eleveProfConnecte[0] = req.query.nom;
    info_eleveProfConnecte[1] = req.query.prenom;
    info_eleveProfConnecte[2] = req.query.classe;
  }
  info_eleveProfConnecte[3] = req.query.ses;

  var nombreFigure ='';
  var afficher ='';

  if(req.query.message !== undefined){
    res.render('resultat', {sport : req.query.sport ,message : req.query.message , afficher : '', session : session});
  }
  if(req.query.nombreFigure !== undefined || req.query.afficher !== undefined ){
    nombreFigure = req.query.nombreFigure;
    afficher = req.query.afficher;
  }
  
  eleve_dao.findByName(info_eleveProfConnecte[0], function(err,rows) {
    if(err){
      res.render('error',{message : err});
    }
    else{
      var eleve = rows;
      if(eleve.length == 0){
        messageError = 'Eleve non existant';
        res.render('error',{message : messageError});
      }
      else {
        //checker si le ou les eleves correspondent à celui connecté*
        if(eleve[0].nom != info_eleveProfConnecte[0] && eleve[0].prenom != info_eleveProfConnecte[1] && eleve[0].classe != info_eleveProfConnecte[2]){
          messageError = 'Eleve non existant';
          res.render('error',{message : messageError});
        }
        else{
          info_eleveProfConnecte[4] = eleve[0].id_eleve;
  
          sport_dao.findByKey(id_sport, function(err,rows) {
            if (err ) {
              messageError ='Connexion à la base de donnée impossible';
            }
            else{
              var sport = rows;
              nom_sport = sport[0].nom_sport;
              console.log(nom_sport);
        
              if(nom_sport == 'Acrosport'){
                figure_dao.findAll(function(err,rows) {
                  if(err){
                    res.render('error',{message : err});
                  }
                  else{
                    var figures = rows;
                    if(nombreFigure > figures.length){
                      nombreFigure = figures.length;
                    }
                    const data = figures.map(figures => figures.nom + "|" + figures.description + "|" + figures.point);
                    res.render('resultat', {sport : nom_sport ,figures : data , message : '', afficher : afficher , session : info_eleveProfConnecte[3] , nombreFigure : nombreFigure});
                  }
                });
              }
              else if(nom_sport == 'Escalade'){
                voie_dao.findAll(function(err,rows) {
                  if(err){
                    res.render('error',{message : err});
                  }
                  else{
                    var voies = rows;
                    const data = voies.map(voies => voies.nom_voie + '|' + voies.deg_diffi);
                    res.render('resultat', {sport : nom_sport ,voies : data , message : '', session : info_eleveProfConnecte[3]});
                  }
                });
              }
              else{
                res.render('resultat', {sport : nom_sport ,message : '', afficher : '', session : info_eleveProfConnecte[3]});
              }
            }
          }); 
        }
      }
    }
  });  
});

router.post('/', function(req, res, next) {

  //gestion des resultats sportifs en fonction du sport
  var error='';
  if (req.body.action ==  'Nouveau résultat'){
    res.redirect('/resultat?idSport=' + id_sport + '&ses=' + info_eleveProfConnecte[3] + '&nom=' + info_eleveProfConnecte[0] + '&prenom=' + info_eleveProfConnecte[1] + '&classe=' + info_eleveProfConnecte[2]);
  }
  else if(nom_sport == 'Acrosport'){

    if(req.body.action == 'Envoyer'){
      var figures = []
      var id_figures = [];
      

      // Récupérer le nombre de figures
      var nbfig = parseInt(req.body.nbfig);

      var promises = [];

      // Récupérer les figures sélectionnées
      for (var i = 0; i < nbfig; i++) {
        var selectedFigure = req.body['figure' + i];
        figures.push(selectedFigure);
      }

      var total_point = 0;

      for(var i = 0; i < figures.length; i++){
        
        var nom_figure = figures[i].split('|')[0];

        var promise = new Promise(function(resolve, reject){
          figure_dao.findByNom(nom_figure, function(err,rows) {
            if(err){
              error = err;
              reject(err);
            }
            else{
              var figure = rows;
              if(figure.length == 0){
                error = 'figure non existante : ' + nom_figure + '\n';
                reject(error);
              }
              else{
                total_point = total_point + figure[0].point;
  
                //checker si la figure a déjà été faite
                for (var j = 0; j < id_figures.length; j++) {
                  if(id_figures[j] == figure[0].id_figure){
                    error = 'Merci de ne pas sélectionner deux fois la même figure , ' + ' figure selectionée plusieurs fois  : ' + nom_figure + '\n';
                    reject(error);
                  }
                }
  
                id_figures.push(figure[0].id_figure);
                resolve();
              }
            }
          });
        });
        promises.push(promise);
      }
      Promise.all(promises).then(function(){
        if(error != ''){
          res.render('error',{message : error});
        }
        else{
          //insertion dans la base de donnée

          var result = new resultat();
          result.init(null,null,null,null,info_eleveProfConnecte[3],info_eleveProfConnecte[4]);

          resultat_dao.insert(result, function(err,rows) {
            if(err){
              res.render('error',{message : err});
            }
            else{
              var id_resultat = rows.insertId;

              var act = new acrosport();
              act.init(id_resultat,total_point);

              // creer insertion dans la table acrosport 
              acrosport_dao.insert(act, function(err,rows) {
                if(err){
                  res.render('error',{message : err});
                }
                else{
                 
                  var errror = false;

                  // creer insertion dans la table Figure_Acrosport
                  for(var i = 0; i < id_figures.length; i++){

                    acrosport_dao.insertFigure_acrosport(id_resultat,id_figures[i], function(err,rows) {
                      if(err){
                        errror = true;
                        error = err;
                      }
                    });
                  }
                  if(errror == false){
                    //envoyer les données au professeur en direct(websocket)
                    envoieDonneesProf({
                      nom_sport : nom_sport,
                      nom : info_eleveProfConnecte[0],
                      prenom : info_eleveProfConnecte[1],
                      classe : info_eleveProfConnecte[2],
                      session : info_eleveProfConnecte[3],
                      total_point : total_point,
                      figures : figures,

                    });

                    message= 'Données envoyées';
                    res.render('resultat',{idSport: id_sport ,sport : nom_sport ,message : message});
                  }
                  else{
                    res.render('error',{message : error});
                  }
                } 
              });
            }
          });
        }
      }).catch(function(error){
        res.render('error',{message : error});
      });
    }
    else if(req.body.action == 'Remplir'){
      var nombreFigure = req.body.nombreFigure;
      console.log(nombreFigure);
      res.redirect('/resultat?ses='+info_eleveProfConnecte[3]+'&nombreFigure='+nombreFigure + '&afficher=oui' + '&idSport='+id_sport);
      
    }
    else if(req.body.action == 'Retour'){
      res.redirect('/resultat?ses='+info_eleveProfConnecte[3]+'&idSport='+id_sport+'&nom_sport='+nom_sport);
    }
  }
  else if( nom_sport == 'Escalade'){

    var la_voie = req.body.voie;
    //spliter la_voie à partir du | et récupèrer le premier élément
    var nom_voie = la_voie.split('|')[0];
    var deg_diffi = la_voie.split('|')[1];
    var assureur = req.body.assureur;
    var temps = "00:"+req.body.minutes+":"+req.body.seconds;
    var complementaire = req.body.complementaire;

    voie_dao.findByNom(nom_voie, function(err,rows) {
      if(err){
        res.render('error',{message : err});
      }
      else{
        var voie = rows;
        if(voie.length == 0){
          res.render('error',{message : 'voie non existante'});
        }
        else{

          //insertion dans la base de donnée

          id_voie = voie[0].id_voie;

          var result = new resultat();
          result.init(temps,null,null,complementaire,info_eleveProfConnecte[3],info_eleveProfConnecte[4]);

          resultat_dao.insert(result, function(err,rows) {
            if(err){
              res.render('error',{message : err});
            }
            else{
              var id_resultat = rows.insertId;

              var esc = new Escalade();
              esc.init(assureur,deg_diffi);
              esc.setId(id_resultat);

              // creer insertion dans la table escalade 
              escalade_dao.insert(esc, function(err,rows) {
                if(err){
                  res.render('error',{message : err});
                }
                else{
                 
                  var errror = false;

                  escalade_dao.insertEscalade_voie(id_resultat,id_voie, function(err,rows) {
                    if(err){
                      errror = true;
                      error = err;
                    }
                  });

                  if(errror == false){
                    //envoyer les données au professeur en direct(websocket)
                    envoieDonneesProf({
                      sport : nom_sport,                
                      nom : info_eleveProfConnecte[0],
                      prenom : info_eleveProfConnecte[1],
                      classe : info_eleveProfConnecte[2],
                      session : info_eleveProfConnecte[3],
                      la_voie :nom_voie,
                      deg_diffi : deg_diffi,
                      assureur : assureur,
                      temps: temps,
                      complementaire : complementaire,

                    });

                    message= 'Données envoyées';
                    res.render('resultat',{idSport: id_sport ,sport : nom_sport ,message : message});
                  }
                  else{
                    res.render('error',{message : error});
                  }
                }
              });
            }
          });
        }
      }
    });
  }
  else if(nom_sport == 'Natation'){

    var nom_bassin = req.body.nomBassin;
    var style_nage = req.body.styleNage;
    var distance = req.body.distance;
    var temps = "00:"+req.body.minutes+":"+req.body.seconds;
    var nbPlongeons = req.body.plongeons;
    var complementaire = req.body.complementaire;



    //insertion dans la base de donnée

    var result = new resultat();
    result.init(temps,distance,null,complementaire,info_eleveProfConnecte[3],info_eleveProfConnecte[4]);

    resultat_dao.insert(result, function(err,rows) {
      if(err){
        res.render('error',{message : err});
      }
      else{
        var id_resultat = rows.insertId;

        var nat = new Natation();
        nat.init(style_nage, nbPlongeons, nom_bassin);
        nat.setId(id_resultat);

        // creer insertion dans la table escalade 
        natation_dao.insert(nat, function(err,rows) {
          if(err){
            res.render('error',{message : err});
          }
          else{
            //envoyer les données au professeur en direct(websocket)
            envoieDonneesProf({
              sport : nom_sport,                
              nom : info_eleveProfConnecte[0],
              prenom : info_eleveProfConnecte[1],
              classe : info_eleveProfConnecte[2],
              session : info_eleveProfConnecte[3],
              nom_bassin : nom_bassin,
              style_nage : style_nage,
              distance : distance,
              temps: temps,
              nbPlongeons : nbPlongeons,
              complementaire : complementaire,
            })

            message= 'Données envoyées';
            res.render('resultat',{idSport: id_sport ,sport : nom_sport ,message : message});
          }
        });
      }
    });
  }
  else if(nom_sport == 'Musculation'){

    var nom_exercice = req.body.nomExercice;
    var nom_muscle = req.body.nomMuscle + " : " + nom_exercice;
    var nb_series = req.body.nbSeries;
    var nb_repetitions = req.body.nbRepetitions;
    var intensite = req.body.intensite;
    var poids = req.body.poids;
    var temps = "00:"+req.body.minutes+":"+req.body.seconds;
    var ressenti = req.body.ressenti;

    //insertion dans la base de donnée


    var result = new resultat();
    result.init(temps,null,null,null,info_eleveProfConnecte[3],info_eleveProfConnecte[4]);

    resultat_dao.insert(result, function(err,rows) {
      if(err){
        res.render('error',{message : err});
      }
      else{
        var id_resultat = rows.insertId;

        var muscu = new Musculation();
        muscu.init(nom_muscle, nb_series, nb_repetitions, intensite, poids, ressenti);
        muscu.setId(id_resultat);

        // creer insertion dans la table escalade 
        musculation_dao.insert(muscu, function(err,rows) {
          if(err){
            res.render('error',{message : err});
          }
          else{
            //envoyer les données au professeur en direct(websocket)
            envoieDonneesProf({
              sport : nom_sport,                
              nom : info_eleveProfConnecte[0],
              prenom : info_eleveProfConnecte[1],
              classe : info_eleveProfConnecte[2],
              session : info_eleveProfConnecte[3],
              nom_muscle : nom_muscle,
              nb_series : nb_series,
              nb_repetitions : nb_repetitions,
              intensite : intensite,
              poids : poids,
              temps_pause: temps,
              ressenti : ressenti,
            })

            message= 'Données envoyées';
            res.render('resultat',{idSport: id_sport ,sport : nom_sport ,message : message});
          }
        });
      }
    });
  }
  else if(nom_sport == 'Step'){
    
      var type_mobilite = req.body.typeMobilite;
      var temps = "00:"+req.body.minutes+":"+req.body.seconds;
      var freq_cardiaque = req.body.freqCard;
      var paramIndv = req.body.paramIndv;
      var ressenti = req.body.ressenti;
      var bilanPerso = req.body.bilanPerso;
      var perspective = req.body.perspective;

       //insertion dans la base de donnée

       var result = new resultat();
       result.init(temps,null,freq_cardiaque,null,info_eleveProfConnecte[3],info_eleveProfConnecte[4]);
   
       resultat_dao.insert(result, function(err,rows) {
         if(err){
           res.render('error',{message : err});
         }
         else{
           var id_resultat = rows.insertId;
   
           var step = new Step();
           step.init(type_mobilite, ressenti, paramIndv, bilanPerso, perspective);
           step.setId(id_resultat);
   
           // creer insertion dans la table escalade 
           step_dao.insert(step, function(err,rows) {
             if(err){
               res.render('error',{message : err});
             }
             else{
               //envoyer les données au professeur en direct(websocket)
               envoieDonneesProf({
                 sport : nom_sport,                
                 nom : info_eleveProfConnecte[0],
                 prenom : info_eleveProfConnecte[1],
                 classe : info_eleveProfConnecte[2],
                 session : info_eleveProfConnecte[3],
                 type_mobilite : type_mobilite,
                 temps : temps,
                 freq_cardiaque : freq_cardiaque,
                 paramIndv : paramIndv,
                 ressenti : ressenti,
                 bilanPerso : bilanPerso,
                 perspective : perspective,

               })
   
               message= 'Données envoyées';
               res.render('resultat',{idSport: id_sport ,sport : nom_sport ,message : message});
             }
           });
         }
       });
  }
  else{
    res.render('error',{message : 'Sport non reconnu , merci de vous deconnecter et de vous reconnecter'});

  }

});

function envoieDonneesProf(donnees) {
  var WebSocket = require('ws');
  var wss;
  // Connexion au websocket du professeur
  wss = new WebSocket('ws://localhost:3002');
  wss.on('open', function open() {
    wss.send(JSON.stringify({type: 'resultat_eleve',session : info_eleveProfConnecte[3],data: donnees}));
  });
}
module.exports = router;