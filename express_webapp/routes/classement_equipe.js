var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var equipe_dao = require('../models/dao/dataBase').equipe_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var Equipe = require('../models/Equipe');
var matchSession = [];
let classement;
var idCo = [];
var wss ;


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

/* Recupere la page de classement des eleves et qui renvoie un tableau de string avec les prenoms des eleves */
router.get('/', function(req, res,next) {
    classement = {};
    idSession = req.query.ses;
    idEleCo = req.query.id_el;

    equipe_dao.findByKeyEleve(idEleCo, function(err,rows) {
        if (err || rows.length == 0 ) {
            messageError ='Eleve dans aucune equipe,merci de revenir en arriere et ressayer';
            res.render('error',{message : messageError});
        }
        else{
            for (var b = 0; b < rows.length; b++) {
            
              idCo[b] = rows[b].id_equipe;

              if (typeof idCo[b] !== 'string') {
                idCo[b] = String(idCo[b]);
              }
            }

            match_dao.findAllMatchSes(idSession, function(err,rows) {
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
                        
                        
                        for(k = 0; k < matchSession.length; k++){

                            
                            var id_match = matchSession[k].id_match;
                            match_dao.findMatch_EquipesByMatch(id_match, function(err,rows) {
                                
                                if (err ) {
                                    messageError ='Connexion à la base de donnée impossible ';
                                    res.render('error',{message : messageError});
                                }
                                else{
                                    let points = {};

                                    console.log('rows : '+rows[0]);
        
                                    points[0] = rows[0].gagnant;
                                    points[1] = rows[1].gagnant;
                            
                                    var compteur = 0;//compteur pour savoir si on a parcouru nos deux eleves de ce match

                                    for(var i = 0; i < rows.length; i++){
    
                                        var id_eleveMatch= rows[i].lequipe;

                                        equipe_dao.findByKey(id_eleveMatch, function(err,rows) {
                                            if (err ) {
                                                messageError ='Connexion à la base de donnée impossible';
                                                res.render('error',{message : messageError});
                                            }
                                            else{
                                                if(rows.length != 0){              
                                                    if(classement[rows[0].id_equipe]!= undefined && classement[rows[0].id_equipe] != null && classement[rows[0].id_equipe] != ''){
                                                        eleve_info = classement[rows[0].id_equipe];
                                                        eleve_info[1]= rows[0].id_equipe;
                                                        eleve_info[3] += points[compteur];  
                                                        eleve_info[4] += 1;
                                                        classement[rows[0].id_equipe] = eleve_info;


                                                        //divier par 2 car on a 2 eleve par match donc on compte 2 fois un match , et une fois arrivé au bout du compte de match total on envoie la donnée au websocket
                                                        if((nbMatchFait/2) == nbMatchTotal){
                                                    
                                                            wss.send(JSON.stringify({
                                                                type: 'classement',
                                                                session: idSession,
                                                                classement:JSON.stringify(classement),
                                                            }));
                                                            res.render('classement_equipe', { idSession : idSession,classement:classement, idCo : idCo,message : ""});
                                                        }
                                                        
                                                    } else {
                                                        eleve_info = [];
                                                        eleve_info[0] = rows[0].id_equipe;
                                                        eleve_info[3] = points[compteur];  
                                                        eleve_info[4] = 1;
                                                        classement[rows[0].id_equipe] = eleve_info;
                                                        classementBis = classement;

                                                        if((nbMatchFait/2) == nbMatchTotal){
                                                            console.log('classement : ' + JSON.stringify(classement));
                                                            wss.send(JSON.stringify({
                                                                type: 'classement',
                                                                session: idSession,
                                                                classement:JSON.stringify(classement),
                                                            }));
                                                            classement = {};
                                                            res.render('classement_equipe', { idSession : idSession,classement:classement, idCo : idCo,message : ""});
                                                        }
                                                        
                                                    }
                                                    compteur++;
                                                    nbMatchFait++;
                                                }
                                                else{
                                                    messageError ='Equpie non existant dans la base de données,merci de revenir en arriere et ressayer';
                                                    res.render('error',{message : messageError});
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }                   
                    }else {
                        message = "Aucun match dans cette session";
                        res.render('classement_equipe', { idSession : idSession,classement:classement, idCo : idCo, message : message});
                    }
                  }
            });
        }
    });
});


router.post('/', function(req, res, next) {
    idSession = req.body.idSession;
    NomAdversaire = req.body.NomAdversaire;

    if(NomAdversaire == ''){
        res.render('error',{message : "Veuillez choisir un adversaire"});
    }else{
        res.render('equipe_contre_equipe', { idSession : idSession, NomAdversaire : NomAdversaire, idEleCo : idEleCo});
        console.log("idSession :" +idSession+ "\nNomAdversaire :" +NomAdversaire);
    }
    
});


module.exports = router;