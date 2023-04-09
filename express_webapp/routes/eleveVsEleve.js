var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var Eleve = require('../models/eleve');
var match = require('../models/match');

/* Recuperer la page de match entre deux eleves. */
router.get('/', function(req, res, next) {
    var idSession = req.query.idSession;
    var NomAdversaire = req.query.NomAdversaire;
    var idEleCo = req.query.idEleCo;
    var idSport = req.query.idSport;
    res.render('eleve_contre_eleve', {idSession : idSession, NomAdversaire : NomAdversaire, idEleCo : idEleCo, idSport : idSport});
});

router.post('/', function(req, res, next) {
    score1 = req.body.score1;
    score2 = req.body.score2;
    idSession = req.body.idSession;
    NomAdversaire = req.body.NomAdversaire;
    idEleCo = req.body.idEleCo;
    console.log("Score 1 : " + score1);
    console.log("Score 2 : " + score2);
    console.log("idSession : " + idSession);
    console.log("NomAdversaire : " + NomAdversaire);
    console.log("idEleCo : " + idEleCo);

    NomAdversaire = NomAdversaire.split(" ")[0];

    eleve_dao.findByName(NomAdversaire, function(err,rows) {
        if (err ) {
            messageError ='Connexion à la base de donnée impossible';
            res.render('error',{message : messageError});
        }
        else{
            idAdversaire = rows[0].id_eleve;
            console.log("idAdversaire : " + idAdversaire);
            let leMatch = new match();
            leMatch.init(score1, score2, idSession);
            match_dao.insert(leMatch, function(err,rows) {
                if (err ) {
                    messageError ='Connexion à la base de donnée impossible';
                    res.render('error',{message : messageError});
                }
                else{
                    console.log("Match ajouté");
                    
                    match_dao.findAllMatchSes(idSession, function(err,rows) {
                        if (err ) {
                            messageError ='Connexion à la base de donnée impossible';
                            res.render('error',{message : messageError});
                        }
                        else{
                            leMatch.setId(rows[rows.length-1].id_match);
                            console.log("leMatch : " + leMatch);
                            
                            if(score1>score2){
                                match_dao.insertMatch_Eleve(leMatch.getId(), idEleCo, 1, function(err,rows) {
                                    if (err ) {
                                        messageError ='Connexion à la base de donnée impossible';
                                        res.render('error',{message : messageError});
                                    }
                                });
                                match_dao.insertMatch_Eleve(leMatch.getId(), idAdversaire, 0, function(err,rows) {
                                    if (err ) {
                                        messageError ='Connexion à la base de donnée impossible';
                                        res.render('error',{message : messageError});
                                    }
                                });
                            }
                            else{
                                match_dao.insertMatch_Eleve(leMatch.getId(), idEleCo, 0, function(err,rows) {
                                    if (err ) {
                                        messageError ='Connexion à la base de donnée impossible';
                                        res.render('error',{message : messageError});
                                    }
                                });
                                match_dao.insertMatch_Eleve(leMatch.getId(), idAdversaire, 1, function(err,rows) {
                                    if (err ) {
                                        messageError ='Connexion à la base de donnée impossible';
                                        res.render('error',{message : messageError});
                                    }
                                });
                            }
                            
                        }
                    });
                }
            });
        }
    });
    
    
    res.redirect('/classement_eleve?ses=' + idSession + '&id_el=' + idEleCo);
});

module.exports = router;