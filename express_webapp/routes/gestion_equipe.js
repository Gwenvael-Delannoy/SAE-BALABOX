var express = require('express');
var router = express.Router();


/* GET error page. */
router.get('/', function(req, res, next) {

    var teams = [
        {name:"eq1" , nbPlayers :20 , total : 20},
        {name:"eq2" , nbPlayers :20 , total : 20},
        {name:"eq3" , nbPlayers :20 , total : 20}
    ];
    var eleves = [
        {nom:"nom1" , prenom:"prenom1" , sexe:"sexe1" , classe:"classe1" , total_points:20 , l_equipe:1},
        {nom:"nom2" , prenom:"prenom2" , sexe:"sexe2" , classe:"classe2" , total_points:20 , l_equipe:1}

    ];
    var idSession = 0;
    res.render('gestion_equipe', {teams: teams, eleves: eleves, idSession: idSession });
  });

router.post('/', function(req, res, next) {

      // Récupérer les données envoyées par le formulaire
        var nom_equipe = req.body.nom;
        var elevesEquipe = req.body.membres;
        console.log(nom_equipe);
    
    // Envoyer une réponse au client
    res.status(200).json({ message: 'Équipe ajoutée avec succès.' });
});
  module.exports = router;