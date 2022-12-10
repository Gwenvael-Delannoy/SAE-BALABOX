/**
 * Script to test the sport_dao.js
 */

var sportDao = require('../dao/dataBase').sport_dao;
var sport = require('../models/sport');

sport = new sport();
sport.init("basketball","sport de basket");

sportDao.findAll((err, rows) => {
    if(err) console.log(err);

    var res1=rows.length;

    sportDao.insert(sport, function(err, rows){
        if(err) console.log(err);

        sportDao.findAll((err, rows) => {
            if(err) console.log(err);

            var id = rows[rows.length-1].id_sport;
            var res2=rows.length;
            sport.setId(rows[rows.length-1].id_sport);
            if(res2==res1+1) console.log("Insertion réussie");
            else console.log("Insertion échouée");
            

        });
    });

});

