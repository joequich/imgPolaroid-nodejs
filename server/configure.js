const { timeStamp } = require('console');
const path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment');

module.exports = app => {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':true}));

    app.engine('handlebars', exphbs.create({ //handlebars
        defaultLayout: 'main',
        layoutsDir:  `${app.get('views')}/layouts`,
        partialsDir: [ `${app.get('views')}/partials`],
        helpers: {
            timeago: (timeStamp) => {
                return moment(timeStamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app); // moving the routes to routes folder
    app.use('public', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};