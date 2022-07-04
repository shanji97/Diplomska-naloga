/**Iclude all the neede libraries */
var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('./app_api/db/db');

var indexRouter = require('./app_server/routes/indexRouter');
// var iskanjeRouter = require('./app_server/routes/iskanjeRouter');
// var uporabnikiRouter = require('./app_server/routes/uporabnikiRouter');

var noviceApi = require('./app_api/routes/noviceRouter');
var iskanjeApi = require('./app_api/routes/iskanjeRouter');
var uporabnikiApi = require('./app_api/routes/uporabnikiRouter');
// tema
// oglas

var app = express();

// view engine setup
hbs.registerPartials('./app_server/views/partials');
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

require('./app_server/views/helpers/hbsHelpers');



app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({ limit: '50MB', extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/predmeti', predmetiRouter);
app.use('/gradivo', gradivoRouter);
app.use('/osebje', osebjeRouter);
app.use('/iskanje', iskanjeRouter);
app.use('/uporabniki', uporabnikiRouter);

app.use('/api/predmeti', predmetiApi);
app.use('/api/gradivo', gradivoApi);
app.use('/api/osebje', osebjeApi);
app.use('/api/moduli', moduliApi);
app.use('/api/iskanje', iskanjeApi);
app.use('/api/uporabniki', uporabnikiApi);
app.use('/api/db', bazaApi);

// app.use('/', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.render('error', {
        title: 'Stran na tem naslovu ne obstaja',
        error: ''
    });
});


// /api error handler
app.use('/api', function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.trace('[Application] ' + err);

    if (err.response) {
        res.status(err.response.status || 500);
    }
    else {
        res.status(err.status || 500);
    }

    if (res.statusCode == 404) {
        res.json('error', {
            sporocilo: 'Ta object ne obstaja'
        });
    }
    else if (res.statusCode < 500) {
        res.render('error', {
            sporocilo: 'Zgodila se je napaka v HTTP zahtevi',
            napaka: req.app.get('env') === 'development' ? err : ''
        });
    }
    else {
        res.render('error', {
            sporocilo: 'Interna napaka strežnika',
            napaka: req.app.get('env') === 'development' ? err : ''
        });
    }
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.trace('[Application] ' + err);

    // render the error page
    if (err.response) {
        res.status(err.response.status || 500);
    }
    else {
        res.status(err.status || 500);
    }

    if (res.statusCode == 404) {
        res.render('error', {
            title: 'Stran na tem naslovu ne obstaja',
            error: ''
        });
    }
    else if (res.statusCode < 500) {
        res.render('error', {
            title: 'Zgodila se je napaka v HTTP zahtevi',
            error: ''
        });
    }
    else {
        res.render('error', {
            title: 'Interna napaka strežnika',
            error: req.app.get('env') === 'development' ? err : ''
        });
    }
    
});

process.on('uncaughtException', (err) => {
    console.log('[Application] Uncaught exception: ' + err);
});

module.exports = app;