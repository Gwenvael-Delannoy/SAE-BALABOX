var escalade_dao =require('../dao/dataBase').escalade_dao;
var escalade = require('../escalade');
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

var escalade = new escalade();
var resultat = new resultat();
var session = new session();
var eleve = new eleve();
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
        session.init("2023-01-16","en cours","16:32:00","tw24N","mdp","Tristan BOURBIGOT","tournois",sport.getId());
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
                        eleve.init("BOURBIGOT","Tristan","homme","6a",1,equipe.getId());
                        eleve_dao.insert(eleve, function(err, rows){
                            if(err) console.log(err);

                            eleve_dao.findAll((err, rows) => {
                                if(err) console.log(err);

                                var idEleve = rows[rows.length-1].id_eleve;
                                eleve.setId(idEleve);

                                // insertion resultat
                                resultat.init("16:32:00",20,93,"ceci est un test",session.getId(),eleve.getId());
                                resultat_dao.insert(resultat, function(err, rows){
                                    if(err) console.log(err);

                                    resultat_dao.findAll((err, rows) => {
                                        if(err) console.log(err);

                                        var idResultat = rows[rows.length-1].id_resultat;
                                        resultat.setId(idResultat);

                                        // insertion escalade
                                        escalade.init(idResultat,eleve.getId(),25);
                                        escalade_dao.findAll((err, rows) => {
                                            if(err) console.log(err);
                                        
                                            var res1 = rows.length;
                                            escalade_dao.insert(escalade, function(err, rows){
                                                if(err) console.log(err);
                                            
                                                escalade_dao.findAll((err, rows) => {
                                                    if(err) console.log(err);
                                                
                                                    var res2 = rows.length;
                                                    if(res1+1 == res2) console.log("insertion reussie");
                                                    else console.log("insertion echouee");

                                                    console.log("\nPreUpdate :\n");
                                                    console.log(rows[rows.length-1]);

                                                    // update escalade
                                                    var newEleve = new eleve();
                                                    newEleve.init("BOURBIGOT","Tristan","homme","6a",1,equipe.getId());
                                                    eleve_dao.insert(newEleve, function(err, rows){
                                                        if(err) console.log(err);

                                                        eleve_dao.findAll((err, rows) => {
                                                            if(err) console.log(err);

                                                            var idNewEleve = rows[rows.length-1].id_eleve;
                                                            newEleve.setId(idNewEleve);

                                                            escalade.setAssureur(newEleve.getId());
                                                            escalade_dao.update(escalade, function(err, rows){
                                                                if(err) console.log(err);

                                                                escalade_dao.findByKey(escalade.getId(), (err, rows) => {
                                                                    if(err) console.log(err);

                                                                    console.log("\nPostUpdate :\n");
                                                                    console.log(rows[0]);

                                                                    // delete escalade
                                                                    escalade_dao.delete(escalade.getId(), function(err, rows){
                                                                        if(err) console.log(err);

                                                                        escalade_dao.findAll((err, rows) => {
                                                                            if(err) console.log(err);
                                                                        
                                                                            var res3 = rows.length;
                                                                            if(res2-1 == res3) console.log("suppression reussie");
                                                                            else console.log("suppression echouee");
                                                                        });
                                                                    });
                                                                    resultat_dao.delete(resultat.getId(), function(err){
                                                                        if(err) console.log(err);
                                                                    });
                                                                    eleve_dao.delete(newEleve.getId(), function(err, rows){
                                                                        if(err) console.log(err);
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