var eleve_dao = require('../dao/dataBase.js').eleve_dao;
var eleve = require('../models/eleve.js');
var equipe = require('../models/equipe.js');
var equipe_dao = require('../dao/dataBase.js').equipe_dao;

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

        eleve_dao.findAll((err, rows) => {
            if(err) console.log(err);

            var res1=rows.length;
            console.log("\nnombre de ligne déjà insérer: "+res1+"\n");

            eleve_dao.insert(eleve, function(err, rows){
                if(err) console.log(err);

                eleve_dao.findAll((err, rows) => {
                    if(err) console.log(err);

                    var idEleve = rows[rows.length-1].id_eleve;
                    eleve.setId(idEleve);

                    var res2=rows.length;
                    console.log("\nnombre de ligne insérer après: "+res2+"\n");
                    if(res2==res1+1) console.log("Insertion réussie");
                    else console.log("Insertion échouée");
                    
                    
                    eleve_dao.findByKey(idEleve, (err, row) => {
                        if(err) console.log(err);

                        console.log("\nPre Update :\n");
                        console.log(row[0]);

                        eleve.setNom("LE MARCHAND");
                        eleve.setPrenom("Thomas");
                        eleve.setSexe("femme");
                        eleve.setClasse("6b");

                        eleve_dao.update(idEleve, eleve, function(err, row){
                            if(err) console.log(err);

                            eleve_dao.findByName(eleve.getNom(), (err, row) => {
                                if(err) console.log(err);

                                console.log("\nPost Update :\n");
                                console.log(row[0]);

                                eleve_dao.delete(idEleve, function(err, rows){
                                    if(err) console.log(err);

                                    eleve_dao.findAll((err, rows) => {
                                        if(err) console.log(err);

                                        console.log("\nnombre de ligne après délete: "+res1+"\n");

                                        if(res1==rows.length) console.log("Delete réussie");
                                        else console.log("Delete échouée");
                                    });

                                    equipe_dao.delete(id, function(err, rows){
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


