var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var Eleve = require('../models/eleve');
var matchSession = [];
var classement = [];
var idEleCo = -1;
var nomCo = '';
var prenomCo = '';


/* Recupere la page de classement des eleves et qui renvoie un tableau de string avec les prenoms des eleves */
router.get('/', function(req, res,next) {
    idSession = req.query.ses;
    idEleCo = req.query.id_el;
    console.log("idEleCo :" +idEleCo);

    eleve_dao.findByKey(idEleCo, function(err,rows) {
        if (err ) {
            messageError ='Connexion à la base de donnée impossible';
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
            console.log("nomCo :" +nomCo);
            console.log("prenomCo :" +prenomCo);


            
        }
    }); 
    
    

    
    
    match_dao.findAllMatchSes(idSession, function(err,rows) {
        if (err ) {
            messageError ='Connexion à la base de donnée impossible';
            res.render('error',{message : messageError});
        }
        else{
            matchSession = rows;

            if(matchSession.length != 0){

                for(var i = 0; i < matchSession.length; i++){
                    match_dao.findMatch_ElevesByMatch(matchSession[i].id_match, function(err,rows) {
                        if (err ) {
                            messageError ='Connexion à la base de donnée impossible';
                            res.render('error',{message : messageError});
                        }
                        else{ 
                            
                            
                        
                            console.log("eleves :" +rows);

                            for(var i = 0; i < rows.length; i++){

                                var id_l_eleve = rows[i].leleve;
                                var eleves_res = [];
                                var trouver = 'false';
                                var indexTrouver = -1;
                                var j = 0;

                                if(classement.length != 0){
                                    //checker si il est deja dans le tableau
                                    while(j < classement.length && trouver == 'false'){
                                        console.log("ok");
                                        if(classement[j][0] == id_l_eleve){
                                            trouver = 'true';
                                            indexTrouver = j;
                                        }
                                        j++;
                                    }
                                }
                                console.log("ok");
                                if(trouver == 'false'){ //si il n'est pas dans le tableau
                                    eleves_res[0] = id_l_eleve;

                                    eleve_dao.findByKey(id_l_eleve, function(err,rows) {
                                        if (err ) {
                                            messageError ='Connexion à la base de donnée impossible';
                                            res.render('error',{message : messageError});
                                        }
                                        else{
                                            console.log('rows nom :' +rows.nom);
                                            var el = rows;
                                            eleves_res[1] = rows[0].nom; // nom de l'eleve
                                            console.log("eleve pres:" +rows[0].nom);
                                            eleves_res[2] = rows[0].prenom; // prenom de l'eleve
                                            console.log("eleve pres:" +rows[0].prenom);
                                        }
                                    });
                                    eleves_res[3] = rows[i].gagnant; // nombre de point de l'eleve
                                    eleves_res[4] = 1;  // nombre de match de l'eleve
                                    console.log(eleves_res);
                                    classement.push(eleves_res);
                                    console.log("classement :" +classement);
                                    console.log("ok1");
                                }
                                else{
                                    classement[indexTrouver][3] = classement[indexTrouver][3] + rows[i].gagnant; // nombre de point de l'eleve
                                    classement[indexTrouver][4] = classement[indexTrouver][4] + 1; // nombre de match de l'eleve
                                    console.log("classement :" +classement);
                                    console.log("ok2");
                                }
                            }
                            
                             
                        }
                    });
                }
            }

            res.render('classement_eleve', { idSession : idSession, classement : classement, nomCo : nomCo, prenomCo : prenomCo});
        }
    });


    /** 
    eleve_dao.findName4(idSession, function(err,rows) {
        if (err ) {
            messageError ='Connexion à la base de donnée impossible';
        }
        else{
            var classement = rows;
            console.log("tableau :" +classement);

            res.render('classement_eleve', { idSession : idSession, classement : classement});
        }
    });*/

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