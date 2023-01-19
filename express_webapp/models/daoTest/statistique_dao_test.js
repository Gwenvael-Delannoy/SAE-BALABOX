var statisque_dao = require('../dao/dataBase.js').statistique_dao;
var statistique = require('../models/statistique.js');
var eleve = require('../models/eleve.js');
var eleve_dao = require('../dao/dataBase.js').eleve_dao;
var equipe = require('../models/equipe.js');
var equipe_dao = require('../dao/dataBase.js').equipe_dao;

var statistique = new statistique();
var eleve = new eleve();
var equipe = new equipe();

equipe.init(5,10);

equipe_dao.insert(equipe, function(err, rows){
    if(err) console.log(err);

    equipe_dao.findAll((err, rows) => {
        if(err) console.log(err);

        var id = rows[rows.length-1].id_equipe;
        equipe.setId(id);
        eleve.init("BOURBIGOT","Tristan","homme","6a",1,id);

        eleve_dao.insert(eleve, function(err, rows){
            if(err) console.log(err);

            eleve_dao.findAll((err, rows) => {
                if(err) console.log(err);

                var idEleve = rows[rows.length-1].id_eleve;
                eleve.setId(idEleve);

                statistique.init("test", 10, idEleve);

                statisque_dao.findAll((err, rows) => {
                    if(err) console.log(err);

                    var res1 = rows.length;
                    console.log("\nnombre de ligne déjà insérer: "+res1+"\n");

                    statisque_dao.insert(statistique, function(err, rows){
                        if(err) console.log(err);

                        statisque_dao.findAll((err, rows) => {
                            if(err) console.log(err);

                            var idStat = rows[rows.length-1].id_stats;
                            var res2 = rows.length;
                            console.log("\nnombre de ligne insérer après: "+res2+"\n");
                            statistique.setId(idStat);
                            if(res2==res1+1) console.log("Insertion réussie");
                            else console.log("Insertion échouée");

                            statisque_dao.findByKey(idStat, (err, row) => {
                                if(err) console.log(err);
                                console.log("\nPre Update :\n");
                                console.log(row[0]);

                                statistique.setIntitule("test2");
                                statistique.setStats(20);

                                statisque_dao.update(idStat, statistique, function(err, row){
                                    if(err) console.log(err);

                                    statisque_dao.findByKey(idStat, (err, row) => {
                                        if(err) console.log(err);
                                        console.log("\nPost Update :\n");
                                        console.log(row[0]);

                                        statisque_dao.delete(idStat, function(err, rows){
                                            if(err) console.log(err);

                                            statisque_dao.findAll((err, rows) => {
                                                if(err) console.log(err);
                                                
                                                console.log("\nnombre de ligne après délete: "+res1+"\n");

                                                if(res1==rows.length) console.log("Delete réussie");
                                                else console.log("Delete échouée");
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