var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var classement_eleve = require('./routes/classement_eleve');
var classement_equipe = require('./routes/classement_equipe');
var resultat = require('./routes/resultat');
var listeSession = require('./routes/listeSession');
var crSession = require('./routes/createSession');
var foot = require('./routes/foot');
var eleveVsEleve = require('./routes/eleveVsEleve');
var gestionEquipe = require('./routes/gestion_equipe');
var resultat_prof = require('./routes/resultat_prof');
var classement_prof = require('./routes/classement_prof');
var gestion_voie = require('./routes/gestion_voie');
var gestionVoie_ajout = require('./routes/gestionVoie_ajout');
var gestionVoie_modif = require('./routes/gestionVoie_modif');
var gestion_figure = require('./routes/gestion_figure');
var gestionFigure_ajout = require('./routes/gestionFigure_ajout');
var gestionFigure_modif = require('./routes/gestionFigure_modif');
var error = require('./routes/error');
var updateSession = require('./routes/updateSession');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/classement_eleve', classement_eleve);
app.use('/classement_equipe', classement_equipe);
app.use('/listeSession', listeSession);
app.use('/crSession', crSession);
app.use('/foot', foot);
app.use('/eleveVsEleve', eleveVsEleve);
app.use('/gestionEquipe', gestionEquipe);
app.use('/resultat_prof', resultat_prof);
app.use('/error', error);
app.use('/updateSession', updateSession);
app.use('/classement_prof', classement_prof);
app.use('/gestion_voie',gestion_voie);
app.use('/gestionVoie_ajout',gestionVoie_ajout);
app.use('/gestionVoie_modif',gestionVoie_modif);
app.use('/gestion_figure',gestion_figure);
app.use('/gestionFigure_ajout',gestionFigure_ajout);
app.use('/gestionFigure_modif',gestionFigure_modif);
app.use('/resultat', resultat);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// catch 404 and forward to error handlermy
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{message : err.message});
});

module.exports = app;
