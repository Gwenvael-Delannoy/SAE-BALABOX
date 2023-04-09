var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
var Eleve = require('../models/eleve');
var matchSession = [];
let classement;
var nomCo = '';
var prenomCo = '';
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

    eleve_dao.findByKey(idEleCo, function(err,rows) {
        if (err ) {
            messageError ='Id eleve null,merci de revenir en arriere et ressayer';
            res.render('error',{message : messageError});
        }
        else{
            
            nomCo = rows[0].nom;
            prenomCo = rows[0].prenom;

            if (typeof nomCo !== 'string') {
                 nomCo = String(nomCo);
            }
        
            if (typeof prenomCo !== 'string') {
                 prenomCo = String(prenomCo);
            }
            console.log('nomCo : '+nomCo);
            console.log('prenomCo : '+prenomCo);

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
                                                                session: idSession,
                                                                classement:JSON.stringify(classement),
                                                            }));
                                                            res.render('classement_eleve', { idSession : idSession,classement:classement, nomCo : nomCo, prenomCo : prenomCo});
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
                                                                session: idSession,
                                                                classement:JSON.stringify(classement),
                                                            }));
                                                            res.render('classement_eleve', { idSession : idSession,classementBis:classementBis, nomCo : nomCo, prenomCo : prenomCo});
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
                    }else {
                        message = "Aucun match dans cette session";
                        res.render('classement_eleve', { idSession : idSession, nomCo : nomCo, prenomCo : prenomCo, message : message});
                    }
                }
            });
        }
    });
});


router.post('/', function(req, res, next) {
    idSession = req.body.idSession;
    NomAdversaire = req.body.NomAdversaire;

    session_dao.findByKey(idSession, function(err,rows) {
        if (err ) {
            messageError ='Session inexistante, merci de revenir en arriere et ressayer';
            res.render('error',{message : messageError});
        }
        else{
            if(rows.length != 0){
                if(NomAdversaire == ''){
                    res.render('error',{message : "Veuillez choisir un adversaire"});
                }else{
                    res.render('eleve_contre_eleve', { idSession : idSession, NomAdversaire : NomAdversaire, idEleCo : idEleCo, idSport : rows[0].le_sport});
                    console.log("idSession :" +idSession+ "\nNomAdversaire :" +NomAdversaire);
                }
            }
        }
    });
});


module.exports = router;