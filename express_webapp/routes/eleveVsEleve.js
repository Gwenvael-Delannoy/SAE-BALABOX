var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('eleve_contre_eleve');
});

router.post('/', function(req, res, next) {
    console.log(req.body.score1);
});

module.exports = router;