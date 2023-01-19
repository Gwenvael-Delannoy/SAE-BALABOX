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

var resultat = new resultat();
var session = new session();
var eleve = new eleve();
var equipe = new equipe();
var sport = new sport();

sport.init("basketball","sport de basket");

// insertion sport
sport_dao.insert(sport, function(err, rows){
    if(err) console.log(err);

    sport_dao.findAll((err, rows) => {
        if(err) console.log(err);

        var idSport = rows[rows.length-1].id_sport;
        sport.setId(idSport);
        session.init("2023-01-16","en cours","16:32:00","tw24N","mdp","Tristan BOURBIGOT","tournois",sport.getId());

        // insertion session
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

                        eleve.init("BOURBIGOT","Tristan","homme","6a",1,equipe.getId());

                        // insertion eleve
                        eleve_dao.insert(eleve, function(err, rows){
                            if(err) console.log(err);

                            eleve_dao.findAll((err, rows) => {
                                if(err) console.log(err);

                                var idEleve = rows[rows.length-1].id_eleve;
                                eleve.setId(idEleve);


                                // insertion resultat
                                resultat.init("16:32:00",20,93,"ceci est un test",session.getId(),eleve.getId());

                                resultat_dao.findAll((err, rows) => {
                                    if(err) console.log(err);
                                    
                                    var res1 = rows.length;
                                    resultat_dao.insert(resultat, function(err, rows){
                                        if(err) console.log(err);

                                        resultat_dao.findAll((err, rows) => {
                                            if(err) console.log(err);

                                            var res2 = rows.length;
                                            console.log("\n nb avant insertion : " + res1 + "\n nb après insertion : " + res2 + "\n")
                                            if(res1 < res2) console.log("insertion réusite");
                                            else console.log("insetion échoué");
                                            resultat.setId(rows[rows.length-1].id_resultat);
                                            console.log("\nPreUpdate\n");
                                            console.log(rows[rows.length-1]);

                                            resultat.setTemps("17:25:00");
                                            resultat.setDistance(25);
                                            resultat.setFreqCard(100);

                                            resultat_dao.update(resultat.getId(),resultat, function(err, rows){
                                                if(err) console.log(err);

                                                resultat_dao.findByKey(resultat.getId(), (err, rows) => {
                                                    if(err) console.log(err);

                                                    console.log("\nPostUpdate\n");
                                                    console.log(rows[0]);

                                                    resultat_dao.delete(resultat.getId(), function(err, rows){
                                                        if(err) console.log(err);

                                                        resultat_dao.findAll((err, rows) => {
                                                            if(err) console.log(err);

                                                            var res3 = rows.length;
                                                            if(res1 == res3) console.log("suppression réussite");
                                                            else console.log("suppression échoué");
                                                        });

                                                        eleve_dao.delete(eleve.getId(), function(err, rows){
                                                            if(err) console.log(err);
                                                        });

                                                        equipe_dao.delete(equipe.getId(), function(err, rows){
                                                            if(err) console.log(err);
                                                        });

                                                        session_dao.delete(session.getId(), function(err, rows){
                                                            if(err) console.log(err);
                                                        });

                                                        sport_dao.delete(sport.getId(), function(err, rows){
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
