var express = require('express');
var router = express.Router();
var WebSocket = require('ws');
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var Eleve = require('../models/eleve');
var matchSession = [];
var classement = [[]];
var idEleCo = -1;
var nomCo = '';
var prenomCo = '';
var wss ;


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



/* Recupere la page de classement des eleves et qui renvoie un tableau de string avec les prenoms des eleves */
router.get('/', function(req, res,next) {
    idSession = req.query.ses;
    idEleCo = req.query.id_el;
    console.log("idEleCo :" +idEleCo);

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
            



            match_dao.findAllMatchSes(idSession, function(err,rows) {
                    if (err ) {
                        messageError ='Session inexistante,merci de revenir en arriere et ressayer';
                        res.render('error',{message : messageError});
                    }
                    else{
                        matchSession = rows;


                        if(matchSession.length != 0){
                            

                            for(var k = 0; k < matchSession.length; k++){
                              
                                console.log("matchSession[i].id_match :" +matchSession[k].id_match);
                                var id_match = matchSession[k].id_match;
                                id_match = parseInt(id_match);
                                match_dao.findMatch_ElevesByMatch(id_match, function(err,rows) {
                                    
                                    if (err ) {
                                        messageError ='Connexion à la base de donnée impossible';
                                        res.render('error',{message : messageError});
                                    }
                                    else{ 

                                        for(var i = 0; i < rows.length; i++){
                                            var match = rows[i];

                                            var id_l_eleve = rows[i].leleve;    
                                            var eleves_res = [];
                                            var trouver = 'false';
                                            var indexTrouver = -1;
                                            var j = 0;

                                            
                                            //si il n'est pas dans le tableau
                                            eleves_res[0] = id_l_eleve;

                                            eleve_dao.findByKey(id_l_eleve, function(err,rows) {
                                                if (err ) {
                                                    messageError ='Connexion à la base de donnée impossible';
                                                    res.render('error',{message : messageError});
                                                }
                                                else{


                                                    if(classement.length != 0){
                                                        //checker si il est deja dans le tableau
                                                        while(j < classement.length && trouver == 'false'){
                                                            console.log("dans while");
                                                            if(classement[j][0] == id_l_eleve){
                                                                trouver = 'true';
                                                                indexTrouver = j;
                                                            }
                                                            j++;
                                                        }
                                                    } if (trouver == 'false'){
                                                        
                                                    
                                                        eleves_res[1] = rows[0].nom; // nom de l'eleve
                                                        if (typeof eleves_res[1] !== 'string') {
                                                            eleves_res[1] = String(eleves_res[1]);
                                                        }

                                                        console.log("nom eleve :" +eleves_res[1]);

                                                        
                                                        eleves_res[2] = rows[0].prenom; // prenom de l'eleve
                                                        if (typeof eleves_res[2] !== 'string') {
                                                            eleves_res[2] = String(eleves_res[2]);
                                                        }
                                                        console.log("prenom eleve :" +eleves_res[2]);
                                                        
                                                        eleves_res[3] = match.gagnant; // nombre de point de l'eleve
                                                        eleves_res[3] = String(eleves_res[3]);
                                                        console.log("el [2] :"+eleves_res[2]);

                                                        eleves_res[4] = 1;  // nombre de match de l'eleve
                                                        eleves_res[4] = String(eleves_res[4]);
                                                        console.log("el :"+eleves_res);
                                                        classement.push([eleves_res[0], eleves_res[1], eleves_res[2], eleves_res[3], eleves_res[4]]);
                                                        console.log("classement !!!!!!!!!:" +  classement);
                                                    } else {

                                                        classement[indexTrouver][3] = parseInt(classement[indexTrouver][3]) + match.gagnant; // nombre de point de l'eleve
                                                        classement[indexTrouver][3] = String(classement[indexTrouver][3]);
                                                        classement[indexTrouver][4] = parseInt(classement[indexTrouver][4]) + 1; // nombre de match de l'eleve
                                                        classement[indexTrouver][4] = String(classement[indexTrouver][4]);
                                                        console.log("classement gagnant :" +classement[classement.length-1]);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            // Envoi d'un message vers le serveur WebSocket de l'élève
                            wss.send(JSON.stringify({
                                type: 'classement',
                                session: idSession,
                                classement: classement
                                }));
                        } else {
                            console.log("Aucun match dans cette session");
                        }
                    }
                }); 
 
        }
    });
    console.log("classement gagnant §§§§§§§§§§§§§§ :" +classement[classement.length-2]);
    res.render('classement_eleve', { idSession : idSession, classement : classement, nomCo : nomCo, prenomCo : prenomCo});
});




router.post('/', function(req, res, next) {
    idSession = req.body.idSession;
    NomAdversaire = req.body.NomAdversaire;

    if(NomAdversaire == ''){
        res.render('error',{message : "Veuillez choisir un adversaire"});
    }else{
        res.render('eleve_contre_eleve', { idSession : idSession, NomAdversaire : NomAdversaire, idEleCo : idEleCo});
        console.log("idSession :" +idSession+ "\nNomAdversaire :" +NomAdversaire);
    }
    
});


module.exports = router;