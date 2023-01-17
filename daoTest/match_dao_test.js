var match_dao = require('../dao/match_dao.js');
var match = require('../models/match.js');
var session_dao = require('../dao/session_dao.js');
var session = require('../models/session.js');
var equipe_dao = require('../dao/equipe_dao.js');
var equipe = require('../models/equipe.js');
var eleve_dao = require('../dao/eleve_dao.js');
var eleve = require('../models/eleve.js');
var sport_dao = require('../dao/sport_dao.js');
var sport = require('../models/sport.js');

var match = new match();
var session = new session();
var equipe = new equipe();
var eleve = new eleve();
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
        session_dao.insert(session, function(err, rows){
            if(err) console.log(err);
        
            session_dao.findAll((err, rows) => {
                if(err) console.log(err);
        
                var idSession = rows[rows.length-1].id_session;
                session.setId(idSession);

                equipe.init(5,10);

                equipe_dao.insert(equipe, function(err, rows){
                    if(err) console.log(err);

                    equipe_dao.findAll((err, rows) => {
                        if(err) console.log(err);

                        var idEquipe = rows[rows.length-1].id_equipe;
                        equipe.setId(idEquipe);

                        eleve.init("BOURBIGOT","Tristan","homme","6a",1,equipe.getId());

                        eleve_dao.insert(eleve, function(err, rows){
                            if(err) console.log(err);

                            eleve_dao.findAll((err, rows) => {
                                if(err) console.log(err);

                                var idEleve = rows[rows.length-1].id_eleve;
                                eleve.setId(idEleve);


                                //test Match

                                match.init(1,2,session.getId());

                                match_dao.findAll((err, rows) => {
                                    if(err) console.log(err);

                                    var res1 = rows.length;
                                    console.log("\nnombre de ligne déjà insérer: "+res1+"\n");

                                    match_dao.insert(match, function(err, rows){
                                        if(err) console.log(err);

                                        match_dao.findAll((err, rows) => {
                                            if(err) console.log(err);

                                            var res2 = rows.length;
                                            console.log("\nnombre de ligne après insertion: "+res2+"\n");

                                            if(res1+1 == res2)console.log("Insertion réussie");
                                            else console.log("Insertion échoué");
                                            
                                            match.setId(rows[rows.length-1].id_match);
                                            
                                            console.log("\nPre Update :\n");
                                            console.log(rows[rows.length-1]);

                                            match.setResultat1(3);
                                            match.setResultat2(4);

                                            match_dao.update(match,function(err, rows){
                                                if(err) console.log(err);

                                                match_dao.findAll((err, rows) => {
                                                    if(err) console.log(err);

                                                    console.log("\nPost Update :\n");
                                                    console.log(rows[rows.length-1]);

                                                    match_dao.delete(match.getId(),function(err, rows){
                                                        if(err) console.log(err);

                                                        match_dao.findAll((err, rows) => {
                                                            if(err) console.log(err);

                                                            var res3 = rows.length;
                                                            console.log("\nnombre de ligne après suppression: "+res3+"\n");

                                                            if(res2-1 == res3)console.log("Suppression réussie");
                                                            else console.log("Suppression échoué");
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