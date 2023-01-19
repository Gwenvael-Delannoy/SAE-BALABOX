/**
 * Script to test the sport_dao.js
 */

var sportDao = require('../dao/dataBase').sport_dao;
var sport = require('../sport');

sport = new sport();
sport.init("basketball","sport de basket");

sportDao.findAll((err, rows) => {
    if(err) console.log(err);

    var res1=rows.length;
    console.log("\nnombre de ligne déjà insérer: "+res1+"\n");
    sportDao.insert(sport, function(err, rows){
        if(err) console.log(err);

        sportDao.findAll((err, rows) => {
            if(err) console.log(err);

            var id = rows[rows.length-1].id_sport;
            var res2=rows.length;
            console.log("\nnombre de ligne insérer après: "+res2+"\n");
            sport.setId(id);
            if(res2==res1+1) console.log("Insertion réussie");
            else console.log("Insertion échouée");

            sportDao.findByKey(id, (err, row) => {
                if(err) console.log(err);
                console.log("\nPre Update :\n");
                console.log(row[0]);

                sport.setNomSport("football");
                sport.setDescription("sport de foot");

                sportDao.update(id, sport, function(err, row){
                    if(err) console.log(err);

                    sportDao.findByName(sport.getNom(), (err, row) => {
                        if(err) console.log(err);
                        console.log("\nPost Update :\n");
                        console.log(row[0]);

                        sportDao.delete(id, function(err, rows){
                            if(err) console.log(err);

                            sportDao.findAll((err, rows) => {
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

// sportDao.deleteAll(function(err, rows){
//     if(err) console.log(err);
// });