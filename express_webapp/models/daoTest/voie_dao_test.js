var voie = require('../voie');
var voie_dao = require('../dao/dataBase').voie_dao;
var escalade = require('../escalade');
var escalade_dao = require('../dao/dataBase').escalade_dao;
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

var voie = new voie();
var escalade = new escalade();
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
                                        voie.init("test",10);

                                        voie_dao.findAll((err, rows) => {
                                            if(err) console.log(err);

                                            var res1 = rows.length;

                                            voie_dao.insert(voie, function(err, rows){
                                                if(err) console.log(err);

                                                voie_dao.findAll((err, rows) => {
                                                    if(err) console.log(err);

                                                    var res2 = rows.length;

                                                    if(res1 != res2){
                                                        console.log("insertion reussie");
                                                    }
                                                    else{
                                                        console.log("insertion echouee");
                                                    }
                                                    
                                                    voie.setId(rows[rows.length-1].id_voie);

                                                    // update
                                                    console.log("pre update :\n");
                                                    console.log(rows[rows.length-1]);
                                                    voie.setNomVoie("test2");
                                                    voie_dao.update(voie.getId(),voie, function(err, rows){
                                                        if(err) console.log(err);

                                                        voie_dao.findByKey(voie.getId(), (err, rows) => {
                                                            if(err) console.log(err);

                                                            console.log("post update :\n");
                                                            console.log(rows[0]);

                                                            if(rows[0].nom_voie == "test2"){
                                                                console.log("update reussie");
                                                            }
                                                            else{
                                                                console.log("update echouee");
                                                            }
                                                            
                                                            // delete figure
                                                            voie_dao.delete(voie.getId(), function(err, rows){
                                                                if(err) console.log(err);

                                                                voie_dao.findAll((err, rows) => {
                                                                    if(err) console.log(err);

                                                                    var res3 = rows.length;

                                                                    if(res1 == res3){
                                                                        console.log("delete reussie");
                                                                    }
                                                                    else{
                                                                        console.log("delete echouee");
                                                                    }
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