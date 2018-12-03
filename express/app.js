var express = require('express');
var app = express();
var fs = require("fs");

/* view template */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/* static file */
app.use(express.static('static'));

/* json parser */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

/* session */
var session = require('express-session');
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

/* 다국어 */
var i18n = require("i18n");

i18n.configure({
    locales:['ko', 'en'],
    defaultLocale: 'en',
    directory: __dirname + '/locales',
    queryParameter: 'lang',
    cookie: 'locale',
});
app.use(i18n.init);

module.exports = function(req, res, next) {
	i18n.init(req, res);
	res.local('__', res.__);
	
	var current_locale = i18n.getLocale();
	return next();
};

/* router */
var router = require('./router/main')(app, fs);
var router2 = require('./router/session')(app, fs);

//app started
var server = app.listen(3000, function(){
 console.log("Express server has started on port 3000");
});
