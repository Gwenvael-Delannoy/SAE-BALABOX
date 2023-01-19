var equipeDao = require('../dao/dataBase').equipe_dao;
var equipe = require('../equipe');

equipe = new equipe();
equipe.init(5,10);

equipeDao.findAll((err, rows) => {
    if(err) console.log(err);

    var res1=rows.length;
    console.log("\nnombre de ligne déjà insérer: "+res1+"\n");

    equipeDao.insert(equipe, function(err, rows){
        if(err) console.log(err);

        equipeDao.findAll((err, rows) => {
            if(err) console.log(err);

            var id = rows[rows.length-1].id_equipe;
            var res2=rows.length;
            console.log("\nnombre de ligne insérer après: "+res2+"\n");
            equipe.setId(id);
            if(res2==res1+1) console.log("Insertion réussie");
            else console.log("Insertion échouée");

            equipeDao.findByKey(id, (err, row) => {
                if(err) console.log(err);
                console.log("\nPre Update :\n");
                console.log(row[0]);

                equipe.setNbJoueurs(15);
                equipe.setTotal(30);

                equipeDao.update(id, equipe, function(err, row){
                    if(err) console.log(err);

                    equipeDao.findByKey(id, (err, row) => {
                        if(err) console.log(err);
                        console.log("\nPost Update :\n");
                        console.log(row[0]);

                        equipeDao.delete(id, function(err, rows){
                            if(err) console.log(err);

                            equipeDao.findAll((err, rows) => {
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
