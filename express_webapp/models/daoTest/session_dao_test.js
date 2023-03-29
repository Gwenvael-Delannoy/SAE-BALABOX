/**
 * test the session_dao.js
 */

var sessionDao = require('../dao/dataBase').session_dao;
var session = require('../session');
var sportDao = require('../dao/dataBase').sport_dao;
var sport = require('../sport');

sport = new sport();
sport.init("basketball","sport de basket","tournoi equipe");

sportDao.insert(sport, function(err, rows){
    if(err) console.log(err);

    sportDao.findAll((err, rows) => {
        if(err) console.log(err);

        var id = rows[rows.length-1].id_sport;
        sport.setId(id);

        session = new session();
        session.init("2023-01-16","en cours","16:32:00","tw24N","mdp","Tristan BOURBIGOT",id);

        sessionDao.findAll((err, rows) => {
            if(err) console.log(err);

            var res1=rows.length;
            console.log("\nnombre de ligne déjà insérer: "+res1+"\n");

            sessionDao.insert(session, function(err, rows){
                if(err) console.log(err);

                sessionDao.findAll((err, rows) => {
                    if(err) console.log(err);

                    var id = rows[rows.length-1].id_session;
                    session.setId(id);
                    var res2=rows.length;
                    console.log("\nnombre de ligne insérer après: "+res2+"\n");
                    if(res2==res1+1) console.log("Insertion réussie");

                    sessionDao.findByKey(id, (err, row) => {
                        if(err) console.log(err);
                        console.log("\nPre Update :\n");
                        console.log(row[0]);

                        session.setDate("2024-01-16");
                        session.setStatut("terminer");

                        var values = [session.getDate(), session.getStatut(), session.getHeure(), session.getIdentifiant(), session.getMdp(), session.getProfesseur(), session.getSport()];
        
                        sessionDao.update(id, values, function(err, row){
                            if(err) console.log(err);

                            sessionDao.findByKey(session.getId(), (err, row) => {
                                if(err) console.log(err);
                                console.log("\nPost Update :\n");
                                console.log(row[0]);

                                sessionDao.delete(id, function(err, rows){
                                    if(err) console.log(err);

                                    sessionDao.findAll((err, rows) => {
                                        if(err) console.log(err);
                                        
                                        console.log("\nnombre de ligne après délete: "+res1+"\n");

                                        if(res1==rows.length) console.log("Delete réussie");
                                        else console.log("Delete échouée");
                                    });
                                    
                                    sportDao.delete(id, function(err, rows){
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