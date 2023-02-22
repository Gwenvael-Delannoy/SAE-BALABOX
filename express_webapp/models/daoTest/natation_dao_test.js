var natation_dao = require('../dao/dataBase').natation_dao;
var natation = require('../natation');
var resultat_dao = require('../dao/dataBase').resultat_dao;
var resultat = require('../resultat');
var session_dao = require('../dao/dataBase').session_dao;
var session = require('../session');
var eleve_dao = require('../dao/dataBase').eleve_dao;
var eleve = require('../eleve');
var equipe_dao = require('../dao/dataBase').equipe_dao;
var equipe = require('../equipe');
var sport_dao = require('../dao/dataBase').sport_dao;
var sport = require('../sport');

var natation = new natation();
var resultat = new resultat();
var session = new session();
var eleve1 = new eleve();
var equipe = new equipe();
var sport = new sport();

// insertion sport

sport.init("basketball","sport de basket");

sport_dao.insert(sport, function(err, rows){
    if(err) console.log(err);

    sport_dao.findAll((err, rows) => {
        if(err) console.log(err);

        var idSport = rows[rows.length-1].id_sport;
        sport.setId(idSport);

        // insertion session
        session.init("2023-01-16","en cours","16:32:00","tw24N","mdp","Tristan BOURBIGOT","tournoi equipe",sport.getId());
        session_dao.insert(session, function(err, rows){
            if(err) console.log(err);
        
            session_dao.findAll((err, rows) => {
                if(err) console.log(err);
        
                var idSession = rows[rows.length-1].id_session;
                session.setId(idSession);

                // insertion equipe
                equipe.init(5,10);

                equipe_dao.insert(equipe, function(err, rows){
                    if(err) console.log(err);

                    equipe_dao.findAll((err, rows) => {
                        if(err) console.log(err);

                        var idEquipe = rows[rows.length-1].id_equipe;
                        equipe.setId(idEquipe);

                        // insertion eleve
                        eleve1.init("BOURBIGOT","Tristan","homme","6a",1,equipe.getId());
                        eleve_dao.insert(eleve1, function(err, rows){
                            if(err) console.log(err);

                            eleve_dao.findAll((err, rows) => {
                                if(err) console.log(err);

                                var idEleve = rows[rows.length-1].id_eleve;
                                eleve1.setId(idEleve);

                                // insertion resultat
                                resultat.init("16:32:00",20,93,"ceci est un test",session.getId(),eleve1.getId());
                                resultat_dao.insert(resultat, function(err, rows){
                                    if(err) console.log(err);

                                    resultat_dao.findAll((err, rows) => {
                                        if(err) console.log(err);

                                        var idResultat = rows[rows.length-1].id_resultat;
                                        resultat.setId(idResultat);

                                        // insertion natation
                                        natation.init("papillon",5,"bassin olympique");
                                        natation.setId(idResultat);
                                        natation_dao.findAll((err, rows) => {
                                            if(err) console.log(err);

                                            var res1 = rows.length;

                                            natation_dao.insert(natation, function(err, rows){
                                                if(err) console.log(err);

                                                natation_dao.findAll((err, rows) => {
                                                    if(err) console.log(err);

                                                    var res2 = rows.length;

                                                    if(res1 == res2){
                                                        console.log("test insert natation : OK");
                                                    }
                                                    else{
                                                        console.log("test insert natation : KO");
                                                    }

                                                    // update natation
                                                    console.log("pre update : ");
                                                    console.log(rows[rows.length-1]);
                                                    natation.setStyleNage("croll");
                                                    natation_dao.update(idResultat,natation, function(err, rows){
                                                        if(err) console.log(err);

                                                        natation_dao.findAll((err, rows) => {
                                                            if(err) console.log(err);

                                                            console.log("post update : ");
                                                            console.log(rows[rows.length-1]);

                                                            if(rows[rows.length-1].style_nage == "croll"){
                                                                console.log("update réussie");
                                                            }
                                                            else{
                                                                console.log("update échouée");
                                                            }
                                                        
                                                            // delete natation
                                                            natation_dao.delete(idResultat, function(err, rows){
                                                                if(err) console.log(err);

                                                                natation_dao.findAll((err, rows) => {
                                                                    if(err) console.log(err);

                                                                    var res3 = rows.length;

                                                                    if(res1 == res3){
                                                                        console.log("suppression réussie");
                                                                    }
                                                                    else{
                                                                        console.log("suppression échouée");
                                                                    }
                                                                    
                                                                    // suppression des données de test
                                                                    resultat_dao.delete(resultat.getId(), function(err){
                                                                        if(err) console.log(err);
                                                                    });
                                                                    eleve_dao.delete(eleve1.getId(), function(err, rows){
                                                                        if(err) console.log(err);
                                                                    });
                                                                    equipe_dao.delete(equipe.getId(), function(err, rows){
                                                                        if(err) console.log(err);
                                                                    });
                                                                    session_dao.delete(session.getId(), function(err, rows){
                                                                        if(err) console.log(err);
                                                                    });
                                                                    sport_dao.delete(sport.getId(),function(err){
                                                                        if(err) console.log(err);
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});